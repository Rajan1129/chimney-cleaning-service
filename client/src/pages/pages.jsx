import { Link, useParams } from 'react-router-dom';
import Seo, { business, breadcrumb, webSite, serviceLd } from '../components/Seo';
import Cta, { Faqs, Section, Hero } from '../components/Cta';
import EnquiryForm from '../components/EnquiryForm';
import { SITE, addressLine, mapsUrl } from '../data/site';
import { services, cities, problems, processSteps, homeFaqs } from '../data/content';
import { telHref, waHref } from '../lib/links';
const Crumbs = ({ items }) => <nav aria-label="Breadcrumb" className="mb-3 text-sm text-slate-300">{items.map(([l, p], i) => <span key={p}>{i > 0 && ' / '}{i < items.length - 1 ? <Link to={p} className="underline">{l}</Link> : l}</span>)}</nav>;
const Cards = ({ items }) => <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items}</div>;
const Card = ({ children, image, imageAlt }) => (
  <div className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
    {image && (
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img src={image} alt={imageAlt || ""} className="h-full w-full object-cover transition duration-300 hover:scale-105" />
      </div>
    )}
    <div className="flex flex-1 flex-col justify-between p-5">{children}</div>
  </div>
);
const AreaLinks = ({ list = cities }) => <div className="flex flex-wrap gap-2">{list.map(c => <Link key={c.slug} to={`/chimney-service-${c.slug}`} className="btn btn-outline py-2">{c.name}</Link>)}</div>;
const Process = () => <ol className="grid gap-4 md:grid-cols-4">{processSteps.map(([t, d], i) => <li key={t} className="rounded-xl border p-4"><p className="font-semibold text-navy-900">{i + 1}. {t}</p><p className="mt-1 text-sm text-slate-600">{d}</p></li>)}</ol>;

