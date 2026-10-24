import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { services, cities, problems, processSteps, homeFaqs, brands } from '../src/data/content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientRoot = path.resolve(__dirname, '..');
const distDir = path.join(clientRoot, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('[Prerender] Error: dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
const templateHtml = fs.readFileSync(templatePath, 'utf8');

const CANONICAL_URL = 'https://kitchenkingservice.com';
const BUSINESS_NAME = 'Kitchen King';
const PHONE_DISPLAY = '+91 62630 13446';
const PHONE_TEL = '+916263013446';
const ADDRESS_STREET = 'Sector 39, Maloya';
const ADDRESS_CITY = 'Chandigarh';
const ADDRESS_POSTAL = '160025';
const ADDRESS_LINE = `${ADDRESS_STREET}, ${ADDRESS_CITY}, ${ADDRESS_POSTAL}`;

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': ['HomeAndConstructionBusiness', 'LocalBusiness', 'ProfessionalService'],
  name: `${BUSINESS_NAME} - Kitchen Chimney, Hob & RO Service`,
  alternateName: ['Kitchen King Chimney Service', 'Kitchen King Tricity Chimney Repair'],
  description: 'Doorstep kitchen chimney repair, deep chemical cleaning, hob repair, gas stove service, and chimney installation across Chandigarh, Mohali, Panchkula, Zirakpur, Kharar and Ludhiana.',
  image: [
    `${CANONICAL_URL}/images/hero_chimney.jpg`,
    `${CANONICAL_URL}/images/chimney_problems.jpg`,
    `${CANONICAL_URL}/logo.png`
  ],
  logo: `${CANONICAL_URL}/logo.png`,
  url: CANONICAL_URL,
  telephone: PHONE_TEL,
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, Google Pay, PhonePe, Paytm, Net Banking',
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS_STREET,
    addressLocality: ADDRESS_CITY,
    addressRegion: 'Chandigarh',
    postalCode: ADDRESS_POSTAL,
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 30.7333,
    longitude: 76.7333
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00'
    }
  ],
  areaServed: cities.map(c => ({
    '@type': 'City',
    name: c.name,
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: c.slug === 'panchkula' ? 'Haryana' : c.slug === 'chandigarh' ? 'Chandigarh' : 'Punjab'
    }
  }))
};

const makeFaqSchema = (faqs = []) => {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a
      }
    }))
  };
};

const makeBreadcrumbSchema = (crumbs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map(([name, p], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: `${CANONICAL_URL}${p === '/' ? '' : p}`
  }))
});

// Build list of routes and their specific metadata
const routeList = [];

