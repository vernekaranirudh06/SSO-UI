import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { submitLogin } from '../api/auth';

export default function Login() {
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(searchParams.get('error') || '');
    const [loading, setLoading] = useState(false);

    const client_id = searchParams.get('client_id');
    const redirect_uri = searchParams.get('redirect_uri');
    const scope = searchParams.get('scope');
    const state = searchParams.get('state');
    const code_challenge = searchParams.get('code_challenge');
    const code_challenge_method = searchParams.get('code_challenge_method');
    const nonce = searchParams.get('nonce');

    async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        const data = await submitLogin({
        email,
        password,
        client_id,
        redirect_uri,
        scope,
        state,
        code_challenge: code_challenge || '',
        code_challenge_method: code_challenge_method || '',
        nonce: nonce || ''
        });

        // Backend returns redirect_url → we navigate there manually
        if (data.redirect_url) {
        window.location.href = data.redirect_url;
        }

    } catch (err) {
        setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
        setLoading(false);
    }
}

    if (!client_id) {
        return (
        <div className="container">
            <div className="card">
            <h2>Invalid Request</h2>
            <p>Missing OAuth parameters. Please go back to the application.</p>
            </div>
        </div>
        );
    }

    return (
        <div className="container">
        <div className="card">
            <h2>Sign In</h2>
            <p className="subtitle">
            <strong>{client_id}</strong> is requesting access to your account
        </p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
            />

            <label>Password</label>
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />

            <button type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
            </button>
            </form>

            <p className="footer-link">
            Don't have an account? <Link to={`/register?${searchParams.toString()}`}>Register</Link>
            </p>
        </div>
        </div>
    );
    }