import { Link, useParams } from 'react-router-dom';
import Seo, { business, breadcrumb, webSite, serviceLd } from '../components/Seo';
import Cta, { Faqs, Section, Hero, TrustBar } from '../components/Cta';
import EnquiryForm from '../components/EnquiryForm';
import { SITE, addressLine, mapsUrl } from '../data/site';
import { services, cities, problems, processSteps, homeFaqs, brands } from '../data/content';
import { telHref, waHref } from '../lib/links';

const Crumbs = ({ items }) => <nav aria-label="Breadcrumb" className="mb-3 text-sm text-slate-300">{items.map(([l, p], i) => <span key={p}>{i > 0 && ' / '}{i < items.length - 1 ? <Link to={p} className="underline">{l}</Link> : l}</span>)}</nav>;
const Cards = ({ items }) => <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items}</div>;
const Card = ({ children, image, imageAlt }) => (
  <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    {image && (
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img src={image} alt={imageAlt || ""} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    )}
    <div className="flex flex-1 flex-col justify-between p-6">{children}</div>
  </div>
);
const AreaCards = ({ list = cities }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {list.map(c => (
      <Link key={c.slug} to={`/chimney-service-${c.slug}`} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative h-40 w-full overflow-hidden bg-slate-100">
          <img src={c.image} alt={c.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 rounded-md bg-teal-600/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {c.name}
          </span>
        </div>
        <div className="flex items-center justify-between p-4">
          <div>
            <h4 className="font-bold text-navy-900 group-hover:text-teal-600 transition">Chimney Service in {c.name}</h4>
            <p className="mt-0.5 text-xs text-slate-500">Doorstep technicians ready</p>
          </div>
          <span className="text-lg font-bold text-teal-600 transition group-hover:translate-x-1">&rarr;</span>
        </div>
      </Link>
    ))}
  </div>
);
const Process = () => (
  <ol className="grid gap-4 md:grid-cols-4">
    {processSteps.map(([t, d], i) => (
      <li key={t} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100 font-bold text-teal-700">0{i + 1}</span>
        <p className="mt-3 font-bold text-navy-900">{t}</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{d}</p>
      </li>
    ))}
  </ol>
);

export function Home() {
  const title = 'Kitchen Chimney Repair & Service in Chandigarh Tricity';
  return (<>
    <Seo title={`${title} | ${SITE.name}`} description="Kitchen chimney repair, cleaning and installation in Chandigarh, Mohali, Kharar, Zirakpur, Panchkula and Ludhiana. Call or WhatsApp." jsonLd={[business(), webSite()]} />
    <Hero h1="Expert Kitchen Chimney Repair & Service in Chandigarh Tricity" image="/images/hero_chimney.jpg" imageAlt="Kitchen Chimney Service in Chandigarh">
      <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 px-3 py-1 text-xs font-semibold text-teal-300 mb-4 border border-teal-500/30">
        <span>✓</span> Top Rated Chimney Care in Tricity
      </div>
      <p className="mb-6 text-base leading-relaxed text-slate-200">
        Doorstep repair, deep cleaning, and precision installation for all chimney brands. Experienced technicians, upfront diagnostic advice, and genuine parts.
      </p>
      <Cta location="hero" />
      <TrustBar />
    </Hero>

    {/* Brand Bar */}
    <div className="border-b bg-white py-6">
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
          Servicing All Major Kitchen Chimney Brands
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {brands.map(b => (
            <span key={b} className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs">
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>

    <Section title="Our professional services">
      <Cards items={services.filter(s => s.page).map(s => (
        <Card key={s.slug} image={s.image} imageAlt={s.title}>
          <div>
            <h3 className="text-xl font-bold text-navy-900">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.short}</p>
          </div>
          <Link className="mt-4 inline-flex items-center gap-1 font-semibold text-teal-600 hover:text-teal-700" to={`/services/${s.slug}`}>
            Learn more &rarr;
          </Link>
        </Card>
      ))} />
    </Section>

    <Section title="Common chimney problems we solve" tint>
      <Cards items={problems.map(([t, d], i) => (
        <div key={t} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-base font-bold text-red-600">!</span>
            <h3 className="font-bold text-navy-900">{t}</h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{d}</p>
        </div>
      ))} />
    </Section>

    <Section title="How our service works">
      <Process />
    </Section>

    <Section title="Areas we serve in Tricity" tint>
      <p className="mb-6 max-w-2xl text-slate-600">
        Based in Chandigarh (Sector 39, Maloya). Select your city below to see local service availability and sector coverage:
      </p>
      <AreaCards />
    </Section>

    <Section title="Why Tricity homeowners trust Kitchen King">
      <div className="grid items-center gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <img src="/images/chimney_technician.jpg" alt="Certified Chimney Technician" className="h-96 w-full rounded-2xl border border-slate-200 object-cover shadow-xl" />
        </div>
        <div className="md:col-span-7">
          <ul className="space-y-4 text-slate-700">
            <li className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-xs">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-100 font-bold text-teal-700">✓</span>
              <div>
                <strong className="text-navy-900 font-bold">Thorough Diagnostic Inspection:</strong>
                <p className="mt-0.5 text-sm text-slate-600">We inspect the motor, suction flow, capacitors, switchboard, and ducting before providing clear advice.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-xs">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-100 font-bold text-teal-700">✓</span>
              <div>
                <strong className="text-navy-900 font-bold">Honest Repair vs Replacement Guidance:</strong>
                <p className="mt-0.5 text-sm text-slate-600">If a straightforward filter degrease or minor switch fix restores full suction, we tell you plainly without needless upsells.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-xs">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-100 font-bold text-teal-700">✓</span>
              <div>
                <strong className="text-navy-900 font-bold">Rapid Doorstep Response:</strong>
                <p className="mt-0.5 text-sm text-slate-600">Same-day service slots available across Chandigarh, Mohali, Panchkula, Zirakpur, Kharar, and Ludhiana.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Section>

    <Section title="Frequently asked questions" tint>
      <Faqs items={homeFaqs} />
    </Section>

    <Section title="Ready to fix your kitchen chimney?">
      <div className="rounded-2xl bg-navy-900 p-8 text-white md:p-12">
        <h3 className="text-2xl font-bold md:text-3xl">Need Urgent Chimney Repair or Deep Cleaning?</h3>
        <p className="mt-2 max-w-xl text-slate-300">Call our direct service hotline or chat on WhatsApp for fast response and appointment booking.</p>
        <div className="mt-6"><Cta location="home-final" dark={true} /></div>
      </div>
    </Section>
  </>);
}

export function Services() {
  return (<>
    <Seo path="/services" title={`Kitchen Chimney Services | ${SITE.name}`} description="Chimney repair, deep cleaning, installation, reinstallation, filter cleaning and maintenance in Chandigarh Tricity." jsonLd={[breadcrumb([['Home', '/'], ['Services', '/services']])]} />
    <Hero h1="Complete Kitchen Chimney Care & Technical Services" crumbs={<Crumbs items={[['Home', '/'], ['Services', '/services']]} />} image="/images/service_maintenance.jpg" imageAlt="Kitchen Chimney Maintenance and Service">
      <p className="mb-4 text-slate-200">From degreasing heavy oil accumulation to motor troubleshooting, our trained technicians handle all models with tested diagnostic equipment.</p>
      <Cta location="services-hero" />
    </Hero>
    <Section title="All services offered">
      <Cards items={services.map(s => (
        <Card key={s.slug} image={s.image} imageAlt={s.title}>
          <div>
            <h2 className="text-xl font-bold text-navy-900">{s.title}</h2>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">{s.short}</p>
            <ul className="mt-3 list-disc pl-5 text-xs text-slate-500 space-y-1">
              {s.includes.map(i => <li key={i}>{i}</li>)}
            </ul>
          </div>
          {s.page ? (
            <Link className="mt-4 inline-flex items-center gap-1 font-semibold text-teal-600 hover:text-teal-700" to={`/services/${s.slug}`}>
              View details &rarr;
            </Link>
          ) : (
            <a href={telHref} className="mt-4 inline-flex items-center gap-1 font-semibold text-teal-600 hover:text-teal-700">
              Inquire by phone &rarr;
            </a>
          )}
        </Card>
      ))} />
    </Section>
    <Section title="Service coverage in Tricity" tint>
      <AreaCards />
      <div className="mt-8"><Cta location="services" dark={false} /></div>
    </Section>
  </>);
}

export function ServicePage() {
  const s = services.find(x => x.slug === useParams().slug && x.page);
  if (!s) return <NotFound />;
  const path = `/services/${s.slug}`;
  return (<>
    <Seo path={path} title={`${s.title} in Chandigarh Tricity | ${SITE.name}`} description={s.short} jsonLd={[serviceLd(s), breadcrumb([['Home', '/'], ['Services', '/services'], [s.title, path]])]} />
    <Hero h1={`${s.title} in Chandigarh Tricity`} crumbs={<Crumbs items={[['Home', '/'], ['Services', '/services'], [s.title, path]]} />} image={s.image} imageAlt={s.title}>
      <p className="mb-6 text-slate-200 leading-relaxed">{s.intro}</p>
      <Cta location={s.slug} />
    </Hero>
    <Section title="What this service includes">
      <div className="grid gap-4 sm:grid-cols-2">
        {s.includes.map(i => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 font-bold text-xs">✓</span>
            <span className="font-semibold text-navy-900">{i}</span>
          </div>
        ))}
      </div>
    </Section>
    <Section title="Common symptoms when this service is needed" tint>
      <ul className="grid gap-3 sm:grid-cols-2">
        {s.symptoms.map(i => (
          <li key={i} className="flex items-center gap-2.5 rounded-lg border border-red-100 bg-red-50/50 p-3.5 text-sm font-medium text-red-900">
            <span className="text-red-500 font-bold">•</span> {i}
          </li>
        ))}
      </ul>
    </Section>
    <Section title="Our systematic 4-step process">
      <Process />
    </Section>
    <Section title="Frequently asked questions" tint>
      <Faqs items={s.faqs} />
    </Section>
    <Section title="Available across all Tricity cities">
      <AreaCards />
    </Section>
  </>);
}

export function CityPage({ slug }) {
  const c = cities.find(x => x.slug === slug);
  if (!c) return <NotFound />;
  const path = `/chimney-service-${slug}`;
  return (<>
    <Seo path={path} title={`${c.title} | ${SITE.name}`} description={c.desc} jsonLd={[business(), breadcrumb([['Home', '/'], [c.name, path]])]} />
    <Hero h1={c.h1} crumbs={<Crumbs items={[['Home', '/'], [c.name, path]]} />} image={c.image} imageAlt={`Residential society chimney service in ${c.name}`}>
      <p className="mb-6 text-slate-200 leading-relaxed">{c.intro}</p>
      <Cta location={slug} />
    </Hero>
    <Section title={`What homeowners & societies in ${c.name} ask us about`}>
      <ul className="grid gap-3 sm:grid-cols-3">
        {c.local.map(l => (
          <li key={l} className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <p className="text-sm leading-relaxed text-slate-700">{l}</p>
          </li>
        ))}
      </ul>
    </Section>
    <Section title={`Services available in ${c.name}`} tint>
      <Cards items={services.filter(s => s.page).map(s => (
        <Card key={s.slug} image={s.image} imageAlt={s.title}>
          <Link className="text-xl font-bold text-navy-900 group-hover:text-teal-600 transition" to={`/services/${s.slug}`}>{s.title}</Link>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.short}</p>
          <Link className="mt-4 inline-flex items-center gap-1 font-semibold text-teal-600" to={`/services/${s.slug}`}>Book in {c.name} &rarr;</Link>
        </Card>
      ))} />
    </Section>
    <Section title={`${c.name} chimney service FAQs`}>
      <Faqs items={c.faqs} />
    </Section>
    <Section title="Nearby service areas" tint>
      <AreaCards list={c.related.map(r => cities.find(x => x.slug === r)).filter(Boolean)} />
    </Section>
  </>);
}

export function About() {
  return (<>
    <Seo path="/about" title={`About ${SITE.name}`} description="Kitchen chimney repair, cleaning and installation based in Sector 39, Maloya, Chandigarh." jsonLd={[business()]} />
    <Hero h1={`About ${SITE.name}`} image="/images/about_team.jpg" imageAlt="Dedicated Appliance Repair Team">
      <p className="text-slate-200 leading-relaxed">Dedicated kitchen chimney repair, deep degreasing, and installation specialists serving the Chandigarh Tricity region with pride and precision.</p>
    </Hero>
    <Section title="Our mission & workshop">
      <div className="grid items-center gap-8 md:grid-cols-12">
        <div className="space-y-4 md:col-span-7 leading-relaxed text-slate-700">
          <p>
            Operating out of our base at <strong>{addressLine}</strong>, Kitchen King was founded to eliminate the uncertainty and delays in kitchen appliance servicing. We provide direct, transparent doorstep service across Chandigarh, Mohali, Panchkula, Zirakpur, Kharar, and Ludhiana.
          </p>
          <p>
            Unlike general handymen, our technicians are trained in the specific mechanics of kitchen chimney ventilation—baffle filters, cassette filters, blower fans, charcoal filters, and motor capacitors.
          </p>
          <div className="pt-2"><Cta location="about" dark={false} /></div>
        </div>
        <div className="md:col-span-5">
          <img src="/images/service_repair.jpg" alt="Chimney Repair Workbench" className="h-72 w-full rounded-2xl border border-slate-200 object-cover shadow-lg" />
        </div>
      </div>
    </Section>
  </>);
}

export function Contact() {
  return (<>
    <Seo path="/contact" title={`Contact ${SITE.name} | Chimney Service Enquiry`} description="Call, WhatsApp or send an enquiry for kitchen chimney repair, cleaning or installation." jsonLd={[business(), breadcrumb([['Home', '/'], ['Contact', '/contact']])]} />
    <Hero h1="Contact Kitchen King Chimney Service" image="/images/contact_support.jpg" imageAlt="Friendly Customer Support Helpdesk">
      <p className="text-slate-200 leading-relaxed">Speak directly with our team or schedule a technician visit. We respond promptly to all calls and messages.</p>
    </Hero>
    <Section title="Get in touch with our team">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <Cta location="contact" dark={false} />
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <h4 className="font-bold text-navy-900">Service Center Address</h4>
            <p className="text-sm text-slate-600">{addressLine}</p>
            <a className="inline-block font-semibold text-teal-600 hover:text-teal-700 underline text-sm" href={mapsUrl} target="_blank" rel="noopener noreferrer">
              Get directions on Google Maps &rarr;
            </a>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h4 className="font-bold text-navy-900 mb-1">Hours & Coverage</h4>
            <p className="text-sm text-slate-600">Available Monday through Sunday, 8:00 AM – 8:00 PM for doorstep visits across Chandigarh, Mohali, Panchkula, Zirakpur, Kharar, and Ludhiana.</p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-navy-900 mb-2">Book a Service Visit</h3>
          <p className="text-sm text-slate-600 mb-6">Fill out the quick form below and our technician will contact you to confirm timing.</p>
          <EnquiryForm />
        </div>
      </div>
    </Section>
  </>);
}

export function Privacy() {
  return (<><Seo path="/privacy-policy" title={`Privacy Policy | ${SITE.name}`} description="How we use the information you send in a service enquiry." />
    <Hero h1="Privacy Policy"><p>Draft for review before publication.</p></Hero>
    <Section title="Information we collect"><div className="max-w-2xl space-y-3 text-slate-700"><p>When you send an enquiry we collect your name, phone number, city, required service and optional message.</p><p>We use it only to respond to your request. Questions about your information: call {SITE.phoneDisplay} or write to us at {addressLine}.</p></div></Section></>);
}
export function NotFound() {
  return (<><Seo title={`Page not found | ${SITE.name}`} description="This page does not exist." noindex /><Hero h1="Page not found"><p className="mb-4">The page you wanted is not here.</p><Link to="/" className="btn btn-wa">Go to home page</Link></Hero></>);
}
