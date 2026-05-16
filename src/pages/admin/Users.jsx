import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, toggleUser } from '../../api/admin';

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const data = await getUsers();
      setUsers(data.users);
    } catch (err) {
      if (err.response?.status === 401) {
        sessionStorage.removeItem('admin_token');
        navigate('/admin/login');
      }
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle(userId) {
    try {
      await toggleUser(userId);
      fetchUsers();
    } catch (err) {
      setError('Failed to update user');
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
          <button onClick={() => navigate('/admin/clients')} className="nav-btn">Clients</button>
          <button onClick={() => navigate('/admin/users')} className="nav-btn active">Users</button>
        </nav>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="admin-content">
        <div className="content-header">
          <h2>Users</h2>
        </div>

        {error && <div className="error-box">{error}</div>}

        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <p className="empty-state">No users registered yet.</p>
        ) : (
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={user.role === 'admin' ? 'badge-admin' : 'badge-user'}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={user.isActive ? 'badge-active' : 'badge-inactive'}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggle(user._id)}
                        className={user.isActive ? 'danger-btn' : 'success-btn'}
                        disabled={user.role === 'admin'}
                      >
                        {user.isActive ? 'Disable' : 'Enable'}
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