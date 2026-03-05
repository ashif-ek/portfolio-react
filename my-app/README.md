# Ashif E.K Portfolio (React + Vite)

## Environment Variables

The frontend API base URL is controlled by `VITE_API_BASE_URL`:

- Development (`my-app/.env.development`):  
  `VITE_API_BASE_URL=http://localhost:5000/api`
- Production (`my-app/.env.production`):  
  `VITE_API_BASE_URL=https://portfolio-server-35.onrender.com`

If not set, the frontend falls back to `https://portfolio-server-35.onrender.com`.

## Run Locally

1. Start the API server:

```bash
cd server
npm install
npm start
```

2. Start the frontend:

```bash
cd my-app
npm install
npm run dev
```

## Build Frontend

```bash
cd my-app
npm run build
```
