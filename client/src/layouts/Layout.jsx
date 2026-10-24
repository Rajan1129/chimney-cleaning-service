import { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import { SITE, addressLine } from '../data/site';
import { cities, services } from '../data/content';
import { telHref, waHref } from '../lib/links';
import { track } from '../lib/analytics';
const nav = [['/', 'Home'], ['/services', 'Services'], ['/locations', 'Locations'], ['/about', 'About'], ['/contact', 'Contact']];
export default function Layout() {
  const [open, setOpen] = useState(false);
  const [callToast, setCallToast] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);

  useEffect(() => {
    let timer;
    const onGlobalClick = (e) => {
      const anchor = e.target.closest('a[href^="tel:"]');
      if (!anchor) return;
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(SITE.phone).catch(() => {});
      }
      setCallToast(true);
      clearTimeout(timer);
      timer = setTimeout(() => setCallToast(false), 3500);
    };
    document.addEventListener('click', onGlobalClick);
    return () => {
      document.removeEventListener('click', onGlobalClick);
      clearTimeout(timer);
    };
  }, []);

  const link = ({ isActive }) => 'px-3 py-2 rounded ' + (isActive ? 'text-teal-600 font-semibold' : 'hover:text-teal-600');
  return (<div className="pb-16 md:pb-0">
    <a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
    {callToast && (
      <aside aria-label="Calling status" aria-live="polite" className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 rounded-full border border-teal-400/40 bg-navy-900/95 text-white px-4 py-2 text-xs shadow-2xl backdrop-blur-md">
        <Phone size={14} className="text-teal-400 shrink-0 animate-pulse" />
        <span>Calling <strong>{SITE.phoneDisplay}</strong> &bull; <span className="text-teal-300">Number copied</span></span>
      </aside>
    )}
    <div className="sticky top-0 z-30 border-b border-slate-200/80 backdrop-blur-md bg-white/85 shadow-xs">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5">
      <Link to="/" className="flex items-center gap-2.5">
        <img src="/logo.png" alt={SITE.name} className="h-12 w-auto object-contain drop-shadow-xs" />
        <span className="text-xl font-black tracking-tight text-navy-900 hidden sm:inline">{SITE.name}</span>
      </Link>
      <nav aria-label="Main" className="hidden gap-1 md:flex">{nav.map(([to, l]) => <NavLink key={to} to={to} end className={link}>{l}</NavLink>)}</nav>
      <div className="flex items-center gap-2">
        <a
          href={telHref}
          onClick={() => track('call_click', { location: 'header' })}
          className="btn btn-primary flex items-center justify-center p-2 md:px-4 md:py-2"
          aria-label={`Call ${SITE.phoneDisplay}`}
          title={`Call ${SITE.phoneDisplay}`}
        >
          <Phone size={18} className="shrink-0" />
          <span className="hidden md:inline ml-2">{SITE.phoneDisplay}</span>
        </a>
        <button
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </div>
    {open && <nav aria-label="Mobile" className="flex flex-col border-t border-slate-200/80 backdrop-blur-lg bg-white/95 px-4 py-3 md:hidden">{nav.map(([to, l]) => <NavLink key={to} to={to} end className={link}>{l}</NavLink>)}</nav>}</div>
    <main id="main"><Outlet /></main>
    <footer className="bg-navy-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Business NAP */}
        <div>
          <div className="mb-3 inline-block rounded-xl bg-white p-2 shadow-xs">
            <img src="/logo.png" alt={SITE.name} className="h-12 w-auto object-contain" />
          </div>
          <p className="font-bold text-white text-base">{SITE.name} Service</p>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            Specialized doorstep Kitchen Chimney, Hob, Gas Stove & RO Water Purifier repair, deep degreasing, and installation.
          </p>
          <p className="mt-3 text-xs text-slate-300">{addressLine}</p>
          <a className="mt-2 block font-bold text-teal-400 hover:underline" href={telHref}>{SITE.phoneDisplay}</a>
          <p className="mt-1 text-[11px] text-slate-400">Open 7 Days: 8:00 AM – 8:00 PM</p>
        </div>

        {/* Core Services */}
        <div>
          <p className="font-bold text-white text-sm uppercase tracking-wider">Our Services</p>
          <ul className="mt-3 space-y-2 text-xs">
            {services.filter(s => s.page).map(s => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="hover:text-teal-400 transition">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* High-Intent SEO City Locations */}
        <div>
          <p className="font-bold text-white text-sm uppercase tracking-wider">Service Areas</p>
          <ul className="mt-3 space-y-2 text-xs">
            {cities.map(c => (
              <li key={c.slug}>
                <Link to={`/chimney-service-in-${c.slug}`} className="hover:text-teal-400 transition">
                  Chimney Service in {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs">
            <Link to="/locations" className="text-teal-400 hover:underline">
              View all Tricity coverage &rarr;
            </Link>
          </p>
        </div>

        {/* Quick Links & Legal */}
        <div>
          <p className="font-bold text-white text-sm uppercase tracking-wider">Quick Links</p>
          <ul className="mt-3 space-y-2 text-xs">
            {[...nav, ['/privacy-policy', 'Privacy Policy'], ['/admin', 'Admin Login']].map(([to, l]) => (
              <li key={to}>
                <Link to={to} className="hover:text-teal-400 transition">{l}</Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg border border-slate-800 bg-slate-800/40 p-3">
            <p className="text-[11px] font-semibold text-teal-300">✓ Genuine Doorstep Care</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Pay after test run & inspection across Chandigarh, Mohali & Panchkula.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved. Chandigarh Tricity Doorstep Appliance Care.</p>
      </div>
    </footer>
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-slate-200/80 backdrop-blur-lg bg-white/90 p-2.5 md:hidden shadow-lg">
      <a href={telHref} onClick={() => track('call_click', { location: 'sticky' })} className="btn btn-primary shadow-md"><Phone size={18} />Call Now</a>
      <a href={waHref()} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click', { location: 'sticky' })} className="btn btn-outline backdrop-blur-md bg-white/70 shadow-sm"><MessageCircle size={18} />WhatsApp</a>
    </div></div>);
}
