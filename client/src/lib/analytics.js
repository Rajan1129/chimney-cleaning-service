import { SITE } from '../data/site';
export function initAnalytics() {
  if (!SITE.gaId || window.gtag) return;
  const s = document.createElement('script'); s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`; document.head.appendChild(s);
  window.dataLayer = window.dataLayer || []; window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date()); window.gtag('config', SITE.gaId);
}
export const track = (event, params = {}) => { if (window.gtag) window.gtag('event', event, params); };
