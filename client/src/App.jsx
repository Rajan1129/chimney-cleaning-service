import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import { cities } from './data/content';
import { Home, Services, ServicePage, Locations, CityPage, About, Contact, Privacy, NotFound } from './pages/pages';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <Routes>
      {/* Standalone Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Customer Facing Website with Main Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/locations/:slug" element={<CityPage />} />
        {cities.map(c => <Route key={'in-' + c.slug} path={`/chimney-service-in-${c.slug}`} element={<CityPage slug={c.slug} />} />)}
        {cities.map(c => <Route key={c.slug} path={`/chimney-service-${c.slug}`} element={<CityPage slug={c.slug} />} />)}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
