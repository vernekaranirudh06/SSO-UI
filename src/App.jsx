import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Clients from './pages/admin/Clients';
import Users from './pages/admin/Users';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import Landing from './pages/Landing';

// Add as first route


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Route */}
        <Route path="/" element={<Landing />} />
        {/* Auth UI */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/error" element={<Error />} />

        {/* Admin UI */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/admin/clients" element={
          <ProtectedRoute><Clients /></ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute><Users /></ProtectedRoute>
        } />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}