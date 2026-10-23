import { Helmet } from 'react-helmet-async';
import { SITE, addressLine } from '../data/site';
import { cities } from '../data/content';
export const business = () => ({ '@context': 'https://schema.org', '@type': 'HomeAndConstructionBusiness', name: SITE.name, url: SITE.url || undefined, telephone: SITE.phoneTel,
  address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, addressLocality: SITE.address.city, postalCode: SITE.address.postal, addressCountry: 'IN' }, areaServed: cities.map(c => ({ '@type': 'City', name: c.name })) });
export default function Seo({ title, description, path = '/', jsonLd = [], noindex = false }) {
  const url = SITE.url + path;
  return (<Helmet>
    <title>{title}</title><meta name="description" content={description} />
    {SITE.url && <link rel="canonical" href={url} />}
    {noindex && <meta name="robots" content="noindex" />}
    <meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:type" content="website" /><meta property="og:url" content={url} /><meta name="twitter:card" content="summary" />
    {jsonLd.map((d, i) => <script key={i} type="application/ld+json">{JSON.stringify(d)}</script>)}
  </Helmet>);
}
export const breadcrumb = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE.url + path })) });
export const webSite = () => ({ '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url || undefined });
export const serviceLd = (s) => ({ '@context': 'https://schema.org', '@type': 'Service', name: s.title, description: s.short, provider: { '@type': 'HomeAndConstructionBusiness', name: SITE.name, telephone: SITE.phoneTel, address: addressLine } });
