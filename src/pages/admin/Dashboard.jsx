import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem('admin_token');
    navigate('/admin/login');
  }

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h1 className="sidebar-title">SSO Admin</h1>
        <nav>
          <button onClick={() => navigate('/admin/dashboard')} className="nav-btn active">
            Dashboard
          </button>
          <button onClick={() => navigate('/admin/clients')} className="nav-btn">
            Clients
          </button>
          <button onClick={() => navigate('/admin/users')} className="nav-btn">
            Users
          </button>
        </nav>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="admin-content">
        <h2>Welcome to SSO Admin Console</h2>
        <p className="subtitle">Manage your client applications and users</p>

        <div className="stats-grid">
          <div className="stat-card" onClick={() => navigate('/admin/clients')}>
            <h3>Client Apps</h3>
            <p>Register and manage apps using your SSO</p>
            <span className="stat-link">Manage →</span>
          </div>
          <div className="stat-card" onClick={() => navigate('/admin/users')}>
            <h3>Users</h3>
            <p>View and manage registered users</p>
            <span className="stat-link">Manage →</span>
          </div>
        </div>
      </div>
    </div>
  );
}