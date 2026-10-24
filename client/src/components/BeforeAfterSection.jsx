import { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowLeftRight, CheckCircle2, ShieldCheck, Columns, SlidersHorizontal, Flame, Wind, Eye } from 'lucide-react';
import { telHref, waHref } from '../lib/links';
import { track } from '../lib/analytics';
import { SITE } from '../data/site';

const CASES = [
  {
    id: 'baffle-filter',
    title: 'Chimney Baffle Filter Deep Degreasing',
    subtitle: 'Stubborn yellow grease and choked oil channels cleaned to factory shine',
    beforeImg: '/images/before_filter_grease.jpg',
    beforeAlt: 'Heavy greasy kitchen chimney baffle filter before cleaning',
    afterImg: '/images/service_filter.jpg',
    afterAlt: 'Clean stainless steel chimney baffle filter after chemical degreasing',
    badge: 'Filter Restoration',
    beforeIssue: 'Airflow blocked by 60%, motor overheating, oil dripping from edges',
    afterResult: '100% degreased stainless steel, full suction restored, zero dripping',
    stats: [
      { label: 'Suction Restored', val: '100%' },
      { label: 'Degrease Duration', val: '45 mins' },
      { label: 'Cleaner Used', val: 'Food-Safe' }
    ]
  },
  {
    id: 'hob-cooktop',
    title: 'Gas Hob & Brass Burner Restoration',
    subtitle: 'Blocked brass jets, low yellow flame, and carbon deposits removed',
    beforeImg: '/images/before_stove.jpg',
    beforeAlt: 'Gas stove before servicing with carbon buildup and blocked burner',
    afterImg: '/images/service_hob_stove.jpg',
    afterAlt: 'Sparkling clean built-in gas hob cooktop after burner repair',
    badge: 'Hob & Burner Service',
    beforeIssue: 'Uneven low flame, yellow soot staining utensils, clogged burner nozzles',
    afterResult: 'Crisp uniform blue flame, zero gas leak risk, spotless tempered glass',
    stats: [
      { label: 'Flame Efficiency', val: 'High Blue' },
      { label: 'Leakage Check', val: '100% Safe' },
      { label: 'Ignition Spark', val: 'Instant' }
    ]
  },
  {
    id: 'mesh-filter',
    title: 'Chimney Grease-Lock Mesh & Housing',
    subtitle: 'Multi-layer aluminum mesh deep soaked in chemical degreaser',
    beforeImg: '/images/before_after_mesh.jpg',
    beforeAlt: 'Kitchen chimney grease lock filter before and after deep cleaning comparison',
    afterImg: '/images/service_cleaning.jpg',
    afterAlt: 'Cleaned kitchen range hood body and filter cavity after service',
    badge: 'Chemical Soak',
    beforeIssue: 'Thick sticky grease layer coating the interior blower cavity and mesh',
    afterResult: 'Cleaned interior surfaces, unhindered exhaust, silent motor run',
    stats: [
      { label: 'Grease Removed', val: '99.8%' },
      { label: 'Motor Noise', val: 'Reduced' },
      { label: 'Warranty', val: '30-Day Care' }
    ]
  }
];

