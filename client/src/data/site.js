// Single source of truth for business details. Edit here only.
export const CANONICAL_URL = (import.meta.env.VITE_SITE_URL && !import.meta.env.VITE_SITE_URL.includes('localhost'))
  ? import.meta.env.VITE_SITE_URL.replace(/\/$/, '')
  : 'https://chimneyservicecleaning.in';

export const SITE = {
  name: import.meta.env.VITE_BUSINESS_NAME || 'Kitchen King',
  tagline: 'Kitchen Chimney, Hob & RO Water Purifier Service',
  phoneDisplay: '+91 62630 13446',
  phoneTel: '+916263013446',
  waNumber: '916263013446',
  email: 'service@chimneyservicecleaning.in',
  address: {
    street: 'Sector 39, Maloya',
    city: 'Chandigarh',
    state: 'Chandigarh',
    postal: '160025',
    country: 'IN'
  },
  geo: {
    latitude: 30.7333,
    longitude: 76.7333
  },
  hours: 'Mo-Su 08:00-20:00',
  url: CANONICAL_URL,
  canonicalUrl: CANONICAL_URL,
  api: (import.meta.env.VITE_API_URL || '').replace(/\/$/, ''),
  gaId: import.meta.env.VITE_GA_ID || ''
};

export const addressLine = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.postal}`;
export const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(addressLine + ', India');