// 1. Home
routeList.push({
  path: '/',
  title: `Kitchen Chimney Repair & Cleaning Service Chandigarh Tricity | ${BUSINESS_NAME}`,
  description: 'Doorstep kitchen chimney repair, deep chemical cleaning, hob repair and installation across Chandigarh, Mohali, Panchkula, Zirakpur, Kharar. Fast doorstep visit. Call +91 62630 13446.',
  image: '/images/hero_chimney.jpg',
  h1: 'Expert Kitchen Chimney Repair & Service in Chandigarh Tricity',
  intro: 'Doorstep repair, deep chemical cleaning, and precision installation for all chimney brands across Chandigarh, Mohali, Panchkula, Zirakpur, Kharar and Ludhiana. Experienced technicians, upfront diagnostic advice, and genuine parts.',
  schemas: [
    businessSchema,
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: `${BUSINESS_NAME} Chimney & Hob Service`,
      url: CANONICAL_URL
    },
    makeFaqSchema(homeFaqs)
  ],
  contentHtml: `
    <header class="bg-navy-900 text-white py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl md:text-5xl font-bold">Expert Kitchen Chimney Repair & Service in Chandigarh Tricity</h1>
        <p class="mt-4 text-slate-200 max-w-2xl leading-relaxed">Doorstep repair, deep cleaning, and precision installation for all chimney brands. Experienced technicians, upfront diagnostic advice, and genuine parts.</p>
        <div class="mt-6 flex flex-wrap gap-3">
          <a href="tel:${PHONE_TEL}" class="bg-teal-600 text-white font-bold px-6 py-3 rounded-xl shadow-md">Call Now ${PHONE_DISPLAY}</a>
          <a href="${CANONICAL_URL}/services" class="bg-white text-navy-900 font-bold px-6 py-3 rounded-xl shadow-md">Explore Services</a>
        </div>
      </div>
    </header>
    <main class="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <section>
        <h2 class="text-2xl font-bold text-navy-900 mb-6">Our Professional Chimney & Hob Services</h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          ${services.filter(s => s.page).map(s => `
            <div class="rounded-xl border border-slate-200 p-6 bg-white shadow-xs">
              <h3 class="text-xl font-bold text-navy-900">${s.title}</h3>
              <p class="mt-2 text-sm text-slate-600">${s.short}</p>
              <a href="${CANONICAL_URL}/services/${s.slug}" class="mt-4 inline-block font-semibold text-teal-600">View Service &rarr;</a>
            </div>
          `).join('')}
        </div>
      </section>
      <section class="bg-navy-900 text-white p-8 rounded-2xl">
        <h2 class="text-2xl font-bold mb-3">Real Before & After Kitchen Chimney & Hob Cleaning Results</h2>
        <p class="text-slate-300 text-sm mb-6 leading-relaxed">
          See the visual transformation of heavily choked baffle filters, carbonized gas stove burners, and oil-dripping chimney housings professionally restored by Kitchen King technicians across Chandigarh Tricity.
        </p>
        <div class="grid gap-6 md:grid-cols-3">
          <div class="p-4 rounded-xl bg-white/10 border border-white/20">
            <h3 class="font-bold text-teal-300">Baffle Filter Degreasing</h3>
            <p class="text-xs text-slate-300 mt-1">Before: Saturated yellow grease blocking suction by 60%.<br/>After: 100% degreased stainless steel, full airflow restored.</p>
          </div>
          <div class="p-4 rounded-xl bg-white/10 border border-white/20">
            <h3 class="font-bold text-teal-300">Gas Hob & Burners</h3>
            <p class="text-xs text-slate-300 mt-1">Before: Clogged burner nozzles, low irregular yellow flame.<br/>After: Uniform blue flame, polished brass, safe gas flow.</p>
          </div>
          <div class="p-4 rounded-xl bg-white/10 border border-white/20">
            <h3 class="font-bold text-teal-300">Chimney Housing & Duct</h3>
            <p class="text-xs text-slate-300 mt-1">Before: Thick sticky oil coat inside blower cavity.<br/>After: Sanitized and degreased surfaces with test run.</p>
          </div>
        </div>
      </section>
      <section class="bg-slate-50 p-8 rounded-2xl">
        <h2 class="text-2xl font-bold text-navy-900 mb-6">Chimney Service Coverage Across Tricity</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          ${cities.map(c => `
            <a href="${CANONICAL_URL}/chimney-service-in-${c.slug}" class="block rounded-lg border border-slate-200 p-4 bg-white hover:border-teal-600 transition">
              <h3 class="font-bold text-navy-900">Chimney Service in ${c.name}</h3>
              <p class="text-xs text-slate-500 mt-1">${c.sectors.slice(0, 3).join(', ')}</p>
            </a>
          `).join('')}
        </div>
      </section>
      <section>
        <h2 class="text-2xl font-bold text-navy-900 mb-6">Frequently Asked Questions</h2>
        <div class="space-y-4">
          ${homeFaqs.map(([q, a]) => `
            <div class="rounded-xl border border-slate-200 p-5 bg-white">
              <h3 class="font-bold text-navy-900">${q}</h3>
              <p class="mt-2 text-sm text-slate-600 leading-relaxed">${a}</p>
            </div>
          `).join('')}
        </div>
      </section>
    </main>
  `
});

