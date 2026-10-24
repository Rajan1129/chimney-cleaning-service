import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Search,
  Filter,
  Download,
  LogOut,
  RefreshCw,
  Plus,
  Trash2,
  Calendar,
  MapPin,
  Wrench,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Database,
  ExternalLink,
  Save,
  X
} from 'lucide-react';
import { SITE } from '../../data/site';
import { cities, services } from '../../data/content';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [dbStatus, setDbStatus] = useState('checking');
  const [adminUser, setAdminUser] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [savingNoteId, setSavingNoteId] = useState(null);
  const [actionMessage, setActionMessage] = useState('');

  // Form for new manual booking
  const [newBooking, setNewBooking] = useState({
    name: '',
    phone: '',
    city: 'Chandigarh',
    service: 'Kitchen Chimney Repair',
    message: ''
  });

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const token = localStorage.getItem('admin_token');

  const showNotification = (msg) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(''), 3500);
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  }, [navigate]);

  const fetchHealth = useCallback(async () => {
    try {
      const res = await fetch(`${apiUrl}/api/health`);
      const data = await res.json();
      setDbStatus(data.db === 'connected' ? 'connected' : 'disconnected');
    } catch {
      setDbStatus('disconnected');
    }
  }, [apiUrl]);

  const fetchData = useCallback(async () => {
    if (!token) {
      handleLogout();
      return;
    }

    try {
      setRefreshing(true);
      // Fetch stats
      const statsRes = await fetch(`${apiUrl}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (statsRes.status === 401) {
        handleLogout();
        return;
      }
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.stats);

      // Fetch enquiries with filters
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (cityFilter !== 'all') params.append('city', cityFilter);
      if (serviceFilter !== 'all') params.append('service', serviceFilter);
      if (search.trim()) params.append('search', search.trim());

      const enqRes = await fetch(`${apiUrl}/api/admin/enquiries?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const enqData = await enqRes.json();
      if (enqData.success) setEnquiries(enqData.enquiries);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [apiUrl, token, statusFilter, cityFilter, serviceFilter, search, handleLogout]);

  useEffect(() => {
    const t = localStorage.getItem('admin_token');
    if (!t) {
      navigate('/admin/login', { replace: true });
      return;
    }
    const userStr = localStorage.getItem('admin_user');
    if (userStr) {
      try { setAdminUser(JSON.parse(userStr)); } catch {}
    }
    fetchHealth();
    fetchData();
  }, [navigate, fetchHealth, fetchData]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${apiUrl}/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status: newStatus } : e));
        showNotification(`Status updated to "${newStatus}"`);
        fetchData();
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleNotesSave = async (id, notes) => {
    setSavingNoteId(id);
    try {
      const res = await fetch(`${apiUrl}/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ notes })
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries(prev => prev.map(e => e._id === id ? { ...e, notes } : e));
        showNotification('Technician note saved');
      }
    } catch (err) {
      alert('Failed to save notes: ' + err.message);
    } finally {
      setSavingNoteId(null);
    }
  };

  const handleDelete = async (id, customerName) => {
    if (!window.confirm(`Delete enquiry for "${customerName}" permanently?`)) return;
    try {
      const res = await fetch(`${apiUrl}/api/admin/enquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries(prev => prev.filter(e => e._id !== id));
        showNotification('Enquiry deleted');
        fetchData();
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Manual booking logged successfully');
        setShowNewModal(false);
        setNewBooking({
          name: '',
          phone: '',
          city: 'Chandigarh',
          service: 'Kitchen Chimney Repair',
          message: ''
        });
        fetchData();
      } else {
        alert(data.message || 'Failed to save booking');
      }
    } catch (err) {
      alert('Error creating booking: ' + err.message);
    }
  };

  const exportToCSV = () => {
    if (!enquiries.length) {
      alert('No enquiries to export');
      return;
    }
    const headers = ['ID', 'Date (IST)', 'Customer Name', 'Phone', 'City', 'Service', 'Status', 'Message', 'Notes'];
    const rows = enquiries.map(e => [
      e._id,
      new Date(e.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      `"${(e.name || '').replace(/"/g, '""')}"`,
      `"${e.phone || ''}"`,
      `"${(e.city || '').replace(/"/g, '""')}"`,
      `"${(e.service || '').replace(/"/g, '""')}"`,
      e.status,
      `"${(e.message || '').replace(/"/g, '""')}"`,
      `"${(e.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `kitchen_king_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const cleanPhone = (p) => (p || '').replace(/\D/g, '').slice(-10);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="rounded-xl bg-white p-1.5 shadow-sm">
                <img src="/logo.png" alt={SITE.name} className="h-9 w-auto object-contain" />
              </div>
              <div>
                <span className="font-extrabold text-white text-lg tracking-tight hidden sm:inline">
                  {SITE.name}
                </span>
                <span className="ml-2 rounded-md bg-teal-500/20 px-2 py-0.5 text-xs font-bold text-teal-400 border border-teal-500/30">
                  Admin Panel
                </span>
              </div>
            </Link>

            {/* Live Database status pill */}
            <div className="hidden lg:flex items-center gap-1.5 rounded-full bg-slate-800 border border-slate-700/80 px-3 py-1 text-xs">
              <Database size={13} className="text-slate-400" />
              <span className="text-slate-400">Atlas DB:</span>
              <span className={`inline-block h-2 w-2 rounded-full ${dbStatus === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`} />
              <span className={dbStatus === 'connected' ? 'text-emerald-300 font-semibold' : 'text-red-400'}>
                {dbStatus === 'connected' ? 'Connected' : 'Offline'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={fetchData}
              disabled={refreshing}
              title="Refresh data"
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition cursor-pointer"
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin text-teal-400' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={() => setShowNewModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-teal-500 px-3.5 py-2 text-xs font-bold text-navy-900 shadow-md hover:bg-teal-400 transition cursor-pointer"
            >
              <Plus size={15} />
              <span>New Booking</span>
            </button>

            <Link
              to="/"
              target="_blank"
              title="View public website in new tab"
              className="hidden md:flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700 transition"
            >
              <span>View Site</span>
              <ExternalLink size={13} />
            </Link>

            <div className="h-5 w-px bg-slate-700 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden xl:inline">
                {adminUser?.username || 'chimneyservice@tricity'}
              </span>
              <button
                onClick={handleLogout}
                title="Sign out of admin"
                className="flex items-center gap-1 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/20 transition cursor-pointer"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 mx-auto max-w-7xl w-full p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Floating Notification */}
        {actionMessage && (
          <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-teal-500/40 bg-teal-950/90 backdrop-blur-md px-4 py-3 text-sm text-teal-200 shadow-2xl flex items-center gap-2.5 animate-bounce">
            <CheckCircle size={18} className="text-teal-400" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Dashboard Title & Quick Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Customer Bookings & Enquiries
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Real-time enquiries submitted via website form across Chandigarh Tricity
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition cursor-pointer"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-400">Total Bookings</p>
            <p className="mt-2 text-2xl font-black text-white">{stats?.total ?? '—'}</p>
            <p className="mt-1 text-[11px] text-slate-500">All recorded</p>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-amber-300">Action Needed (New)</p>
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
            </div>
            <p className="mt-2 text-2xl font-black text-amber-300">{stats?.new ?? '—'}</p>
            <p className="mt-1 text-[11px] text-amber-400/80">Pending call back</p>
          </div>

          <div className="rounded-2xl border border-teal-500/30 bg-teal-500/10 p-4 shadow-sm">
            <p className="text-xs font-bold text-teal-300">Today's Leads</p>
            <p className="mt-2 text-2xl font-black text-teal-300">{stats?.today ?? '—'}</p>
            <p className="mt-1 text-[11px] text-teal-400/80">Logged today</p>
          </div>

          <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 shadow-sm">
            <p className="text-xs font-bold text-blue-300">Contacted</p>
            <p className="mt-2 text-2xl font-black text-blue-300">{stats?.contacted ?? '—'}</p>
            <p className="mt-1 text-[11px] text-blue-400/80">Technician dispatched</p>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 shadow-sm col-span-2 sm:col-span-1">
            <p className="text-xs font-bold text-emerald-300">Closed / Completed</p>
            <p className="mt-2 text-2xl font-black text-emerald-300">{stats?.closed ?? '—'}</p>
            <p className="mt-1 text-[11px] text-emerald-400/80">Resolved visits</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="rounded-2xl border border-slate-800 bg-slate-800/80 p-4 shadow-sm space-y-3">
          <div className="grid gap-3 sm:grid-cols-12 items-center">
            {/* Search Input */}
            <div className="sm:col-span-4 relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search name, phone, or issue..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-teal-500 focus:outline-hidden focus:ring-1 focus:ring-teal-500"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Status Filter */}
            <div className="sm:col-span-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-hidden"
              >
                <option value="all">Status: All</option>
                <option value="new">New / Pending</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed / Done</option>
              </select>
            </div>

            {/* City Filter */}
            <div className="sm:col-span-3">
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-hidden"
              >
                <option value="all">City: All Coverage</option>
                {cities.map(c => (
                  <option key={c.slug} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Service Filter */}
            <div className="sm:col-span-3">
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-hidden"
              >
                <option value="all">Service: All Types</option>
                {services.map(s => (
                  <option key={s.slug} value={s.title}>{s.title}</option>
                ))}
                <option value="Hob & Gas Stove">Hob & Gas Stove</option>
                <option value="RO Water Purifier">RO Water Purifier</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enquiries List / Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-800/60 overflow-hidden shadow-xl">
          <div className="px-5 py-4 border-b border-slate-700/80 flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>All Enquiries</span>
              <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs text-slate-300">
                {enquiries.length}
              </span>
            </h2>
            <span className="text-xs text-slate-400">
              Live sorted by newest first
            </span>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <RefreshCw size={28} className="mx-auto animate-spin text-teal-400 mb-3" />
              <p className="text-sm text-slate-400">Loading bookings from MongoDB Atlas...</p>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="py-16 text-center px-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 mb-3">
                <Search size={24} />
              </div>
              <p className="text-base font-bold text-white">No enquiries found</p>
              <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
                No bookings match your current search and filter settings, or no new enquiries have arrived yet.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {enquiries.map((enq) => {
                const phoneNum = cleanPhone(enq.phone);
                const waLink = `https://wa.me/91${phoneNum}?text=${encodeURIComponent(`Hello ${enq.name}, we received your enquiry for ${enq.service} in ${enq.city} from Kitchen King. When is a convenient time for technician visit?`)}`;
                const createdDate = new Date(enq.createdAt).toLocaleString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div key={enq._id} className="p-5 hover:bg-slate-800/40 transition">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      {/* Customer Info */}
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-lg font-bold text-white">
                            {enq.name}
                          </h3>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock size={12} /> {createdDate} (IST)
                          </span>
                        </div>

                        {/* Badges: Service & City */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 rounded-md bg-teal-500/20 px-2.5 py-1 text-xs font-semibold text-teal-300 border border-teal-500/30">
                            <Wrench size={12} />
                            {enq.service}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-md bg-slate-700/80 px-2.5 py-1 text-xs font-medium text-slate-300 border border-slate-600/60">
                            <MapPin size={12} />
                            {enq.city}
                          </span>
                        </div>

                        {/* Customer Problem / Message */}
                        {enq.message ? (
                          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-3 text-xs leading-relaxed text-slate-300">
                            <span className="font-semibold text-slate-400">Issue description: </span>
                            {enq.message}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-500 italic">No message entered by customer</p>
                        )}

                        {/* Notes / Technician Assignment */}
                        <div className="pt-2">
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                            Admin / Technician Note:
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              defaultValue={enq.notes || ''}
                              placeholder="e.g. Technician Ravi assigned for 4 PM, quoted ₹450"
                              onBlur={(e) => {
                                if (e.target.value !== (enq.notes || '')) {
                                  handleNotesSave(enq._id, e.target.value);
                                }
                              }}
                              className="w-full max-w-xl rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-teal-500 focus:outline-hidden"
                            />
                            {savingNoteId === enq._id && (
                              <span className="text-[11px] text-teal-400 animate-pulse">Saving...</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Contact Actions & Status Controls */}
                      <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
                        {/* 1-Click Call & WhatsApp Buttons */}
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${enq.phone}`}
                            className="flex items-center gap-1.5 rounded-xl bg-teal-500 px-3 py-2 text-xs font-bold text-navy-900 shadow-sm hover:bg-teal-400 transition"
                            title={`Call ${enq.phone}`}
                          >
                            <Phone size={14} />
                            <span>Call {enq.phone}</span>
                          </a>

                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-500 transition"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle size={14} />
                            <span>WhatsApp</span>
                          </a>
                        </div>

                        {/* Status Select & Delete */}
                        <div className="flex items-center gap-2 w-full lg:w-auto justify-between lg:justify-end">
                          <select
                            value={enq.status || 'new'}
                            onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                            className={`rounded-xl border px-3 py-1.5 text-xs font-bold capitalize focus:outline-hidden ${
                              enq.status === 'new'
                                ? 'border-amber-500/50 bg-amber-500/20 text-amber-300'
                                : enq.status === 'contacted'
                                ? 'border-blue-500/50 bg-blue-500/20 text-blue-300'
                                : 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                            }`}
                          >
                            <option value="new" className="bg-slate-900 text-amber-300">New</option>
                            <option value="contacted" className="bg-slate-900 text-blue-300">Contacted</option>
                            <option value="closed" className="bg-slate-900 text-emerald-300">Closed</option>
                          </select>

                          <button
                            onClick={() => handleDelete(enq._id, enq.name)}
                            title="Delete enquiry"
                            className="rounded-xl border border-red-500/30 p-2 text-slate-400 hover:text-red-300 hover:bg-red-500/20 transition cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Manual Booking Creation Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus size={18} className="text-teal-400" />
                Log Manual Phone / Walk-in Booking
              </h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={newBooking.name}
                  onChange={(e) => setNewBooking({ ...newBooking, name: e.target.value })}
                  placeholder="e.g. Simran Kaur"
                  className="mt-1 w-full rounded-xl border border-slate-600 bg-slate-900 px-3.5 py-2 text-sm text-white focus:border-teal-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={newBooking.phone}
                  onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className="mt-1 w-full rounded-xl border border-slate-600 bg-slate-900 px-3.5 py-2 text-sm text-white focus:border-teal-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300">City / Region *</label>
                  <select
                    value={newBooking.city}
                    onChange={(e) => setNewBooking({ ...newBooking, city: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-hidden"
                  >
                    {cities.map(c => (
                      <option key={c.slug} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300">Service Needed *</label>
                  <select
                    value={newBooking.service}
                    onChange={(e) => setNewBooking({ ...newBooking, service: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-hidden"
                  >
                    {services.map(s => (
                      <option key={s.slug} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Hob & Gas Stove Service">Hob & Gas Stove Service</option>
                    <option value="RO Purifier Service">RO Purifier Service</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300">Issue Details / Address</label>
                <textarea
                  rows="3"
                  value={newBooking.message}
                  onChange={(e) => setNewBooking({ ...newBooking, message: e.target.value })}
                  placeholder="Sector, society name, chimney brand, or complaint details..."
                  className="mt-1 w-full rounded-xl border border-slate-600 bg-slate-900 px-3.5 py-2 text-xs text-white focus:border-teal-500 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-teal-500 px-5 py-2 text-xs font-bold text-navy-900 hover:bg-teal-400"
                >
                  Save Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