export default function BeforeAfterSection() {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [viewMode, setViewMode] = useState('slider'); // 'slider' | 'sideBySide'
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const activeCase = CASES[activeCaseIdx];

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(clamped);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  useEffect(() => {
    const handleUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-navy-900 to-slate-950 text-white">
      {/* Background Tech Dot Mesh */}
      <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-30" />

      {/* Background Ambient Glow Blobs for Glassmorphism */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-teal-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full backdrop-blur-md bg-white/10 px-4 py-1.5 text-xs font-bold text-teal-300 border border-white/20 shadow-lg mb-4">
            <Sparkles size={14} className="text-teal-400 animate-pulse" />
            <span>REAL RESULTS • 100% AUTHENTIC WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            See the <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-400 bg-clip-text text-transparent">Transformation</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Drag the interactive slider below or switch to side-by-side mode to witness our doorstep deep chemical degreasing in action.
          </p>

          {/* Job Selection Tabs & View Toggle (Frosted Glass) */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap justify-center gap-2">
              {CASES.map((c, idx) => {
                const isActive = idx === activeCaseIdx;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveCaseIdx(idx);
                      setSliderPos(50);
                      track('before_after_tab', { tab: c.id });
                    }}
                    className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? 'backdrop-blur-lg bg-teal-500 text-white shadow-lg shadow-teal-500/30 border border-teal-400/50 scale-105'
                        : 'backdrop-blur-md bg-white/5 hover:bg-white/15 text-slate-300 border border-white/10'
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-white' : 'bg-teal-400'}`} />
                    {c.badge}
                  </button>
                );
              })}
            </div>

            {/* Mode Switcher: Split Slider vs Side-by-Side */}
            <div className="inline-flex rounded-xl backdrop-blur-md bg-white/5 border border-white/15 p-1 shadow-sm">
              <button
                onClick={() => setViewMode('slider')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition ${
                  viewMode === 'slider' ? 'bg-teal-500 text-white shadow-md' : 'text-slate-300 hover:text-white'
                }`}
                title="Interactive Slider Mode"
              >
                <SlidersHorizontal size={14} />
                Slider
              </button>
              <button
                onClick={() => setViewMode('sideBySide')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition ${
                  viewMode === 'sideBySide' ? 'bg-teal-500 text-white shadow-md' : 'text-slate-300 hover:text-white'
                }`}
                title="Side by Side Mode"
              >
                <Columns size={14} />
                Side by Side
              </button>
            </div>
          </div>
        </div>

        {/* Main Comparison Glass Card */}
        <div className="rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 p-4 sm:p-8 shadow-2xl shadow-black/40">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            
            {/* Visual Display (Col 7) */}
            <div className="lg:col-span-7">
              {viewMode === 'slider' ? (
                /* Interactive Split Slider */
                <div>
                  <div
                    ref={containerRef}
                    onMouseDown={() => setIsDragging(true)}
                    onTouchStart={() => setIsDragging(true)}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                    className="group relative h-80 sm:h-96 md:h-[420px] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl border border-white/25 shadow-2xl bg-slate-900"
                  >
                    {/* AFTER IMAGE (Bottom Layer - Full Width) */}
                    <img
                      src={activeCase.afterImg}
                      alt={activeCase.afterAlt}
                      className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                    />

                    {/* BEFORE IMAGE (Top Layer - Clipped by Slider Position) */}
                    <div
                      className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
                      style={{ width: `${sliderPos}%` }}
                    >
                      <img
                        src={activeCase.beforeImg}
                        alt={activeCase.beforeAlt}
                        style={{
                          width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
                          maxWidth: 'none'
                        }}
                        className="h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* Floating Glass Badges on Images */}
                    <div className="pointer-events-none absolute top-4 left-4 rounded-lg backdrop-blur-md bg-red-950/85 border border-red-500/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-200 shadow-md">
                      BEFORE: Clogged
                    </div>
                    <div className="pointer-events-none absolute top-4 right-4 rounded-lg backdrop-blur-md bg-teal-950/85 border border-teal-400/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-300 shadow-md">
                      AFTER: Deep Cleaned
                    </div>

                    {/* Slider Divider Line */}
                    <div
                      className="pointer-events-none absolute inset-y-0"
                      style={{ left: `${sliderPos}%` }}
                    >
                      <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)]" />
                      
                      {/* Slider Circular Handle (Frosted Glass with Pulsing Ring) */}
                      <div className="absolute top-1/2 -left-5 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-lg bg-white/95 text-navy-900 border-2 border-teal-500 shadow-2xl ring-4 ring-teal-500/30 animate-pulse transition duration-150 group-hover:scale-110">
                        <ArrowLeftRight size={16} className="text-navy-900 font-bold" />
                      </div>
                    </div>

                    {/* Bottom Prompt */}
                    <div className="pointer-events-none absolute bottom-3 inset-x-0 text-center">
                      <span className="inline-block rounded-full backdrop-blur-md bg-black/60 px-3 py-1 text-[11px] font-medium text-slate-200 border border-white/10">
                        ◀ Drag slider horizontally to compare ▶
                      </span>
                    </div>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setSliderPos(90)}
                      className={`text-xs px-3 py-1 rounded-lg backdrop-blur-md transition ${sliderPos > 70 ? 'bg-red-500/30 text-red-200 border border-red-500/40' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                    >
                      View Before (90%)
                    </button>
                    <button
                      onClick={() => setSliderPos(50)}
                      className={`text-xs px-3 py-1 rounded-lg backdrop-blur-md transition ${Math.abs(sliderPos - 50) < 5 ? 'bg-teal-500/40 text-teal-200 border border-teal-500/50' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                    >
                      50 / 50 Split
                    </button>
                    <button
                      onClick={() => setSliderPos(10)}
                      className={`text-xs px-3 py-1 rounded-lg backdrop-blur-md transition ${sliderPos < 30 ? 'bg-teal-500/30 text-teal-200 border border-teal-500/40' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                    >
                      View After (90%)
                    </button>
                  </div>
                </div>
              ) : (
                /* Side-by-Side Dual View */
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="group relative overflow-hidden rounded-2xl border border-red-500/30 shadow-lg bg-slate-900 h-64 sm:h-80">
                    <img src={activeCase.beforeImg} alt={activeCase.beforeAlt} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 rounded-md bg-red-900/90 border border-red-500/40 px-2.5 py-1 text-xs font-bold text-red-200 uppercase">
                      Before Cleaning
                    </span>
                    <p className="absolute bottom-3 left-3 right-3 text-xs text-slate-300 font-medium">
                      Heavy grease & choked airflow
                    </p>
                  </div>
                  <div className="group relative overflow-hidden rounded-2xl border border-teal-400/40 shadow-lg bg-slate-900 h-64 sm:h-80">
                    <img src={activeCase.afterImg} alt={activeCase.afterAlt} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 rounded-md bg-teal-900/90 border border-teal-400/50 px-2.5 py-1 text-xs font-bold text-teal-200 uppercase">
                      After Restoration
                    </span>
                    <p className="absolute bottom-3 left-3 right-3 text-xs text-slate-300 font-medium">
                      Sparkling clean & 100% suction restored
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Case Details & Metrics (Col 5) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <span className="inline-block rounded-md backdrop-blur-md bg-teal-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-300 border border-teal-500/30">
                  {activeCase.badge}
                </span>
                <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {activeCase.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {activeCase.subtitle}
                </p>

                {/* Before vs After Callout Pills (Frosted Glass) */}
                <div className="mt-6 space-y-3">
                  <div className="rounded-xl backdrop-blur-md bg-red-500/10 border border-red-500/20 p-3.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-red-300 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400"></span>
                      Issue Identified
                    </p>
                    <p className="mt-1 text-xs text-red-100/90 leading-snug">{activeCase.beforeIssue}</p>
                  </div>
                  <div className="rounded-xl backdrop-blur-md bg-teal-500/15 border border-teal-500/30 p-3.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400"></span>
                      Service Delivered
                    </p>
                    <p className="mt-1 text-xs text-teal-100/90 leading-snug">{activeCase.afterResult}</p>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="mt-6 grid grid-cols-3 gap-2.5">
                  {activeCase.stats.map(s => (
                    <div key={s.label} className="rounded-xl backdrop-blur-md bg-white/5 border border-white/10 p-3 text-center">
                      <p className="text-base sm:text-lg font-black text-white">{s.val}</p>
                      <p className="mt-0.5 text-[10px] sm:text-xs text-slate-400 font-medium">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons with shine sweep */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={telHref}
                  onClick={() => track('call_click', { location: 'before_after_card' })}
                  className="flex-1 rounded-xl bg-teal-500 hover:bg-teal-400 py-3.5 px-4 text-center font-bold text-white shadow-lg shadow-teal-500/25 btn-shine transition duration-200"
                >
                  Book Doorstep Cleaning
                </a>
                <a
                  href={waHref('Before After Section')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('whatsapp_click', { location: 'before_after_card' })}
                  className="flex-1 rounded-xl backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 py-3.5 px-4 text-center font-bold text-white transition duration-200"
                >
                  WhatsApp Photo
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* 3 Trust Features in Glassmorphism */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="group flex items-center gap-3.5 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-4 shadow-sm hover:bg-white/10 hover:border-teal-400/30 hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300 font-bold group-hover:scale-110 group-hover:bg-teal-500/30 transition">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="font-bold text-sm text-white">Food-Safe Chemical Degreasers</p>
              <p className="text-xs text-slate-400">Zero toxic fumes or harsh residue in your cooking space.</p>
            </div>
          </div>

          <div className="group flex items-center gap-3.5 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-4 shadow-sm hover:bg-white/10 hover:border-teal-400/30 hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300 font-bold group-hover:scale-110 group-hover:bg-teal-500/30 transition">
              <Wind size={20} />
            </div>
            <div>
              <p className="font-bold text-sm text-white">Guaranteed Suction Restored</p>
              <p className="text-xs text-slate-400">Test run with paper-suction verification before payment.</p>
            </div>
          </div>

          <div className="group flex items-center gap-3.5 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-4 shadow-sm hover:bg-white/10 hover:border-teal-400/30 hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300 font-bold group-hover:scale-110 group-hover:bg-teal-500/30 transition">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="font-bold text-sm text-white">Doorstep Service in 60-90 Mins</p>
              <p className="text-xs text-slate-400">Technicians equipped with mobile degreasing kits.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