// 2. Services Hub
routeList.push({
  path: '/services',
  title: `Kitchen Chimney & Hob Services | Repair, Cleaning & Fitting | ${BUSINESS_NAME}`,
  description: 'Comprehensive doorstep kitchen chimney repair, deep chemical cleaning, hob & gas stove repair, and installation across Chandigarh Tricity.',
  image: '/images/hero_chimney.jpg',
  h1: 'Kitchen Chimney & Hob Repair Services',
  intro: 'Explore our complete range of specialized kitchen appliance services across Chandigarh, Mohali, Panchkula, Zirakpur and Kharar.',
  schemas: [
    businessSchema,
    makeBreadcrumbSchema([['Home', '/'], ['Services', '/services']]),
    makeFaqSchema(homeFaqs)
  ],
  contentHtml: `
    <header class="bg-navy-900 text-white py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl md:text-5xl font-bold">Kitchen Chimney & Hob Repair Services</h1>
        <p class="mt-4 text-slate-200 max-w-2xl leading-relaxed">Doorstep repair, chemical degreasing, and installation across Chandigarh, Mohali, Panchkula, Zirakpur and Kharar.</p>
      </div>
    </header>
    <main class="max-w-6xl mx-auto px-4 py-12">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        ${services.filter(s => s.page).map(s => `
          <div class="rounded-xl border border-slate-200 p-6 bg-white shadow-xs">
            <h2 class="text-xl font-bold text-navy-900">${s.title}</h2>
            <p class="mt-2 text-sm text-slate-600">${s.short}</p>
            <a href="${CANONICAL_URL}/services/${s.slug}" class="mt-4 inline-block font-semibold text-teal-600">View Details &rarr;</a>
          </div>
        `).join('')}
      </div>
    </main>
  `
});

// 3. Service Sub-pages
services.filter(s => s.page).forEach(s => {
  const p = `/services/${s.slug}`;
  routeList.push({
    path: p,
    title: `${s.title} in Chandigarh Tricity | Doorstep Specialist | ${BUSINESS_NAME}`,
    description: `${s.short} Doorstep service across Chandigarh, Mohali, Panchkula, Zirakpur & Kharar. Genuine parts & transparent pricing. Call +91 62630 13446.`,
    image: s.image,
    h1: `${s.title} in Chandigarh Tricity`,
    intro: s.intro,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Kitchen Appliance Repair',
        name: `${s.title} in Chandigarh Tricity`,
        description: s.short,
        provider: {
          '@type': 'HomeAndConstructionBusiness',
          name: BUSINESS_NAME,
          telephone: PHONE_TEL,
          address: ADDRESS_LINE
        },
        areaServed: cities.map(c => ({ '@type': 'City', name: c.name }))
      },
      makeBreadcrumbSchema([['Home', '/'], ['Services', '/services'], [s.title, p]]),
      makeFaqSchema(s.faqs)
    ],
    contentHtml: `
      <header class="bg-navy-900 text-white py-12 px-4">
        <div class="max-w-6xl mx-auto">
          <p class="text-sm text-slate-300 mb-2"><a href="${CANONICAL_URL}/">Home</a> / <a href="${CANONICAL_URL}/services">Services</a> / ${s.title}</p>
          <h1 class="text-3xl md:text-5xl font-bold">${s.title} in Chandigarh Tricity</h1>
          <p class="mt-4 text-slate-200 max-w-2xl leading-relaxed">${s.intro}</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <a href="tel:${PHONE_TEL}" class="bg-teal-600 text-white font-bold px-6 py-3 rounded-xl shadow-md">Call Technician ${PHONE_DISPLAY}</a>
          </div>
        </div>
      </header>
      <main class="max-w-6xl mx-auto px-4 py-12 space-y-10">
        <section>
          <h2 class="text-2xl font-bold text-navy-900 mb-4">What This Service Includes</h2>
          <div class="grid gap-3 sm:grid-cols-2">
            ${s.includes.map(inc => `
              <div class="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <span class="text-teal-600 font-bold">✓</span>
                <span class="font-semibold text-navy-900">${inc}</span>
              </div>
            `).join('')}
          </div>
        </section>
        <section class="bg-slate-50 p-6 rounded-2xl">
          <h2 class="text-2xl font-bold text-navy-900 mb-4">Common Symptoms</h2>
          <ul class="grid gap-2 sm:grid-cols-2">
            ${s.symptoms.map(sym => `
              <li class="p-3 bg-white rounded-lg border border-slate-200 text-sm text-slate-700">• ${sym}</li>
            `).join('')}
          </ul>
        </section>
        <section>
          <h2 class="text-2xl font-bold text-navy-900 mb-4">Frequently Asked Questions</h2>
          <div class="space-y-4">
            ${s.faqs.map(([q, a]) => `
              <div class="rounded-xl border border-slate-200 p-5 bg-white">
                <h3 class="font-bold text-navy-900">${q}</h3>
                <p class="mt-2 text-sm text-slate-600 leading-relaxed">${a}</p>
              </div>
            `).join('')}
          </div>
        </section>
      </main>
    `
  });
});

