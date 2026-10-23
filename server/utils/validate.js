export const SERVICES = [
  'Chimney repair',
  'Chimney cleaning',
  'Chimney installation',
  'Hob & Gas Stove Service',
  'Burner & Gas Leakage Repair',
  'Hob & Gas Stove',
  'Uninstall and reinstall',
  'Maintenance',
  'RO Water Purifier',
  'Other'
];
const clean = (v, max) => (typeof v === 'string' ? v.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, max) : '');
export function validateEnquiry(b = {}) {
  const data = { name: clean(b.name, 80), phone: clean(b.phone, 20).replace(/[\s-]/g, ''), city: clean(b.city, 60), service: clean(b.service, 80), message: clean(b.message, 1000) };
  const errors = {};
  if (data.name.length < 2) errors.name = 'Enter your name.';
  if (!/^(\+91|0)?[6-9]\d{9}$/.test(data.phone)) errors.phone = 'Enter a valid 10-digit Indian mobile number.';
  if (data.city.length < 2) errors.city = 'Enter your city.';
  if (!data.service || data.service.length < 2) errors.service = 'Choose a service.';
  return { data, errors, ok: Object.keys(errors).length === 0 };
}
