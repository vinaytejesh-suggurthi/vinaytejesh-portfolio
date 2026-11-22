# Vinaytejesh Suggurthi — Portfolio

A responsive dark-theme portfolio website with a separate authenticated admin dashboard.

## Files
- `index.html` — public portfolio
- `admin.html` — private content editor
- `admin.js` — Supabase sign-in and content editing
- `site.js` — public content rendering and interactive project demos
- `styles.css` — responsive styling
- `supabase-config.js` — paste your Supabase project URL and anon key here
- `ADMIN-SETUP.md` — complete setup guide for private authentication, database and deployment

## Quick start
1. Read `ADMIN-SETUP.md`.
2. Create a Supabase project and private admin user.
3. Configure the SQL table and row-level security policy with your admin user UUID.
4. Add the Supabase project URL and anon key to `supabase-config.js`.
5. Deploy the folder to Vercel or another static host.

The site can display its built-in sample content before Supabase is connected. The admin dashboard requires Supabase configuration.

No PHSA experience is included. The CIBC entry is shown as current in this starter profile, based on the user's requested presentation; confirm dates before publishing.
