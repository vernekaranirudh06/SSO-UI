    import { useState } from 'react';
    import { useSearchParams, Link, useNavigate } from 'react-router-dom';
    import { registerUser } from '../api/auth';

    export default function Register() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
        await registerUser(form);
        // After register → redirect to login with same OAuth params
        navigate(`/login?${searchParams.toString()}`);
        } catch (err) {
        setError(err.response?.data?.message || 'Registration failed');
        } finally {
        setLoading(false);
        }
    }

    return (
        <div className="container">
        <div className="card">
            <h2>Create Account</h2>
            <p className="subtitle">Register to continue</p>

            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoFocus
            />

            <label>Email</label>
            <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
            />

            <label>Password</label>
            <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
            />

            <button type="submit" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
            </button>
            </form>

            <p className="footer-link">
            Already have an account? <Link to={`/login?${searchParams.toString()}`}>Sign In</Link>
            </p>
        </div>
        </div>
    );
    }