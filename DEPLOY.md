Automation and Deploy

Local commands (from repo root):

- Start dev servers (frontend + server):

```bash
npm run start:all
```

- Build frontend:

```bash
npm run build
```

- Deploy frontend to GitHub Pages (publishes `dist` to `gh-pages` branch):

```bash
npm run deploy
```

Notes for backend hosting (Render recommended):

1. Create a Render account and create a new Web Service using this repository (or note the Service ID).
2. Add the following repository secrets in GitHub (Settings → Secrets → Actions):
   - `RENDER_API_KEY` — your Render API key
   - `RENDER_SERVICE_ID` — the Render service id for your backend
3. In Render, set up environment variables for your service: `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, `ADMIN_PASSWORD`, and optionally `ALLOWED_ORIGINS` (e.g. `https://AlexJQuest.github.io`).
4. Trigger the backend deploy from the GitHub Actions tab (workflow `Deploy Backend to Render`) or push to `main`.

When backend is live, set `VITE_API_BASE` to your backend base URL (for example `https://api.example.com`) and rebuild the frontend before deploying to GitHub Pages.
