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

1. Create a Render account and connect this repository.
2. Render can use `render.yaml` in the repo root to configure the backend service automatically. The service is defined as `glam-nail-bar-api` and runs from the `server/` folder.
3. Add the following repository secrets in GitHub (Settings → Secrets → Actions):
   - `RENDER_API_KEY` — your Render API key
   - `RENDER_SERVICE_ID` — the Render service id for your backend
   - `VITE_API_BASE` — your hosted backend URL, e.g. `https://glam-nail-bar-api.onrender.com`
4. In Render, set up environment variables for the service:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASS`
   - `DB_NAME` (e.g. `glam_nail_bar`)
   - `ADMIN_PASSWORD`
   - `ALLOWED_ORIGINS` (e.g. `https://AlexJQuest.github.io`)

   If your database provider blocks IP ranges, also allow Render outbound IPs:
   - `74.220.49.0/24`
   - `74.220.57.0/24`
5. Push to `main` to trigger the frontend GitHub Pages workflow, or manually run the `Deploy Backend to Render` workflow in GitHub Actions.

After backend is live, your frontend will use `VITE_API_BASE` during the build to call the hosted API.