// 4. Locations Hub
routeList.push({
  path: '/locations',
  title: `Kitchen Chimney Service Locations & Coverage Areas | ${BUSINESS_NAME}`,
  description: 'Explore our doorstep kitchen chimney repair, deep cleaning, and installation service areas across Chandigarh Tricity, Mohali, Panchkula, Zirakpur, Kharar and Ludhiana.',
  image: '/images/tricity_apartments.jpg',
  h1: 'Kitchen Chimney Service Coverage & Locations',
  intro: 'Kitchen King provides transparent doorstep chimney repair, chemical degreasing, and installation services across the entire Chandigarh Tricity region and neighboring cities.',
  schemas: [
    businessSchema,
    makeBreadcrumbSchema([['Home', '/'], ['Locations', '/locations']]),
    makeFaqSchema(homeFaqs)
  ],
  contentHtml: `
    <header class="bg-navy-900 text-white py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl md:text-5xl font-bold">Kitchen Chimney Service Coverage & Locations</h1>
        <p class="mt-4 text-slate-200 max-w-2xl leading-relaxed">Doorstep chimney repair, chemical degreasing, and installation services across the entire Chandigarh Tricity region.</p>
      </div>
    </header>
    <main class="max-w-6xl mx-auto px-4 py-12">
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        ${cities.map(c => `
          <div class="rounded-xl border border-slate-200 p-6 bg-white shadow-xs">
            <h2 class="text-xl font-bold text-navy-900">${c.h1}</h2>
            <p class="mt-2 text-xs text-slate-600">${c.desc}</p>
            <div class="mt-3 flex flex-wrap gap-1">
              ${c.sectors.slice(0, 4).map(sec => `<span class="bg-slate-100 text-[11px] px-2 py-0.5 rounded text-slate-700">${sec}</span>`).join('')}
            </div>
            <a href="${CANONICAL_URL}/chimney-service-in-${c.slug}" class="mt-4 inline-block font-semibold text-teal-600">View Local Service &rarr;</a>
          </div>
        `).join('')}
      </div>
    </main>
  `
});

