import { Helmet } from 'react-helmet-async';
import { SITE, addressLine, CANONICAL_URL } from '../data/site';
import { cities, services } from '../data/content';

export const business = () => ({
  '@context': 'https://schema.org',
  '@type': ['HomeAndConstructionBusiness', 'LocalBusiness', 'ProfessionalService'],
  name: `${SITE.name} - Kitchen Chimney, Hob & RO Service`,
  alternateName: ['Kitchen King Chimney Service', 'Kitchen King Tricity Chimney Repair'],
  description: 'Doorstep kitchen chimney repair, deep chemical cleaning, hob repair, gas stove service, and chimney installation across Chandigarh, Mohali, Panchkula, Zirakpur, Kharar and Ludhiana.',
  image: [
    `${CANONICAL_URL}/images/hero_chimney.jpg`,
    `${CANONICAL_URL}/images/chimney_problems.jpg`,
    `${CANONICAL_URL}/logo.png`
  ],
  logo: `${CANONICAL_URL}/logo.png`,
  url: CANONICAL_URL,
  telephone: SITE.phoneTel,
  email: SITE.email,
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, Google Pay, PhonePe, Paytm, Net Banking',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    postalCode: SITE.address.postal,
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SITE.geo.latitude,
    longitude: SITE.geo.longitude
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
  })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Kitchen Chimney & Hob Repair Services',
    itemListElement: services.filter(s => s.page).map(s => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.title,
        description: s.short,
        url: `${CANONICAL_URL}/services/${s.slug}`
      }
    }))
  }
});

export const faqLd = (faqs = []) => {
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

export const breadcrumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: `${CANONICAL_URL}${path}`
  }))
});

export const webSite = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${SITE.name} Chimney & Hob Service`,
  url: CANONICAL_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${CANONICAL_URL}/services?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
});

export const serviceLd = (s) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Kitchen Chimney & Appliance Repair',
  name: `${s.title} in Chandigarh Tricity`,
  description: s.short,
  provider: {
    '@type': 'HomeAndConstructionBusiness',
    name: SITE.name,
    telephone: SITE.phoneTel,
    address: addressLine
  },
  areaServed: cities.map(c => ({ '@type': 'City', name: c.name })),
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    price: '299',
    description: 'Upfront doorstep inspection and diagnostic estimate'
  }
});

export default function Seo({
  title,
  description,
  path = '/',
  image = '/images/hero_chimney.jpg',
  jsonLd = [],
  noindex = false,
  type = 'website'
}) {
  const cleanPath = path === '/' ? '' : (path.startsWith('/') ? path : `/${path}`);
  const fullUrl = `${CANONICAL_URL}${cleanPath}`;
  const imageUrl = image.startsWith('http') ? image : `${CANONICAL_URL}${image.startsWith('/') ? image : `/${image}`}`;
  const validJsonLd = jsonLd.filter(Boolean);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Local Geo Tags */}
      <meta name="geo.region" content="IN-CH" />
      <meta name="geo.placename" content="Chandigarh, Mohali, Panchkula, Zirakpur" />
      <meta name="geo.position" content={`${SITE.geo.latitude};${SITE.geo.longitude}`} />
      <meta name="ICBM" content={`${SITE.geo.latitude}, ${SITE.geo.longitude}`} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Structured Data / JSON-LD */}
      {validJsonLd.map((d, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(d)}
        </script>
      ))}
    </Helmet>
  );
}
