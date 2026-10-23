import fs from 'node:fs';
import { services, cities } from '../src/data/content.js';
if (fs.existsSync('.env')) { try { process.loadEnvFile('.env'); } catch (e) {} }
const site = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://kitchenkingservice.com').replace(/\/$/, '');
const paths = [
  '/',
  '/services',
  ...services.filter(s => s.page).map(s => `/services/${s.slug}`),
  '/locations',
  ...cities.map(c => `/chimney-service-in-${c.slug}`),
  ...cities.map(c => `/locations/${c.slug}`),
  ...cities.map(c => `/chimney-service-${c.slug}`),
  '/about',
  '/contact',
  '/privacy-policy'
];
fs.writeFileSync('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(p => `  <url><loc>${site}${p}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
console.log('Wrote sitemap.xml and robots.txt for', site);
