import { Link, useParams } from 'react-router-dom';
import Seo, { business, breadcrumb, webSite, serviceLd } from '../components/Seo';
import Cta, { Faqs, Section, Hero } from '../components/Cta';
import EnquiryForm from '../components/EnquiryForm';
import { SITE, addressLine, mapsUrl } from '../data/site';
import { services, cities, problems, processSteps, homeFaqs } from '../data/content';
import { telHref, waHref } from '../lib/links';
const Crumbs = ({ items }) => <nav aria-label="Breadcrumb" className="mb-3 text-sm text-slate-300">{items.map(([l, p], i) => <span key={p}>{i > 0 && ' / '}{i < items.length - 1 ? <Link to={p} className="underline">{l}</Link> : l}</span>)}</nav>;
const Cards = ({ items }) => <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items}</div>;
const Card = ({ children }) => <div className="rounded-xl border bg-white p-5 shadow-sm">{children}</div>;
const AreaLinks = ({ list = cities }) => <div className="flex flex-wrap gap-2">{list.map(c => <Link key={c.slug} to={`/chimney-service-${c.slug}`} className="btn btn-outline py-2">{c.name}</Link>)}</div>;
const Process = () => <ol className="grid gap-4 md:grid-cols-4">{processSteps.map(([t, d], i) => <li key={t} className="rounded-xl border p-4"><p className="font-semibold text-navy-900">{i + 1}. {t}</p><p className="mt-1 text-sm text-slate-600">{d}</p></li>)}</ol>;

