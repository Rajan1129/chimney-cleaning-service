# Kitchen Chimney Service – MERN site

Status: written without network access, so `npm install`, build, lint and tests have NOT been run. Run them first and fix anything they surface.

## Run locally
- `cd server && cp .env.example .env && npm install && npm run dev`
- `cd client && cp .env.example .env && npm install && npm run dev`

## Edit business details
`client/src/data/site.js` (name, phone, address) and `client/src/data/content.js` (services, cities, FAQs).

## Deploy
1. MongoDB Atlas: create a database user; under Network Access allow Render's outbound IPs (or 0.0.0.0/0 for a first test, then tighten). Copy the connection string into `MONGO_URI`.
2. Render: new Web Service from this repo (see `render.yaml`). Set `MONGO_URI`, `FRONTEND_URL` (your Vercel/production domain, no trailing slash), `NODE_ENV=production`.
3. Vercel: root directory `client`. Set `VITE_API_URL` (Render URL), `VITE_SITE_URL`, `SITE_URL` (same production domain). `vercel.json` handles SPA routing.
4. Verify: `/api/health` shows `db: connected`; submit the form and check the `enquiries` collection; open each route; view sitemap.xml and robots.txt.

## Troubleshooting
- CORS error: `FRONTEND_URL` must exactly match the browser origin (scheme + host, no slash). Add others to `ALLOWED_ORIGINS`.
- 503 on submit / `db: disconnected`: check `MONGO_URI`, the Atlas user password encoding and Network Access.
- Frontend calls localhost: `VITE_*` values are baked in at build time; redeploy after changing them.

## SEO notes
- This is a client-rendered Vite SPA. Unknown URLs return HTTP 200 with a noindex "not found" page (a limitation of static SPA hosting). For stronger crawling and link previews, prerender the public routes (e.g. vite-react-ssg or a prerender step).
- Good site SEO cannot guarantee Google Maps or first-page rankings. A real, accurate Google Business Profile and legitimate local information matter too.
- No hours, geo coordinates, ratings or prices are published in the structured data.
