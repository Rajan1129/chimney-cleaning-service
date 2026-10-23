// Single source of truth for business details. Edit here only.
export const SITE = {
  name: import.meta.env.VITE_BUSINESS_NAME || 'Kitchen King',
  phoneDisplay: '+91 62630 13446', phoneTel: '+916263013446', waNumber: '916263013446',
  address: { street: 'Sector 39, Maloya', city: 'Chandigarh', postal: '160025', country: 'IN' },
  url: (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, ''),
  api: (import.meta.env.VITE_API_URL || '').replace(/\/$/, ''),
  gaId: import.meta.env.VITE_GA_ID || ''
};
export const addressLine = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.postal}`;
export const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(addressLine + ', India');
