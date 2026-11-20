# SSO UI

The frontend for my [SSO Server](https://github.com/vernekaranirudh06/SSO-SERVER). It includes the admin console for managing users, roles and tenants, and a landing page for the SSO product.

## Features

- Admin console for managing the SSO platform
- Role-based admin access
- Forms with validation (React Hook Form + Zod)
- Responsive SaaS landing page
- State management with Redux Toolkit

## Tech Stack

- React, Vite
- Redux Toolkit
- Tailwind CSS v4
- React Hook Form, Zod

## Getting Started

### Prerequisites

- Node.js 18 or later
- The [SSO Server](https://github.com/vernekaranirudh06/SSO-SERVER) running locally or deployed

### Setup

```bash
git clone https://github.com/vernekaranirudh06/SSO-UI.git
cd SSO-UI
npm install
```

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Author

Anirudh D Vernekar
[LinkedIn](https://linkedin.com/in/anirudh-d-vernekar) | [GitHub](https://github.com/vernekaranirudh06)