export function Home() {
  const title = 'Kitchen Chimney Repair & Service in Chandigarh Tricity';
  return (<>
    <Seo title={`${title} | ${SITE.name}`} description="Kitchen chimney repair, cleaning and installation in Chandigarh, Mohali, Kharar, Zirakpur, Panchkula and Ludhiana. Call or WhatsApp." jsonLd={[business(), webSite()]} />
    <Hero h1="Expert Kitchen Chimney Repair & Service in Chandigarh Tricity"><p className="mb-6">Repair, installation and maintenance for kitchen chimneys. Tell us what is wrong and we will explain the next step.</p><Cta location="hero" /></Hero>
    <Section title="Our services"><Cards items={services.filter(s => s.page).map(s => <Card key={s.slug}><h3 className="font-semibold">{s.title}</h3><p className="mt-1 text-sm text-slate-600">{s.short}</p><Link className="mt-3 inline-block text-teal-600 underline" to={`/services/${s.slug}`}>Learn more</Link></Card>)} /></Section>
    <Section title="Common chimney problems" tint><Cards items={problems.map(([t, d]) => <Card key={t}><h3 className="font-semibold">{t}</h3><p className="mt-1 text-sm text-slate-600">{d}</p></Card>)} /></Section>
    <Section title="How our service works"><Process /></Section>
    <Section title="Areas we serve" tint><p className="mb-4 text-slate-600">Based in Chandigarh. Availability in other cities is confirmed when you contact us.</p><AreaLinks /></Section>
    <Section title="Why choose us"><ul className="list-disc space-y-2 pl-5 text-slate-700"><li>Inspection first, with a clear explanation before work starts.</li><li>Honest advice on repair versus replacement.</li><li>Simple booking by call, WhatsApp or form.</li></ul></Section>
    <Section title="Frequently asked questions" tint><Faqs items={homeFaqs} /></Section>
    <Section title="Need chimney service?"><Cta location="home-final" dark={false} /></Section>
  </>);
}
export function Services() {
  return (<><Seo path="/services" title={`Kitchen Chimney Services | ${SITE.name}`} description="Chimney repair, deep cleaning, installation, reinstallation, filter cleaning and maintenance in Chandigarh Tricity." jsonLd={[breadcrumb([['Home', '/'], ['Services', '/services']])]} />
    <Hero h1="Kitchen Chimney Repair, Cleaning and Installation Services" crumbs={<Crumbs items={[['Home', '/'], ['Services', '/services']]} />}><p>Parts and model support vary, so we confirm what is possible after inspection.</p></Hero>
    <Section title="What we do"><Cards items={services.map(s => <Card key={s.slug}><h2 className="text-lg font-semibold">{s.title}</h2><p className="mt-1 text-sm text-slate-600">{s.short}</p><ul className="mt-2 list-disc pl-5 text-sm">{s.includes.map(i => <li key={i}>{i}</li>)}</ul>{s.page && <Link className="mt-3 inline-block text-teal-600 underline" to={`/services/${s.slug}`}>Details</Link>}</Card>)} /></Section>
    <Section title="Service areas" tint><AreaLinks /><div className="mt-6"><Cta location="services" dark={false} /></div></Section></>);
}
export function ServicePage() {
  const s = services.find(x => x.slug === useParams().slug && x.page);
  if (!s) return <NotFound />;
  const path = `/services/${s.slug}`;
  return (<><Seo path={path} title={`${s.title} in Chandigarh Tricity | ${SITE.name}`} description={s.short} jsonLd={[serviceLd(s), breadcrumb([['Home', '/'], ['Services', '/services'], [s.title, path]])]} />
    <Hero h1={`${s.title} in Chandigarh Tricity`} crumbs={<Crumbs items={[['Home', '/'], ['Services', '/services'], [s.title, path]]} />}><p className="mb-6">{s.intro}</p><Cta location={s.slug} /></Hero>
    <Section title="What the service includes"><ul className="list-disc pl-5">{s.includes.map(i => <li key={i}>{i}</li>)}</ul></Section>
    <Section title="Common symptoms" tint><ul className="list-disc pl-5">{s.symptoms.map(i => <li key={i}>{i}</li>)}</ul></Section>
    <Section title="Our process"><Process /></Section>
    <Section title="Frequently asked questions" tint><Faqs items={s.faqs} /></Section>
    <Section title="Service areas"><AreaLinks /></Section></>);
}
export function CityPage({ slug }) {
  const c = cities.find(x => x.slug === slug); const path = `/chimney-service-${slug}`;
  return (<><Seo path={path} title={`${c.title} | ${SITE.name}`} description={c.desc} jsonLd={[business(), breadcrumb([['Home', '/'], [c.name, path]])]} />
    <Hero h1={c.h1} crumbs={<Crumbs items={[['Home', '/'], [c.name, path]]} />}><p className="mb-6">{c.intro}</p><Cta location={slug} /></Hero>
    <Section title={`What customers in ${c.name} ask us about`}><ul className="list-disc space-y-2 pl-5">{c.local.map(l => <li key={l}>{l}</li>)}</ul></Section>
    <Section title="Services available" tint><Cards items={services.filter(s => s.page).map(s => <Card key={s.slug}><Link className="font-semibold text-teal-600 underline" to={`/services/${s.slug}`}>{s.title}</Link></Card>)} /></Section>
    <Section title={`${c.name} chimney service FAQs`}><Faqs items={c.faqs} /></Section>
    <Section title="Nearby areas" tint><AreaLinks list={c.related.map(r => cities.find(x => x.slug === r))} /></Section></>);
}
export function About() {
  return (<><Seo path="/about" title={`About ${SITE.name}`} description="Kitchen chimney repair, cleaning and installation based in Sector 39, Maloya, Chandigarh." jsonLd={[business()]} />
    <Hero h1={`About ${SITE.name}`}><p>We repair, clean and install kitchen chimneys for homes in Chandigarh Tricity and nearby areas.</p></Hero>
    <Section title="Where we work"><p className="max-w-2xl text-slate-700">Our address is {addressLine}. We travel to customers, and availability outside Chandigarh is confirmed for each request. Edit this page in <code>src/pages/pages.jsx</code> once the business details are final.</p></Section></>);
}
export function Contact() {
  return (<><Seo path="/contact" title={`Contact ${SITE.name} | Chimney Service Enquiry`} description="Call, WhatsApp or send an enquiry for kitchen chimney repair, cleaning or installation." jsonLd={[business(), breadcrumb([['Home', '/'], ['Contact', '/contact']])]} />
    <Hero h1="Contact Us for Kitchen Chimney Service"><p>Call, message on WhatsApp, or send the form.</p></Hero>
    <Section title="Get in touch"><div className="grid gap-10 md:grid-cols-2"><div className="space-y-4"><Cta location="contact" dark={false} /><p><strong>Address:</strong> {addressLine}</p><a className="text-teal-600 underline" href={mapsUrl} target="_blank" rel="noopener noreferrer">Get directions on Google Maps</a></div><EnquiryForm /></div></Section></>);
}
export function Privacy() {
  return (<><Seo path="/privacy-policy" title={`Privacy Policy | ${SITE.name}`} description="How we use the information you send in a service enquiry." />
    <Hero h1="Privacy Policy"><p>Draft for review before publication.</p></Hero>
    <Section title="Information we collect"><div className="max-w-2xl space-y-3 text-slate-700"><p>When you send an enquiry we collect your name, phone number, city, required service and optional message.</p><p>We use it only to respond to your request. Questions about your information: call {SITE.phoneDisplay} or write to us at {addressLine}.</p></div></Section></>);
}
export function NotFound() {
  return (<><Seo title={`Page not found | ${SITE.name}`} description="This page does not exist." noindex /><Hero h1="Page not found"><p className="mb-4">The page you wanted is not here.</p><Link to="/" className="btn btn-wa">Go to home page</Link></Hero></>);
}