// 5. City Landing Pages (/chimney-service-in-:slug, /locations/:slug, /chimney-service-:slug)
cities.forEach(c => {
  const primaryPath = `/chimney-service-in-${c.slug}`;
  const aliases = [`/locations/${c.slug}`, `/chimney-service-${c.slug}`];

  const cityData = {
    path: primaryPath,
    title: `${c.title} | ${BUSINESS_NAME}`,
    description: c.desc,
    image: c.image,
    h1: c.h1,
    intro: c.intro,
    schemas: [
      businessSchema,
      makeBreadcrumbSchema([['Home', '/'], ['Locations', '/locations'], [c.name, primaryPath]]),
      makeFaqSchema(c.faqs)
    ],
    contentHtml: `
      <header class="bg-navy-900 text-white py-12 px-4">
        <div class="max-w-6xl mx-auto">
          <p class="text-sm text-slate-300 mb-2"><a href="${CANONICAL_URL}/">Home</a> / <a href="${CANONICAL_URL}/locations">Locations</a> / ${c.name}</p>
          <h1 class="text-3xl md:text-5xl font-bold">${c.h1}</h1>
          <p class="mt-4 text-slate-200 max-w-2xl leading-relaxed">${c.intro}</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <a href="tel:${PHONE_TEL}" class="bg-teal-600 text-white font-bold px-6 py-3 rounded-xl shadow-md">Call ${c.name} Technician ${PHONE_DISPLAY}</a>
            <a href="https://wa.me/916263013446?text=Hi%2C%20I%20need%20chimney%20service%20in%20${encodeURIComponent(c.name)}" class="bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl shadow-md">WhatsApp Technician</a>
          </div>
        </div>
      </header>
      <main class="max-w-6xl mx-auto px-4 py-12 space-y-10">
        <section>
          <h2 class="text-2xl font-bold text-navy-900 mb-4">Sectors & Societies Covered in ${c.name}</h2>
          <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            ${c.sectors.map(s => `
              <div class="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 shadow-xs">
                <span class="text-teal-600 font-bold text-xs">✓</span>
                <span class="text-sm font-semibold text-navy-900">${s}</span>
              </div>
            `).join('')}
          </div>
        </section>
        <section class="bg-slate-50 p-6 rounded-2xl">
          <h2 class="text-2xl font-bold text-navy-900 mb-4">Why Choose Kitchen King in ${c.name}</h2>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div class="p-4 bg-white rounded-xl border border-slate-200">
              <h3 class="font-bold text-navy-900">Same-Day Doorstep Visit</h3>
              <p class="text-xs text-slate-600 mt-1">Rapid technician dispatch across all ${c.name} societies and kothis.</p>
            </div>
            <div class="p-4 bg-white rounded-xl border border-slate-200">
              <h3 class="font-bold text-navy-900">Upfront Clear Quote</h3>
              <p class="text-xs text-slate-600 mt-1">Inspection conducted before starting; no hidden charges.</p>
            </div>
            <div class="p-4 bg-white rounded-xl border border-slate-200">
              <h3 class="font-bold text-navy-900">Genuine Spare Parts</h3>
              <p class="text-xs text-slate-600 mt-1">Brand-compatible motors, capacitors, and baffle filters.</p>
            </div>
            <div class="p-4 bg-white rounded-xl border border-slate-200">
              <h3 class="font-bold text-navy-900">Pay After Test Run</h3>
              <p class="text-xs text-slate-600 mt-1">Full suction and noise balance verified before payment.</p>
            </div>
          </div>
        </section>
        <section>
          <h2 class="text-2xl font-bold text-navy-900 mb-4">All Kitchen Chimney Brands Serviced in ${c.name}</h2>
          <div class="flex flex-wrap gap-2">
            ${brands.map(b => `<span class="bg-slate-100 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200">${b} Chimney Service</span>`).join('')}
          </div>
        </section>
        <section>
          <h2 class="text-2xl font-bold text-navy-900 mb-4">${c.name} Chimney Service FAQs</h2>
          <div class="space-y-4">
            ${c.faqs.map(([q, a]) => `
              <div class="rounded-xl border border-slate-200 p-5 bg-white">
                <h3 class="font-bold text-navy-900">${q}</h3>
                <p class="mt-2 text-sm text-slate-600 leading-relaxed">${a}</p>
              </div>
            `).join('')}
          </div>
        </section>
      </main>
    `
  };

  routeList.push(cityData);

  // Add alias routes that point canonically to the primary route
  aliases.forEach(alias => {
    routeList.push({
      ...cityData,
      path: alias,
      canonical: `${CANONICAL_URL}${primaryPath}`
    });
  });
});

// 6. About
routeList.push({
  path: '/about',
  title: `About ${BUSINESS_NAME} | Chimney & Appliance Service Chandigarh Tricity`,
  description: 'Learn about Kitchen King, the leading doorstep kitchen chimney, hob, and RO purifier service team headquartered in Sector 39, Maloya, Chandigarh.',
  image: '/images/about_team.jpg',
  h1: `About ${BUSINESS_NAME}`,
  intro: 'Dedicated kitchen chimney repair, deep chemical degreasing, and installation specialists serving the Chandigarh Tricity region with pride and precision.',
  schemas: [
    businessSchema,
    makeBreadcrumbSchema([['Home', '/'], ['About', '/about']])
  ],
  contentHtml: `
    <header class="bg-navy-900 text-white py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl md:text-5xl font-bold">About ${BUSINESS_NAME}</h1>
        <p class="mt-4 text-slate-200 max-w-2xl leading-relaxed">Dedicated kitchen chimney repair, deep chemical degreasing, and installation specialists serving the Chandigarh Tricity region.</p>
      </div>
    </header>
    <main class="max-w-6xl mx-auto px-4 py-12 space-y-6">
      <p class="text-slate-700 leading-relaxed">Based in Sector 39, Maloya, Chandigarh 160025, Kitchen King is Tricity's trusted doorstep appliance service provider.</p>
    </main>
  `
});

