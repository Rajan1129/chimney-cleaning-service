import { Phone, MessageCircle } from 'lucide-react';
import { telHref, waHref } from '../lib/links';
import { SITE } from '../data/site';
import { track } from '../lib/analytics';
export default function Cta({ location, dark = true }) {
  return (<div className="flex flex-wrap gap-3">
    <a href={telHref} onClick={() => track('call_click', { location })} className="btn btn-primary"><Phone size={18} />Call Now {SITE.phoneDisplay}</a>
    <a href={waHref(location)} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click', { location })} className={'btn ' + (dark ? 'btn-wa' : 'btn-outline')}><MessageCircle size={18} />WhatsApp Us</a>
  </div>);
}
export const Faqs = ({ items }) => (<div className="divide-y rounded-xl border">{items.map(([q, a]) => (<details key={q} className="group p-4"><summary className="cursor-pointer font-semibold text-navy-900">{q}</summary><p className="mt-2 text-slate-600">{a}</p></details>))}</div>);
export const Section = ({ title, children, tint }) => (<section className={tint ? 'bg-slate-50' : ''}><div className="mx-auto max-w-6xl px-4 py-12"><h2 className="mb-6 text-2xl font-bold text-navy-900">{title}</h2>{children}</div></section>);
export const Hero = ({ h1, children, crumbs }) => (<header className="bg-navy-900 text-white"><div className="mx-auto max-w-6xl px-4 py-14">{crumbs}<h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">{h1}</h1><div className="mt-4 max-w-2xl text-slate-200">{children}</div></div></header>);
