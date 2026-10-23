import { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import { SITE, addressLine } from '../data/site';
import { cities } from '../data/content';
import { telHref, waHref } from '../lib/links';
import { track } from '../lib/analytics';
const nav = [['/', 'Home'], ['/services', 'Services'], ['/about', 'About'], ['/contact', 'Contact']];
export default function Layout() {
  const [open, setOpen] = useState(false); const { pathname } = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);
  const link = ({ isActive }) => 'px-3 py-2 rounded ' + (isActive ? 'text-teal-600 font-semibold' : 'hover:text-teal-600');
  return (<div className="pb-16 md:pb-0">
    <a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
    <div className="sticky top-0 z-30 border-b bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <Link to="/" className="flex items-center gap-2.5">
        <img src="/logo.png" alt={SITE.name} className="h-10 w-auto object-contain" />
        <span className="text-lg font-bold text-navy-900">{SITE.name}</span>
      </Link>
      <nav aria-label="Main" className="hidden gap-1 md:flex">{nav.map(([to, l]) => <NavLink key={to} to={to} end className={link}>{l}</NavLink>)}</nav>
      <a href={telHref} onClick={() => track('call_click', { location: 'header' })} className="btn btn-primary hidden py-2 md:inline-flex"><Phone size={16} />{SITE.phoneDisplay}</a>
      <button className="md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav aria-label="Mobile" className="flex flex-col border-t px-4 py-2 md:hidden">{nav.map(([to, l]) => <NavLink key={to} to={to} end className={link}>{l}</NavLink>)}</nav>}</div>
    <main id="main"><Outlet /></main>
    <footer className="bg-navy-900 text-slate-300"><div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
      <div>
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt={SITE.name} className="h-10 w-auto rounded bg-white p-1 object-contain" />
          <span className="font-bold text-white">{SITE.name}</span>
        </div>
        <p className="mt-2">{addressLine}</p>
        <a className="mt-1 block" href={telHref}>{SITE.phoneDisplay}</a>
      </div>
      <div><p className="font-bold text-white">Service areas</p><ul className="mt-2 space-y-1">{cities.map(c => <li key={c.slug}><Link to={`/chimney-service-${c.slug}`}>{c.name}</Link></li>)}</ul><p className="mt-2 text-sm">Availability confirmed per request.</p></div>
      <div><p className="font-bold text-white">Links</p><ul className="mt-2 space-y-1">{[...nav, ['/privacy-policy', 'Privacy Policy']].map(([to, l]) => <li key={to}><Link to={to}>{l}</Link></li>)}</ul></div>
    </div></footer>
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t bg-white p-2 md:hidden">
      <a href={telHref} onClick={() => track('call_click', { location: 'sticky' })} className="btn btn-primary"><Phone size={18} />Call Now</a>
      <a href={waHref()} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click', { location: 'sticky' })} className="btn btn-outline"><MessageCircle size={18} />WhatsApp</a>
    </div></div>);
}
