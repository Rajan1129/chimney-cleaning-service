import { Link, useParams } from 'react-router-dom';
import { Phone, MessageCircle } from 'lucide-react';
import Seo, { business, breadcrumb, webSite, serviceLd, faqLd } from '../components/Seo';
import Cta, { Faqs, Section, Hero, TrustBar } from '../components/Cta';
import EnquiryForm from '../components/EnquiryForm';
import { SITE, addressLine, mapsUrl } from '../data/site';
import { services, cities, problems, processSteps, homeFaqs, brands } from '../data/content';
import { telHref, waHref } from '../lib/links';
import BeforeAfterSection from '../components/BeforeAfterSection';

const Crumbs = ({ items }) => <nav aria-label="Breadcrumb" className="mb-3 text-sm text-slate-300">{items.map(([l, p], i) => <span key={p}>{i > 0 && ' / '}{i < items.length - 1 ? <Link to={p} className="underline hover:text-teal-300 transition">{l}</Link> : l}</span>)}</nav>;
const Cards = ({ items }) => <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items}</div>;
const Card = ({ children, image, imageAlt }) => (
  <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-teal-500/50">
    {image && (
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img src={image} alt={imageAlt || ""} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    )}
    <div className="flex flex-1 flex-col justify-between p-6">{children}</div>
  </div>
);
const AreaCards = ({ list = cities }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {list.map(c => (
      <Link key={c.slug} to={`/chimney-service-in-${c.slug}`} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-teal-400/60">
        <div className="relative h-44 w-full overflow-hidden bg-slate-100">
          <img src={c.image} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-black/20 to-transparent" />
          <span className="absolute bottom-3 left-3 rounded-lg backdrop-blur-md bg-teal-600/90 border border-white/20 px-3 py-1 text-xs font-bold text-white shadow-md">
            {c.name}
          </span>
        </div>
        <div className="flex items-center justify-between p-4 bg-white">
          <div>
            <h4 className="font-bold text-navy-900 group-hover:text-teal-600 transition">Chimney Service in {c.name}</h4>
            <p className="mt-0.5 text-xs text-slate-500">Doorstep technicians ready</p>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-teal-600 font-bold group-hover:bg-teal-500 group-hover:text-white group-hover:translate-x-1 transition-all">
            &rarr;
          </span>
        </div>
      </Link>
    ))}
  </div>
);
const Process = () => (
  <ol className="grid gap-4 md:grid-cols-4">
    {processSteps.map(([t, d], i) => (
      <li key={t} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-teal-400/50">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 font-black text-white text-sm shadow-md shadow-teal-500/25 group-hover:scale-110 transition">
          0{i + 1}
        </span>
        <p className="mt-4 font-bold text-navy-900 text-base">{t}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{d}</p>
      </li>
    ))}
  </ol>
);

