import { SITE } from '../data/site';
export const telHref = `tel:${SITE.phoneTel}`;
export const waHref = (loc = '______') => `https://wa.me/${SITE.waNumber}?text=` + encodeURIComponent(`Hello, I need kitchen chimney service. My location is ${loc}. Please share the service details.`);
