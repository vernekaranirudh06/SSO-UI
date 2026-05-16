import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClients, registerClient, deleteClient } from '../../api/admin';

export default function Clients() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newSecret, setNewSecret] = useState(null);
  const [form, setForm] = useState({
    name: '',
    redirectUris: '',
    allowedScopes: ['openid', 'profile', 'email']
  });

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      const data = await getClients();
      setClients(data.clients);
    } catch (err) {
      if (err.response?.status === 401) {
        sessionStorage.removeItem('admin_token');
        navigate('/admin/login');
      }
      setError('Failed to load clients');
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const data = await registerClient({
        name: form.name,
        redirectUris: form.redirectUris.split(',').map(u => u.trim()),
        allowedScopes: form.allowedScopes
      });
      setNewSecret(data);
      setShowForm(false);
      setForm({ name: '', redirectUris: '', allowedScopes: ['openid', 'profile', 'email'] });
      fetchClients();
    } catch (err) {
      setError('Failed to register client');
    }
  }

  async function handleDelete(clientId) {
    if (!confirm(`Delete client ${clientId}? This will revoke all its tokens.`)) return;
    try {
      await deleteClient(clientId);
      fetchClients();
    } catch (err) {
      setError('Failed to delete client');
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('admin_token');
    navigate('/admin/login');
  }

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h1 className="sidebar-title">SSO Admin</h1>
        <nav>
          <button onClick={() => navigate('/admin/dashboard')} className="nav-btn">Dashboard</button>
          <button onClick={() => navigate('/admin/clients')} className="nav-btn active">Clients</button>
          <button onClick={() => navigate('/admin/users')} className="nav-btn">Users</button>
        </nav>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="admin-content">
        <div className="content-header">
          <h2>Client Applications</h2>
          <button onClick={() => setShowForm(!showForm)} className="primary-btn">
            {showForm ? 'Cancel' : '+ Register New Client'}
          </button>
        </div>

        {error && <div className="error-box">{error}</div>}

        {/* New Secret Display */}
        {newSecret && (
          <div className="secret-box">
            <h3>⚠️ Save Your Client Secret Now</h3>
            <p>This will never be shown again!</p>
            <div className="secret-row">
              <span>Client ID:</span>
              <code>{newSecret.client_id}</code>
            </div>
            <div className="secret-row">
              <span>Client Secret:</span>
              <code>{newSecret.client_secret}</code>
            </div>
            <button onClick={() => setNewSecret(null)} className="primary-btn">
              I've saved it
            </button>
          </div>
        )}

        {/* Register Form */}
        {showForm && (
          <div className="form-card">
            <h3>Register New Client</h3>
            <form onSubmit={handleRegister}>
              <label>App Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="My App"
                required
              />
              <label>Redirect URIs (comma separated)</label>
              <input
                type="text"
                value={form.redirectUris}
                onChange={e => setForm({ ...form, redirectUris: e.target.value })}
                placeholder="https://myapp.com/callback, http://localhost:3000/callback"
                required
              />
              <button type="submit" className="primary-btn">Register Client</button>
            </form>
          </div>
        )}

        {/* Clients List */}
        {loading ? (
          <p>Loading...</p>
        ) : clients.length === 0 ? (
          <p className="empty-state">No clients registered yet.</p>
        ) : (
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Client ID</th>
                  <th>Redirect URIs</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.clientId}>
                    <td>{client.name}</td>
                    <td><code>{client.clientId}</code></td>
                    <td>{client.redirectUris.join(', ')}</td>
                    <td>
                      <span className={client.isActive ? 'badge-active' : 'badge-inactive'}>
                        {client.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(client.clientId)}
                        className="danger-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}