export function Home() {
  const title = 'Kitchen Chimney Repair & Cleaning Service Chandigarh Tricity';
  return (<>
    <Seo
      path="/"
      title={`${title} | ${SITE.name}`}
      description="Doorstep kitchen chimney repair, deep chemical cleaning, hob repair and installation across Chandigarh, Mohali, Panchkula, Zirakpur, Kharar. Fast doorstep visit. Call +91 62630 13446."
      image="/images/hero_chimney.jpg"
      jsonLd={[business(), webSite(), faqLd(homeFaqs)]}
    />
    <Hero h1="Expert Kitchen Chimney Repair & Service in Chandigarh Tricity" image="/images/hero_chimney.jpg" imageAlt="Kitchen Chimney Service in Chandigarh">
      <div className="inline-flex items-center gap-2 rounded-full backdrop-blur-md bg-teal-500/20 px-3.5 py-1 text-xs font-bold text-teal-300 mb-4 border border-teal-500/40 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-teal-300 animate-ping"></span>
        <span>Genuine Doorstep Chimney Care in Tricity</span>
      </div>
      <p className="mb-6 text-base leading-relaxed text-slate-200">
        Doorstep repair, deep cleaning, and precision installation for all chimney brands. Experienced technicians, upfront diagnostic advice, and genuine parts.
      </p>
      <Cta location="hero" />
      <TrustBar />
    </Hero>

    {/* Brand Bar */}
    <div className="border-b bg-gradient-to-r from-slate-50 via-white to-slate-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
          Servicing All Major Kitchen Chimney & Hob Brands
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {brands.map(b => (
            <span key={b} className="rounded-xl border border-slate-200/90 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:border-teal-500/50 hover:text-teal-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
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
      <div className="grid items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="group overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
              <img
                src="/images/chimney_problems.jpg"
                alt="Common Kitchen Chimney Issues Diagnosed & Repaired"
                className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-block rounded-md backdrop-blur-md bg-teal-500/90 border border-teal-300/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-950 shadow-md">
                  Doorstep Diagnosis
                </span>
                <p className="mt-2 text-lg font-black leading-snug">Unsure what is wrong with your chimney?</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm leading-relaxed text-slate-600">
                Most kitchen chimney breakdowns stem from saturated grease in baffle filters, motor capacitor wear, or bent blower blades. Our technician inspects suction, noise, and electrical lines on site before starting work.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a href={telHref} className="btn btn-primary btn-shine justify-center py-3 text-sm font-bold shadow-md shadow-teal-600/20">
                  <Phone size={16} /> Call for Same-Day Diagnosis
                </a>
                <a href={waHref("problems")} target="_blank" rel="noopener noreferrer" className="btn btn-wa justify-center py-3 text-sm font-bold">
                  <MessageCircle size={16} className="text-emerald-500" /> Send Chimney Photo on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {problems.map(([t, d], i) => (
              <div key={t} className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-500/50 hover:shadow-xl">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-base font-black text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                      !
                    </span>
                    <h3 className="font-bold text-navy-900 text-base">{t}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{d}</p>
                </div>
                <div className="mt-4 border-t border-slate-100 pt-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-teal-600 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-ping"></span>
                    Same-day visit available
                  </span>
                  <span className="text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition font-bold text-xs">
                    &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>

    {/* Real Before & After Transformation Section with Interactive Glassmorphism */}
    <BeforeAfterSection />

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
          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 shadow-xl bg-slate-900">
            <img src="/images/chimney_technician.jpg" alt="Certified Chimney Technician" className="h-96 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl backdrop-blur-md bg-navy-900/80 border border-white/20 p-3 shadow-lg">
              <p className="text-xs font-bold text-teal-300 uppercase tracking-wide">✓ 100% Doorstep Service</p>
              <p className="text-[11px] text-slate-200 mt-0.5">Transparent inspection and test run before payment</p>
            </div>
          </div>
        </div>
        <div className="md:col-span-7">
          <ul className="space-y-4 text-slate-700">
            <li className="group flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-teal-400/50">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 font-black text-sm group-hover:bg-teal-600 group-hover:text-white transition">✓</span>
              <div>
                <strong className="text-navy-900 font-bold text-base">Thorough Diagnostic Inspection:</strong>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">We inspect the motor, suction flow, capacitors, switchboard, and ducting before providing clear advice.</p>
              </div>
            </li>
            <li className="group flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-teal-400/50">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 font-black text-sm group-hover:bg-teal-600 group-hover:text-white transition">✓</span>
              <div>
                <strong className="text-navy-900 font-bold text-base">Honest Repair vs Replacement Guidance:</strong>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">If a straightforward filter degrease or minor switch fix restores full suction, we tell you plainly without needless upsells.</p>
              </div>
            </li>
            <li className="group flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-teal-400/50">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 font-black text-sm group-hover:bg-teal-600 group-hover:text-white transition">✓</span>
              <div>
                <strong className="text-navy-900 font-bold text-base">Rapid Doorstep Response:</strong>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">Same-day service slots available across Chandigarh, Mohali, Panchkula, Zirakpur, Kharar, and Ludhiana.</p>
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-slate-950 p-8 text-white md:p-12 shadow-2xl border border-white/10">
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-30" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block rounded-full backdrop-blur-md bg-teal-500/20 border border-teal-500/40 px-3.5 py-1 text-xs font-bold text-teal-300 uppercase tracking-wider mb-3">
            Fast Doorstep Booking
          </span>
          <h3 className="text-2xl font-black sm:text-3xl md:text-4xl">Need Urgent Chimney Repair or Deep Cleaning?</h3>
          <p className="mt-3 text-slate-300 leading-relaxed">
            Call our direct service hotline or chat on WhatsApp for fast response, upfront pricing, and convenient appointment booking.
          </p>
          <div className="mt-6"><Cta location="home-final" dark={true} /></div>
        </div>
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
    <Seo
      path={path}
      title={`${s.title} in Chandigarh Tricity | ${SITE.name}`}
      description={`${s.short} Doorstep service across Chandigarh, Mohali, Panchkula, Zirakpur & Kharar. Genuine parts & transparent pricing.`}
      image={s.image}
      jsonLd={[serviceLd(s), breadcrumb([['Home', '/'], ['Services', '/services'], [s.title, path]]), faqLd(s.faqs)]}
    />
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
    <BeforeAfterSection />
    <Section title="Frequently asked questions" tint>
      <Faqs items={s.faqs} />
    </Section>
    <Section title="Available across all Tricity cities">
      <AreaCards />
    </Section>
  </>);
}

export function Locations() {
  return (
    <>
      <Seo
        path="/locations"
        title={`Kitchen Chimney Service Locations & Coverage Areas | ${SITE.name}`}
        description="Explore our doorstep kitchen chimney repair, deep cleaning, and installation service areas across Chandigarh Tricity, Mohali, Panchkula, Zirakpur, Kharar and Ludhiana."
        image="/images/tricity_apartments.jpg"
        jsonLd={[business(), breadcrumb([['Home', '/'], ['Locations', '/locations']]), faqLd(homeFaqs)]}
      />
      <Hero
        h1="Kitchen Chimney Service Coverage & Locations"
        crumbs={<Crumbs items={[['Home', '/'], ['Locations', '/locations']]} />}
        image="/images/tricity_apartments.jpg"
        imageAlt="Tricity Service Locations"
      >
        <p className="mb-6 text-slate-200 leading-relaxed">
          Kitchen King provides transparent doorstep chimney repair, chemical degreasing, and installation services across the entire Chandigarh Tricity region and neighboring cities.
        </p>
        <Cta location="locations-hero" />
      </Hero>

      <Section title="Explore our service cities">
        <p className="mb-6 text-slate-600 max-w-2xl">
          Select your city below for dedicated local sector listings, typical duct challenges, and fast appointment bookings:
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cities.map(c => (
            <div key={c.slug} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img src={c.image} alt={c.name} className="h-full w-full object-cover transition duration-300 hover:scale-105" />
                <span className="absolute bottom-3 left-3 rounded-md bg-navy-900/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-xs">
                  {c.name}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="text-lg font-bold text-navy-900">{c.h1}</h3>
                  <p className="mt-1 text-xs text-slate-600 line-clamp-2">{c.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.sectors.slice(0, 4).map(s => (
                      <span key={s} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                        {s}
                      </span>
                    ))}
                    {c.sectors.length > 4 && (
                      <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-teal-700">
                        +{c.sectors.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between border-t pt-4">
                  <Link to={`/chimney-service-in-${c.slug}`} className="font-semibold text-sm text-teal-600 hover:text-teal-700">
                    View local service &rarr;
                  </Link>
                  <a href={waHref(c.name)} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-slate-500 hover:text-navy-900">
                    Quick WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="How our location dispatch works" tint>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-100 font-bold text-teal-700 mb-3">📍</span>
            <h4 className="font-bold text-navy-900">Central Hub in Chandigarh</h4>
            <p className="mt-1 text-sm text-slate-600">Based in Sector 39, Maloya, our technicians are dispatched directly with tools and spare parts for immediate response.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-100 font-bold text-teal-700 mb-3">🛵</span>
            <h4 className="font-bold text-navy-900">Daily Tricity Mobile Routes</h4>
            <p className="mt-1 text-sm text-slate-600">Continuous daily routes through Mohali, Panchkula, Zirakpur, and Kharar ensure short travel times to your home.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-100 font-bold text-teal-700 mb-3">📅</span>
            <h4 className="font-bold text-navy-900">Pre-Confirmed Appointments</h4>
            <p className="mt-1 text-sm text-slate-600">Technicians arrive within your agreed window. Test run and full inspection conducted before payment.</p>
          </div>
        </div>
      </Section>

      <Section title="Need assistance in your area?">
        <div className="rounded-2xl bg-navy-900 p-8 text-white md:p-12">
          <h3 className="text-2xl font-bold md:text-3xl">Not Sure if We Cover Your Street?</h3>
          <p className="mt-2 max-w-xl text-slate-300">Call or message us on WhatsApp with your locality or landmark. We will immediately check technician availability for your home.</p>
          <div className="mt-6"><Cta location="locations-bottom" dark={true} /></div>
        </div>
      </Section>
    </>
  );
}

export function CityPage({ slug }) {
  const params = useParams();
  const currentSlug = slug || params.slug;
  const c = cities.find(x => x.slug === currentSlug);
  if (!c) return <NotFound />;
  const path = `/chimney-service-in-${currentSlug}`;
  return (<>
    <Seo
      path={path}
      title={`${c.title} | ${SITE.name}`}
      description={c.desc}
      image={c.image}
      jsonLd={[
        business(),
        breadcrumb([['Home', '/'], ['Locations', '/locations'], [c.name, path]]),
        faqLd(c.faqs)
      ]}
    />
    <Hero h1={c.h1} crumbs={<Crumbs items={[['Home', '/'], ['Locations', '/locations'], [c.name, path]]} />} image={c.image} imageAlt={`Residential society chimney service in ${c.name}`}>
      <p className="mb-6 text-slate-200 leading-relaxed">{c.intro}</p>
      <Cta location={currentSlug} />
    </Hero>

    {/* Sectors & Areas */}
    <Section title={`Sectors & Areas Covered in ${c.name}`}>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        {c.sectors.map(s => (
          <div key={s} className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white p-3.5 shadow-xs">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 text-xs font-bold">✓</span>
            <span className="text-sm font-semibold text-navy-900">{s}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500">
        Don't see your specific sector, society, or colony listed? Call or WhatsApp us with your address—our technicians cover all residential and commercial addresses in and around {c.name}.
      </p>
    </Section>

    {/* Why Choose Section for Local Trust & SEO */}
    <Section title={`Why Choose Kitchen King for Chimney Repair in ${c.name}`} tint>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700 text-lg mb-3">⚡</span>
          <h4 className="font-bold text-navy-900">Same-Day Doorstep Visit</h4>
          <p className="mt-1 text-xs text-slate-600 leading-relaxed">Fast response across all {c.name} sectors, societies, and kothis with pre-confirmed appointment slots.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700 text-lg mb-3">🔍</span>
          <h4 className="font-bold text-navy-900">Upfront Transparent Diagnosis</h4>
          <p className="mt-1 text-xs text-slate-600 leading-relaxed">Technician inspects the chimney motor, filter, and ducting, providing a clear quote before starting.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700 text-lg mb-3">🛡️</span>
          <h4 className="font-bold text-navy-900">Genuine Spare Parts</h4>
          <p className="mt-1 text-xs text-slate-600 leading-relaxed">Brand-compatible copper-wound motors, heavy-duty capacitors, baffle filters, and touch panels.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700 text-lg mb-3">✅</span>
          <h4 className="font-bold text-navy-900">Pay After Test Run</h4>
          <p className="mt-1 text-xs text-slate-600 leading-relaxed">We test smoke exhaust suction, noise balance, and hob flame before accepting payment.</p>
        </div>
      </div>
    </Section>

    {/* Brand Coverage in City */}
    <Section title={`All Kitchen Chimney & Hob Brands Serviced in ${c.name}`}>
      <p className="mb-4 text-slate-600 text-sm">
        Our technicians carry diagnostic kits and genuine compatible spares for all popular chimney and hob manufacturers in {c.name}:
      </p>
      <div className="flex flex-wrap gap-2.5">
        {brands.map(b => (
          <span key={b} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-800 shadow-2xs">
            {b} Chimney & Hob Service
          </span>
        ))}
      </div>
    </Section>

    <Section title={`What homeowners & societies in ${c.name} ask us about`} tint>
      <ul className="grid gap-3 sm:grid-cols-3">
        {c.local.map(l => (
          <li key={l} className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <p className="text-sm leading-relaxed text-slate-700">{l}</p>
          </li>
        ))}
      </ul>
    </Section>

    <Section title={`Services available in ${c.name}`}>
      <Cards items={services.filter(s => s.page).map(s => (
        <Card key={s.slug} image={s.image} imageAlt={s.title}>
          <Link className="text-xl font-bold text-navy-900 group-hover:text-teal-600 transition" to={`/services/${s.slug}`}>{s.title}</Link>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.short}</p>
          <Link className="mt-4 inline-flex items-center gap-1 font-semibold text-teal-600" to={`/services/${s.slug}`}>Book in {c.name} &rarr;</Link>
        </Card>
      ))} />
    </Section>

    <Section title={`${c.name} chimney service FAQs`} tint>
      <Faqs items={c.faqs} />
    </Section>

    <Section title="Nearby service areas">
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
  return (
    <>
      <Seo
        path="/privacy-policy"
        title={`Privacy Policy | ${SITE.name}`}
        description="Privacy policy and data protection practices at Kitchen King Chimney & RO Service."
      />
      <Hero h1="Privacy Policy">
        <p className="text-slate-200">
          Last updated: October 2026. How Kitchen King handles your booking details and service information.
        </p>
      </Hero>
      <Section title="Our commitment to your privacy">
        <div className="max-w-3xl space-y-5 text-slate-700 leading-relaxed">
          <p>
            At <strong>{SITE.name}</strong>, we respect your privacy. When you request a chimney, hob, or RO service visit through our website, phone, or WhatsApp, we collect only the essential details needed to fulfill your doorstep service.
          </p>
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
            <h3 className="font-bold text-navy-900 text-lg">1. Information We Collect</h3>
            <p className="text-sm">
              We collect your name, contact phone number, service city/locality, and your appliance description so our technician can prepare appropriate tools and spare parts for the visit.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
            <h3 className="font-bold text-navy-900 text-lg">2. How Your Information Is Used</h3>
            <p className="text-sm">
              Your contact details are used strictly to coordinate service appointments, provide upfront diagnostic estimates, and verify post-service performance. We do not sell, rent, or trade your personal data to any third-party advertisers.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
            <h3 className="font-bold text-navy-900 text-lg">3. Contacting Us About Your Data</h3>
            <p className="text-sm">
              If you wish to update or request removal of your booking record, contact us directly at <a href={telHref} className="font-semibold text-teal-600 underline">{SITE.phoneDisplay}</a> or visit our service base at {addressLine}.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
export function NotFound() {
  return (<><Seo title={`Page not found | ${SITE.name}`} description="This page does not exist." noindex /><Hero h1="Page not found"><p className="mb-4">The page you wanted is not here.</p><Link to="/" className="btn btn-wa">Go to home page</Link></Hero></>);
}