// 7. Contact
routeList.push({
  path: '/contact',
  title: `Contact ${BUSINESS_NAME} | Book Doorstep Chimney Service`,
  description: 'Contact Kitchen King for kitchen chimney repair, deep cleaning, or hob service in Chandigarh, Mohali, Panchkula, Zirakpur, Kharar. Call +91 62630 13446.',
  image: '/images/hero_chimney.jpg',
  h1: 'Contact Kitchen King',
  intro: 'Get in touch for fast doorstep chimney repair, cleaning, or hob service across Chandigarh Tricity.',
  schemas: [
    businessSchema,
    makeBreadcrumbSchema([['Home', '/'], ['Contact', '/contact']])
  ],
  contentHtml: `
    <header class="bg-navy-900 text-white py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl md:text-5xl font-bold">Contact Kitchen King</h1>
        <p class="mt-4 text-slate-200 max-w-2xl leading-relaxed">Doorstep chimney and hob service across Chandigarh, Mohali, Panchkula, Zirakpur, Kharar.</p>
      </div>
    </header>
    <main class="max-w-6xl mx-auto px-4 py-12 space-y-6">
      <div class="rounded-xl border border-slate-200 p-6 bg-white max-w-xl">
        <h2 class="text-xl font-bold text-navy-900">Direct Contact Information</h2>
        <p class="mt-2 text-slate-600">Phone: <a href="tel:${PHONE_TEL}" class="font-bold text-teal-600">${PHONE_DISPLAY}</a></p>
        <p class="mt-1 text-slate-600">Address: ${ADDRESS_LINE}</p>
        <p class="mt-1 text-slate-600">Working Hours: Monday – Sunday, 8:00 AM – 8:00 PM</p>
      </div>
    </main>
  `
});

// 8. Privacy Policy
routeList.push({
  path: '/privacy-policy',
  title: `Privacy Policy | ${BUSINESS_NAME}`,
  description: 'Privacy policy and customer data protection principles at Kitchen King Chimney & RO Service.',
  image: '/images/hero_chimney.jpg',
  h1: 'Privacy Policy',
  intro: 'How Kitchen King handles and protects your booking details and service information.',
  schemas: [
    businessSchema,
    makeBreadcrumbSchema([['Home', '/'], ['Privacy Policy', '/privacy-policy']])
  ],
  contentHtml: `
    <header class="bg-navy-900 text-white py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl md:text-5xl font-bold">Privacy Policy</h1>
        <p class="mt-4 text-slate-200 max-w-2xl leading-relaxed">How Kitchen King handles and protects your booking details.</p>
      </div>
    </header>
  `
});

console.log(`[Prerender] Starting pre-render for ${routeList.length} static routes...`);

routeList.forEach(route => {
  const canonicalUrl = route.canonical || `${CANONICAL_URL}${route.path === '/' ? '' : route.path}`;
  const imageUrl = route.image.startsWith('http') ? route.image : `${CANONICAL_URL}${route.image}`;
  const validSchemas = (route.schemas || []).filter(Boolean);

  let html = templateHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);
  html = html.replace(/<meta name="title" content=".*?" \/>/i, `<meta name="title" content="${route.title}" />`);

  // Replace Description
  html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${route.description}" />`);

  // Replace Open Graph Tags
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${route.title}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${route.description}" />`);
  html = html.replace(/<meta property="og:image" content=".*?" \/>/i, `<meta property="og:image" content="${imageUrl}" />`);

  // Replace Twitter Tags
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${route.title}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${route.description}" />`);
  html = html.replace(/<meta name="twitter:image" content=".*?" \/>/i, `<meta name="twitter:image" content="${imageUrl}" />`);

  // Build head injections (canonical link + JSON-LD schemas)
  const headInjections = [
    `<link rel="canonical" href="${canonicalUrl}" />`,
    `<meta property="og:url" content="${canonicalUrl}" />`,
    `<meta name="twitter:url" content="${canonicalUrl}" />`,
    ...validSchemas.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
  ].join('\n  ');

  html = html.replace('</head>', `  ${headInjections}\n</head>`);

  // Inject semantic HTML content inside <div id="root">
  if (route.contentHtml) {
    const noscriptBlock = `
      <div id="root-static-seo" style="display:none;" aria-hidden="true">
        ${route.contentHtml}
      </div>
    `;
    html = html.replace('<div id="root"></div>', `<div id="root">${route.contentHtml}</div>${noscriptBlock}`);
  }

  // Determine output path
  let targetPath;
  if (route.path === '/') {
    targetPath = path.join(distDir, 'index.html');
  } else {
    const routeDir = path.join(distDir, route.path.replace(/^\//, ''));
    fs.mkdirSync(routeDir, { recursive: true });
    targetPath = path.join(routeDir, 'index.html');
  }

  fs.writeFileSync(targetPath, html, 'utf8');
});

console.log(`[Prerender] Successfully generated ${routeList.length} pre-rendered static HTML routes for 100% Google SEO!`);