export function Home() {
  const title = 'Kitchen Chimney Repair & Service in Chandigarh Tricity';
  return (<>
    <Seo title={`${title} | ${SITE.name}`} description="Kitchen chimney repair, cleaning and installation in Chandigarh, Mohali, Kharar, Zirakpur, Panchkula and Ludhiana. Call or WhatsApp." jsonLd={[business(), webSite()]} />
    <Hero h1="Expert Kitchen Chimney Repair & Service in Chandigarh Tricity" image="/images/hero_chimney.jpg" imageAlt="Kitchen Chimney Service in Chandigarh"><p className="mb-6">Fast, professional repair, deep cleaning and installation for all kitchen chimney brands. Tell us what is wrong and our technician will assist you promptly.</p><Cta location="hero" /></Hero>
    <Section title="Our services"><Cards items={services.filter(s => s.page).map(s => <Card key={s.slug} image={s.image} imageAlt={s.title}><h3 className="font-semibold text-lg text-navy-900">{s.title}</h3><p className="mt-1 text-sm text-slate-600">{s.short}</p><Link className="mt-4 inline-block font-medium text-teal-600 underline hover:text-teal-700" to={`/services/${s.slug}`}>Learn more &rarr;</Link></Card>)} /></Section>
    <Section title="Common chimney problems" tint><Cards items={problems.map(([t, d]) => <Card key={t}><h3 className="font-semibold text-navy-900">{t}</h3><p className="mt-1 text-sm text-slate-600">{d}</p></Card>)} /></Section>
    <Section title="How our service works"><Process /></Section>
    <Section title="Areas we serve" tint><div className="mb-6 grid items-center gap-8 md:grid-cols-12"><div className="md:col-span-7"><p className="mb-4 leading-relaxed text-slate-600">Based in Chandigarh (Sector 39, Maloya). We serve independent homes, flats, and residential societies across Chandigarh, Mohali, Kharar, Zirakpur, Panchkula, and Ludhiana.</p><AreaLinks /></div><div className="md:col-span-5"><div className="overflow-hidden rounded-2xl border border-slate-200 shadow-md"><img src="/images/tricity_apartments.jpg" alt="Residential societies in Chandigarh Tricity" className="h-56 w-full object-cover" /><p className="border-t bg-white p-3 text-xs text-slate-500">Serving societies & homes across Chandigarh Tricity</p></div></div></div></Section>
    <Section title="Why choose us"><div className="grid items-center gap-8 md:grid-cols-12"><div className="md:col-span-5"><img src="/images/chimney_technician.jpg" alt="Certified Chimney Technician" className="h-80 w-full rounded-2xl border border-slate-200 object-cover shadow-lg" /></div><div className="md:col-span-7"><ul className="space-y-4 text-slate-700"><li className="flex items-start gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 font-bold text-sm text-teal-700">✓</span><div><strong className="font-semibold text-navy-900">Inspection first, clear explanation:</strong><p className="text-sm text-slate-600">A trained technician inspects the motor, filters, and ducting before providing clear, upfront advice.</p></div></li><li className="flex items-start gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 font-bold text-sm text-teal-700">✓</span><div><strong className="font-semibold text-navy-900">Honest repair vs replacement guidance:</strong><p className="text-sm text-slate-600">If a simple cleaning or minor repair fixes the airflow, we advise that plainly without unnecessary upsells.</p></div></li><li className="flex items-start gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 font-bold text-sm text-teal-700">✓</span><div><strong className="font-semibold text-navy-900">Quick doorstep service:</strong><p className="text-sm text-slate-600">Prompt response via Call or WhatsApp for homes, flats, and societies.</p></div></li></ul></div></div></Section>
    <Section title="Frequently asked questions" tint><Faqs items={homeFaqs} /></Section>
    <Section title="Need chimney service?"><Cta location="home-final" dark={false} /></Section>
  </>);
}
export function Services() {
  return (<><Seo path="/services" title={`Kitchen Chimney Services | ${SITE.name}`} description="Chimney repair, deep cleaning, installation, reinstallation, filter cleaning and maintenance in Chandigarh Tricity." jsonLd={[breadcrumb([['Home', '/'], ['Services', '/services']])]} />
    <Hero h1="Kitchen Chimney Repair, Cleaning and Installation Services" crumbs={<Crumbs items={[['Home', '/'], ['Services', '/services']]} />} image="/images/chimney_technician.jpg" imageAlt="Kitchen Chimney Service Engineer"><p>Parts and model support vary, so we confirm what is possible after inspection.</p></Hero>
    <Section title="What we do"><Cards items={services.map(s => <Card key={s.slug} image={s.image} imageAlt={s.title}><h2 className="text-lg font-semibold text-navy-900">{s.title}</h2><p className="mt-1 text-sm text-slate-600">{s.short}</p><ul className="mt-2 list-disc pl-5 text-sm">{s.includes.map(i => <li key={i}>{i}</li>)}</ul>{s.page && <Link className="mt-4 inline-block font-medium text-teal-600 underline hover:text-teal-700" to={`/services/${s.slug}`}>Details &rarr;</Link>}</Card>)} /></Section>
    <Section title="Service areas" tint><AreaLinks /><div className="mt-6"><Cta location="services" dark={false} /></div></Section></>);
}
export function ServicePage() {
  const s = services.find(x => x.slug === useParams().slug && x.page);
  if (!s) return <NotFound />;
  const path = `/services/${s.slug}`;
  return (<><Seo path={path} title={`${s.title} in Chandigarh Tricity | ${SITE.name}`} description={s.short} jsonLd={[serviceLd(s), breadcrumb([['Home', '/'], ['Services', '/services'], [s.title, path]])]} />
    <Hero h1={`${s.title} in Chandigarh Tricity`} crumbs={<Crumbs items={[['Home', '/'], ['Services', '/services'], [s.title, path]]} />} image={s.image || "/images/hero_chimney.jpg"} imageAlt={s.title}><p className="mb-6">{s.intro}</p><Cta location={s.slug} /></Hero>
    <Section title="What the service includes"><ul className="list-disc pl-5">{s.includes.map(i => <li key={i}>{i}</li>)}</ul></Section>
    <Section title="Common symptoms" tint><ul className="list-disc pl-5">{s.symptoms.map(i => <li key={i}>{i}</li>)}</ul></Section>
    <Section title="Our process"><Process /></Section>
    <Section title="Frequently asked questions" tint><Faqs items={s.faqs} /></Section>
    <Section title="Service areas"><AreaLinks /></Section></>);
}
export function CityPage({ slug }) {
  const c = cities.find(x => x.slug === slug); const path = `/chimney-service-${slug}`;
  return (<><Seo path={path} title={`${c.title} | ${SITE.name}`} description={c.desc} jsonLd={[business(), breadcrumb([['Home', '/'], [c.name, path]])]} />
    <Hero h1={c.h1} crumbs={<Crumbs items={[['Home', '/'], [c.name, path]]} />} image="/images/tricity_apartments.jpg" imageAlt={`Residential society chimney service in ${c.name}`}><p className="mb-6">{c.intro}</p><Cta location={slug} /></Hero>
    <Section title={`What customers in ${c.name} ask us about`}><ul className="list-disc space-y-2 pl-5">{c.local.map(l => <li key={l}>{l}</li>)}</ul></Section>
    <Section title="Services available" tint><Cards items={services.filter(s => s.page).map(s => <Card key={s.slug} image={s.image} imageAlt={s.title}><Link className="text-lg font-semibold text-teal-600 underline hover:text-teal-700" to={`/services/${s.slug}`}>{s.title}</Link><p className="mt-1 text-sm text-slate-600">{s.short}</p></Card>)} /></Section>
    <Section title={`${c.name} chimney service FAQs`}><Faqs items={c.faqs} /></Section>
    <Section title="Nearby areas" tint><AreaLinks list={c.related.map(r => cities.find(x => x.slug === r))} /></Section></>);
}
export function About() {
  return (<><Seo path="/about" title={`About ${SITE.name}`} description="Kitchen chimney repair, cleaning and installation based in Sector 39, Maloya, Chandigarh." jsonLd={[business()]} />
    <Hero h1={`About ${SITE.name}`} image="/images/chimney_technician.jpg" imageAlt="Kitchen Chimney Service Team"><p>We repair, clean and install kitchen chimneys for homes in Chandigarh Tricity and nearby areas.</p></Hero>
    <Section title="Where we work"><div className="grid items-center gap-8 md:grid-cols-12"><div className="md:col-span-7"><p className="leading-relaxed text-slate-700">Our address is <strong>{addressLine}</strong>. We travel to customers across Chandigarh, Mohali, Kharar, Zirakpur, Panchkula, and Ludhiana. Availability outside Chandigarh is confirmed for each request.</p><p className="mt-3 text-slate-700">Equipped with specialized cleaning degreasers and diagnostic tools, we ensure safe and efficient operation of your kitchen exhaust equipment.</p></div><div className="md:col-span-5"><img src="/images/tricity_apartments.jpg" alt="Service areas across Tricity" className="h-56 w-full rounded-xl border border-slate-200 object-cover shadow-md" /></div></div></Section></>);
}
export function Contact() {
  return (<><Seo path="/contact" title={`Contact ${SITE.name} | Chimney Service Enquiry`} description="Call, WhatsApp or send an enquiry for kitchen chimney repair, cleaning or installation." jsonLd={[business(), breadcrumb([['Home', '/'], ['Contact', '/contact']])]} />
    <Hero h1="Contact Us for Kitchen Chimney Service" image="/images/hero_chimney.jpg" imageAlt="Contact Kitchen King Chimney Service"><p>Call, message on WhatsApp, or send the form for quick doorstep service.</p></Hero>
    <Section title="Get in touch"><div className="grid gap-10 md:grid-cols-2"><div className="space-y-4"><Cta location="contact" dark={false} /><p><strong>Address:</strong> {addressLine}</p><a className="font-medium text-teal-600 underline" href={mapsUrl} target="_blank" rel="noopener noreferrer">Get directions on Google Maps &rarr;</a><div className="pt-2"><img src="/images/chimney_technician.jpg" alt="Doorstep Service Technician" className="h-60 w-full rounded-xl border border-slate-200 object-cover shadow-md" /></div></div><EnquiryForm /></div></Section></>);
}
export function Privacy() {
  return (<><Seo path="/privacy-policy" title={`Privacy Policy | ${SITE.name}`} description="How we use the information you send in a service enquiry." />
    <Hero h1="Privacy Policy"><p>Draft for review before publication.</p></Hero>
    <Section title="Information we collect"><div className="max-w-2xl space-y-3 text-slate-700"><p>When you send an enquiry we collect your name, phone number, city, required service and optional message.</p><p>We use it only to respond to your request. Questions about your information: call {SITE.phoneDisplay} or write to us at {addressLine}.</p></div></Section></>);
}
export function NotFound() {
  return (<><Seo title={`Page not found | ${SITE.name}`} description="This page does not exist." noindex /><Hero h1="Page not found"><p className="mb-4">The page you wanted is not here.</p><Link to="/" className="btn btn-wa">Go to home page</Link></Hero></>);
}
