import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import { cities } from './data/content';
import { Home, Services, ServicePage, CityPage, About, Contact, Privacy, NotFound } from './pages/pages';
export default function App() {
  return (<Routes><Route element={<Layout />}>
    <Route path="/" element={<Home />} /><Route path="/services" element={<Services />} />
    <Route path="/services/:slug" element={<ServicePage />} />
    {cities.map(c => <Route key={c.slug} path={`/chimney-service-${c.slug}`} element={<CityPage slug={c.slug} />} />)}
    <Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="/privacy-policy" element={<Privacy />} />
    <Route path="*" element={<NotFound />} /></Route></Routes>);
}
