import { Phone, MessageCircle } from 'lucide-react';
import { telHref, waHref } from '../lib/links';
import { SITE } from '../data/site';
import { track } from '../lib/analytics';

export default function Cta({ location, dark = true }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={telHref}
        onClick={() => track('call_click', { location })}
        className="btn btn-primary btn-shine shadow-lg shadow-teal-600/30"
      >
        <Phone size={18} className="animate-pulse" />
        Call Now {SITE.phoneDisplay}
      </a>
      <a
        href={waHref(location)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('whatsapp_click', { location })}
        className={
          'btn ' +
          (dark
            ? 'backdrop-blur-md bg-white/15 hover:bg-white/25 text-white border border-white/25 shadow-lg'
            : 'btn-outline')
        }
      >
        <MessageCircle size={18} className="text-emerald-400" />
        WhatsApp Us
      </a>
    </div>
  );
}

export const TrustBar = () => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-8 border-t border-white/15 mt-8">
    <div className="group flex items-center gap-3 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 p-3 shadow-sm hover:bg-white/10 hover:border-teal-400/40 hover:-translate-y-0.5 transition-all duration-300">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300 font-bold text-base group-hover:scale-110 group-hover:bg-teal-500/30 transition">
        ✓
      </span>
      <div>
        <p className="font-bold text-white text-xs sm:text-sm leading-none">Pay After Service</p>
        <p className="text-[11px] text-slate-300 mt-1">Test run before payment</p>
      </div>
    </div>
    <div className="group flex items-center gap-3 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 p-3 shadow-sm hover:bg-white/10 hover:border-teal-400/40 hover:-translate-y-0.5 transition-all duration-300">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300 font-bold text-base group-hover:scale-110 group-hover:bg-teal-500/30 transition">
        📋
      </span>
      <div>
        <p className="font-bold text-white text-xs sm:text-sm leading-none">Upfront Inspection</p>
        <p className="text-[11px] text-slate-300 mt-1">Clear quote before work</p>
      </div>
    </div>
    <div className="group flex items-center gap-3 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 p-3 shadow-sm hover:bg-white/10 hover:border-teal-400/40 hover:-translate-y-0.5 transition-all duration-300">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300 font-bold text-base group-hover:scale-110 group-hover:bg-teal-500/30 transition">
        🛡️
      </span>
      <div>
        <p className="font-bold text-white text-xs sm:text-sm leading-none">Genuine Spares</p>
        <p className="text-[11px] text-slate-300 mt-1">Brand-compatible parts</p>
      </div>
    </div>
    <div className="group flex items-center gap-3 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 p-3 shadow-sm hover:bg-white/10 hover:border-teal-400/40 hover:-translate-y-0.5 transition-all duration-300">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300 font-bold text-base group-hover:scale-110 group-hover:bg-teal-500/30 transition">
        🛵
      </span>
      <div>
        <p className="font-bold text-white text-xs sm:text-sm leading-none">Doorstep Visit</p>
        <p className="text-[11px] text-slate-300 mt-1">Across Chandigarh Tricity</p>
      </div>
    </div>
  </div>
);

export const Faqs = ({ items }) => (
  <div className="divide-y divide-slate-200/80 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-sm overflow-hidden">
    {items.map(([q, a]) => (
      <details key={q} className="group p-5 transition duration-200 hover:bg-slate-50/60 open:bg-teal-50/20">
        <summary className="cursor-pointer font-semibold text-navy-900 list-none flex justify-between items-center gap-4">
          <span className="group-hover:text-teal-700 transition">{q}</span>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-teal-600 font-bold transition group-open:rotate-45 group-hover:bg-teal-100 text-lg leading-none">
            +
          </span>
        </summary>
        <p className="mt-3 text-slate-600 leading-relaxed text-sm pr-6">{a}</p>
      </details>
    ))}
  </div>
);

export const Section = ({ title, children, tint }) => (
  <section className={tint ? 'bg-gradient-to-b from-slate-50 to-slate-100/60' : ''}>
    <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
      <h2 className="mb-8 text-2xl sm:text-3xl font-extrabold tracking-tight text-navy-900">{title}</h2>
      {children}
    </div>
  </section>
);

export const Hero = ({ h1, children, crumbs, image, imageAlt }) => (
  <header className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-slate-950 text-white">
    {/* Tech dot grid pattern overlay */}
    <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-40" />

    {/* Subtle Glassmorphism Ambient Glows */}
    <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
    <div className="pointer-events-none absolute bottom-0 -right-24 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />

    <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-16">
      {crumbs}
      <div className={image ? "grid items-center gap-8 lg:grid-cols-12" : ""}>
        <div className={image ? "lg:col-span-7" : ""}>
          <h1 className="max-w-3xl text-3xl font-black leading-tight sm:text-4xl md:text-5xl">{h1}</h1>
          <div className="mt-4 max-w-2xl text-slate-200">{children}</div>
        </div>
        {image && (
          <div className="lg:col-span-5">
            <div className="group relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl backdrop-blur-md bg-white/5 p-2 transition duration-300 hover:border-teal-400/40">
              <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden rounded-xl">
                <img
                  src={image}
                  alt={imageAlt || h1}
                  className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-transparent" />
                
                {/* Floating Glass Pill: Live Availability (Top-Right) */}
                <div className="absolute top-3.5 right-3.5 rounded-full backdrop-blur-md bg-navy-950/80 border border-white/25 px-3 py-1.5 shadow-xl flex items-center gap-2 animate-float">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-bold text-white tracking-wide">Same-Day Slots Open</span>
                </div>

                {/* Floating Glassmorphic Trust Tag (Bottom) */}
                <div className="absolute bottom-3 left-3 right-3 rounded-xl backdrop-blur-md bg-navy-900/85 border border-white/25 p-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-teal-300">✓ Certified Chimney Techs</p>
                      <p className="text-[11px] text-slate-200 font-medium">Doorstep Across Chandigarh Tricity</p>
                    </div>
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300 font-bold text-xs">
                      100%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </header>
);
