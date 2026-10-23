import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { SITE } from '../../data/site';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('chimneyservice@tricity');
  const [password, setPassword] = useState('ravi@chimney@2020');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const token = localStorage.getItem('admin_token');
    if (token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid username or password');
      }

      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.admin));
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 justify-center mb-4">
          <div className="rounded-xl bg-white p-2 shadow-lg">
            <img src="/logo.png" alt={SITE.name} className="h-12 w-auto object-contain" />
          </div>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Admin Control Center
        </h2>
        <p className="mt-1.5 text-sm text-slate-400">
          {SITE.name} Chimney & RO Service Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-slate-800/90 backdrop-blur-md py-8 px-6 shadow-2xl rounded-2xl border border-slate-700/80 sm:px-10">
          {error && (
            <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300 flex items-center gap-3">
              <AlertCircle size={18} className="shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Username / Email
              </label>
              <div className="relative mt-2 rounded-xl shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-xl border border-slate-600 bg-slate-900/80 pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:border-teal-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 text-sm"
                  placeholder="chimneyservice@tricity"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Admin Password
              </label>
              <div className="relative mt-2 rounded-xl shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border border-slate-600 bg-slate-900/80 pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:border-teal-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 text-sm"
                  placeholder="Enter admin password"
                />
              </div>
            </div>

            <div className="rounded-xl border border-teal-500/20 bg-teal-500/10 p-3 text-xs text-teal-300 flex items-start gap-2.5">
              <ShieldCheck size={16} className="shrink-0 text-teal-400 mt-0.5" />
              <div>
                <p className="font-semibold text-teal-200">Pre-configured Credentials:</p>
                <p className="mt-0.5 text-teal-300/80">User: <code className="text-white">chimneyservice@tricity</code></p>
                <p className="text-teal-300/80">Pass: <code className="text-white">ravi@chimney@2020</code></p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 rounded-xl bg-teal-500 px-4 py-3 text-sm font-bold text-navy-900 shadow-lg hover:bg-teal-400 focus:outline-hidden focus:ring-2 focus:ring-teal-400/50 disabled:opacity-50 transition cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Sign In to Admin Panel'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700/60 text-center">
            <Link to="/" className="text-xs font-medium text-slate-400 hover:text-teal-400 transition">
              &larr; Back to Kitchen King Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
