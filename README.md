# Portfolio — Supabase connected

This version keeps the existing Admin editor and adds online syncing through Supabase.

## One-time setup
1. Open `supabase-config.js`.
2. Replace `PASTE_PROJECT_URL_HERE` with your Supabase Project URL.
3. Replace `PASTE_PUBLISHABLE_KEY_HERE` with your Supabase Publishable key.
4. In Supabase SQL Editor, run **SUPABASE_SETUP.sql**.
5. Open `admin.html`, edit the portfolio, and click **Save Changes**.
6. Open `index.html` (or your hosted website). It loads the saved data from Supabase.

## Important
- Use the Supabase **Publishable** key, never the secret/service_role key.
- This simple no-login version allows anonymous updates to row id=1, so anyone who can access the Admin page could potentially edit the portfolio. For a real public deployment, add Supabase Auth and protect writes with an authenticated policy.
- LocalStorage remains as a fallback if Supabase is not configured.
- The mobile field remains clickable with `tel:` on phones.
