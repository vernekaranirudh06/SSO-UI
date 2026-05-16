    import { useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';

    const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } }
    };

    export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="landing">

        {/* ── Navbar ── */}
        <nav className="landing-nav">
            <div className="nav-logo">⚡ AuthFlow</div>
            <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <button onClick={() => navigate('/admin/login')} className="nav-cta">
                Admin Console →
            </button>
            </div>
        </nav>

        {/* ── Hero ── */}
        <section className="hero">
            <motion.div
            className="hero-content"
            variants={stagger}
            initial="hidden"
            animate="show"
            >
            <motion.div variants={fadeUp} className="hero-badge">
                ✦ Open Source SSO Platform
            </motion.div>

            <motion.h1 variants={fadeUp} className="hero-title">
                One Login.<br />
                <span className="gradient-text">All Your Apps.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="hero-subtitle">
                A production-ready OIDC & OAuth 2.0 Single Sign-On server.
                Let your users log in once and access all your applications seamlessly.
            </motion.p>

            <motion.div variants={fadeUp} className="hero-actions">
                <button
                onClick={() => navigate('/admin/login')}
                className="hero-btn-primary"
                >
                Get Started Free →
                </button>

                <a href="#how-it-works" className="hero-btn-secondary">
                See How It Works
                </a>
            </motion.div>

            <motion.div variants={fadeUp} className="hero-tags">
                <span>✅ OIDC Compatible</span>
                <span>✅ OAuth 2.0</span>
                <span>✅ RS256 Signed JWTs</span>
                <span>✅ Free Forever</span>
            </motion.div>
            </motion.div>

            <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            >
            <div className="code-card">
                <div className="code-card-header">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
                <span className="code-card-title">openid-configuration</span>
                </div>
                <pre>{`{
    "issuer": "https://auth.yourdomain.com",
    "authorization_endpoint": "/auth/authorize",
    "token_endpoint": "/auth/token",
    "userinfo_endpoint": "/auth/userinfo",
    "jwks_uri": "/.well-known/jwks.json",
    "scopes_supported": [
        "openid", "profile", "email"
    ],
    "response_types_supported": ["code"],
    "grant_types_supported": [
        "authorization_code",
        "refresh_token"
    ]
    }`}</pre>
            </div>
            </motion.div>
        </section>

        {/* ── Features ── */}
        <section className="features" id="features">
            <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            >
            <h2>Everything You Need</h2>
            <p>Built to production standards from day one</p>
            </motion.div>

            <motion.div
            className="features-grid"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            >
            {features.map((f, i) => (
                <motion.div key={i} variants={fadeUp} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                </motion.div>
            ))}
            </motion.div>
        </section>

        {/* ── How It Works ── */}
        <section className="how-it-works" id="how-it-works">
            <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            >
            <h2>How It Works</h2>
            <p>Integrate in minutes, not days</p>
            </motion.div>

            <motion.div
            className="steps"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            >
            {steps.map((s, i) => (
                <motion.div key={i} variants={fadeUp} className="step-card">
                <div className="step-number">{i + 1}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <code>{s.code}</code>
                </motion.div>
            ))}
            </motion.div>
        </section>

        {/* ── CTA ── */}
        <motion.section
            className="cta-section"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
        >
            <h2>Ready to Add SSO to Your Apps?</h2>
            <p>Register your first client app in under 2 minutes.</p>
            <button
            onClick={() => navigate('/admin/login')}
            className="hero-btn-primary"
            >
            Open Admin Console →
            </button>
        </motion.section>

        {/* ── Footer ── */}
        <footer className="landing-footer">
            <div className="footer-logo">⚡ AuthFlow</div>
            <p>Built with Node.js, MongoDB, React & ❤️</p>
        </footer>

        </div>
    );
    }

    const features = [
    {
        icon: '🔐',
        title: 'OIDC & OAuth 2.0',
        desc: 'Fully compliant with OpenID Connect and OAuth 2.0 standards. Works with any OIDC compatible library.'
    },
    {
        icon: '🔑',
        title: 'RS256 Signed JWTs',
        desc: 'Asymmetric key signing means any app can verify tokens without calling your server.'
    },
    {
        icon: '🔄',
        title: 'Refresh Token Rotation',
        desc: 'Automatic token rotation with theft detection. Old tokens are invalidated on every use.'
    },
    {
        icon: '🛡️',
        title: 'Secure by Default',
        desc: 'Rate limiting, helmet security headers, bcrypt hashing, and CORS protection out of the box.'
    },
    {
        icon: '⚡',
        title: 'Admin Console',
        desc: 'Register and manage client applications, users and sessions from a beautiful dashboard.'
    },
    {
        icon: '🌐',
        title: 'Discovery Document',
        desc: 'Auto-configuration via /.well-known/openid-configuration. Zero manual setup for client apps.'
    }
    ];

    const steps = [
    {
        title: 'Register Your App',
        desc: 'Login to the admin console and register your application to get a client ID and secret.',
        code: 'POST /admin/clients'
    },
    {
        title: 'Redirect to AuthFlow',
        desc: 'When a user wants to login, redirect them to the AuthFlow authorization endpoint.',
        code: 'GET /auth/authorize?client_id=xxx'
    },
    {
        title: 'Exchange Code for Tokens',
        desc: 'After login, exchange the authorization code for access, ID and refresh tokens.',
        code: 'POST /auth/token'
    }
    ];