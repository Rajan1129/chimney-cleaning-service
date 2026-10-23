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
export const TrustBar = () => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 pt-6 border-t border-slate-700/60 mt-8">
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400 font-bold text-base">✓</span>
      <div><p className="font-bold text-white text-sm sm:text-base leading-none">Pay After Service</p><p className="text-xs text-slate-300 mt-0.5">Test run before payment</p></div>
    </div>
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400 font-bold text-base">📋</span>
      <div><p className="font-bold text-white text-sm sm:text-base leading-none">Upfront Inspection</p><p className="text-xs text-slate-300 mt-0.5">Clear quote before work</p></div>
    </div>
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400 font-bold text-base">🛡️</span>
      <div><p className="font-bold text-white text-sm sm:text-base leading-none">Genuine Spares</p><p className="text-xs text-slate-300 mt-0.5">Brand-compatible parts</p></div>
    </div>
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400 font-bold text-base">🛵</span>
      <div><p className="font-bold text-white text-sm sm:text-base leading-none">Doorstep Visit</p><p className="text-xs text-slate-300 mt-0.5">Across Chandigarh Tricity</p></div>
    </div>
  </div>
);
export const Faqs = ({ items }) => (<div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">{items.map(([q, a]) => (<details key={q} className="group p-5"><summary className="cursor-pointer font-semibold text-navy-900 list-none flex justify-between items-center">{q}<span className="text-teal-600 font-bold transition group-open:rotate-45 text-xl leading-none">+</span></summary><p className="mt-3 text-slate-600 leading-relaxed text-sm">{a}</p></details>))}</div>);
export const Section = ({ title, children, tint }) => (<section className={tint ? 'bg-slate-50' : ''}><div className="mx-auto max-w-6xl px-4 py-12"><h2 className="mb-6 text-2xl font-bold text-navy-900">{title}</h2>{children}</div></section>);
export const Hero = ({ h1, children, crumbs, image, imageAlt }) => (
  <header className="bg-navy-900 text-white">
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      {crumbs}
      <div className={image ? "grid items-center gap-8 lg:grid-cols-12" : ""}>
        <div className={image ? "lg:col-span-7" : ""}>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">{h1}</h1>
          <div className="mt-4 max-w-2xl text-slate-200">{children}</div>
        </div>
        {image && (
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-slate-700/60 shadow-2xl">
              <img src={image} alt={imageAlt || h1} className="h-64 w-full object-cover object-top sm:h-80 md:h-96" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        )}
      </div>
    </div>
  </header>
);
