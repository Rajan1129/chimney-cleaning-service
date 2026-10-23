import { useState } from 'react';
import axios from 'axios';
import { SITE } from '../data/site';
import { track } from '../lib/analytics';
const OPTIONS = [
  'Chimney repair',
  'Chimney cleaning',
  'Chimney installation',
  'Hob & Gas Stove Service',
  'Burner & Gas Leakage Repair',
  'Uninstall and reinstall',
  'Maintenance',
  'RO Water Purifier',
  'Other'
];
const empty = { name: '', phone: '', city: '', service: '', message: '', website: '' };
function check(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Enter your name.';
  if (!/^(\+91|0)?[6-9]\d{9}$/.test(f.phone.replace(/[\s-]/g, ''))) e.phone = 'Enter a valid 10-digit mobile number.';
  if (f.city.trim().length < 2) e.city = 'Enter your city.';
  if (!f.service) e.service = 'Choose a service.';
  return e;
}
export default function EnquiryForm({ defaultCity = '' }) {
  const [f, setF] = useState({ ...empty, city: defaultCity });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | loading | success | error
  const [msg, setMsg] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  async function submit(e) {
    e.preventDefault();
    const v = check(f); setErrors(v);
    if (Object.keys(v).length) return;
    setState('loading');
    try {
      await axios.post(`${SITE.api}/api/enquiries`, f, { timeout: 15000 });
      track('enquiry_submit', { service: f.service }); setState('success'); setF({ ...empty }); 
    } catch (err) {
      setErrors(err.response?.data?.errors || {});
      setMsg(err.response?.data?.message || 'Could not send your enquiry. Please call or WhatsApp us instead.'); setState('error');
    }
  }
  if (state === 'success') return <p role="status" className="rounded-lg bg-emerald-50 p-4 text-emerald-800">Thanks, your enquiry has been received. We will contact you on the number you gave.</p>;
  const Field = ({ id, label, children }) => (<div><label htmlFor={id} className="mb-1 block text-sm font-medium">{label}</label>{children}{errors[id] && <p className="mt-1 text-sm text-red-700">{errors[id]}</p>}</div>);
  const cls = 'w-full rounded-lg border border-slate-300 px-3 py-2';
  return (<form onSubmit={submit} noValidate className="space-y-4">
    <Field id="name" label="Your name"><input id="name" className={cls} value={f.name} onChange={set('name')} autoComplete="name" /></Field>
    <Field id="phone" label="Phone number"><input id="phone" type="tel" className={cls} value={f.phone} onChange={set('phone')} autoComplete="tel" /></Field>
    <Field id="city" label="City"><input id="city" className={cls} value={f.city} onChange={set('city')} /></Field>
    <Field id="service" label="Service needed"><select id="service" className={cls} value={f.service} onChange={set('service')}><option value="">Select</option>{OPTIONS.map(o => <option key={o}>{o}</option>)}</select></Field>
    <Field id="message" label="Message (optional)"><textarea id="message" rows="3" maxLength="1000" className={cls} value={f.message} onChange={set('message')} /></Field>
    <input type="text" name="website" value={f.website} onChange={set('website')} tabIndex="-1" autoComplete="off" aria-hidden="true" className="hidden" />
    {state === 'error' && <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800">{msg}</p>}
    <button className="btn btn-primary w-full disabled:opacity-60" disabled={state === 'loading'}>{state === 'loading' ? 'Sending…' : 'Send enquiry'}</button>
  </form>);
}
