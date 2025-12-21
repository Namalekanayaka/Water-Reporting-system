import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="w-full bg-md-surface p-4 md:p-6 lg:p-8 h-screen overflow-hidden flex flex-col">
        {/* Header - Compact */}
        <div className="shrink-0 mb-6 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-2 h-2 rounded-full bg-md-primary"></span>
              <span className="text-md-primary font-black uppercase tracking-[0.2em] text-[10px]">Citizen Workspace</span>
            </div>
            <h1 className="text-4xl font-black text-md-on-surface tracking-tighter leading-none">Overview.</h1>
          </div>
          <p className="text-[14px] text-md-on-surface-variant font-medium">
            Welcome back, <span className="text-md-primary">{user?.name || 'Neighbor'}</span>.
          </p>
        </div>

        {/* Dashboard Grid - Full Height */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Stats (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4 h-full overflow-y-auto pr-2 custom-scrollbar">
            <div className="bg-md-secondary-container/20 p-6 rounded-[28px] border border-md-secondary-container/10 flex-1 flex flex-col justify-center">
              <h3 className="text-md-on-surface-variant font-bold uppercase tracking-wider text-[10px] mb-2">My Contribution</h3>
              <p className="text-5xl font-black text-md-on-surface mb-2">12</p>
              <p className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded w-fit">Helping 450 families</p>
            </div>
            <div className="bg-md-primary-container/20 p-6 rounded-[28px] border border-md-primary-container/10 flex-1 flex flex-col justify-center">
              <h3 className="text-md-on-surface-variant font-bold uppercase tracking-wider text-[10px] mb-2">Area Health</h3>
              <p className="text-5xl font-black text-md-on-surface mb-2">94%</p>
              <p className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded w-fit">Top 10% in City</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-[28px] border border-orange-100 flex-1 flex flex-col justify-center">
              <h3 className="text-orange-800/70 font-bold uppercase tracking-wider text-[10px] mb-2">Active Issues</h3>
              <p className="text-5xl font-black text-orange-900 mb-2">2</p>
              <p className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-1 rounded w-fit">1 Critical Repair</p>
            </div>
          </div>

          {/* Right Column: Quick Actions (8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            {/* Primary Action - Large */}
            <Link to="/report" className="md:col-span-2 bg-md-primary text-white p-8 rounded-[32px] shadow-lg hover:shadow-xl transition-all group relative overflow-hidden flex flex-col justify-between">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  +
                </div>
                <h3 className="text-3xl font-black mb-2">Report Issue</h3>
                <p className="text-white/80 font-medium max-w-md">Spot a leak or quality issue? File it in under 30 seconds with our new streamlined tool.</p>
              </div>
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
            </Link>

            {/* Secondary Actions */}
            <Link to="/my-reports" className="bg-white p-6 rounded-[32px] border border-md-outline/10 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
              <div className="w-12 h-12 bg-md-secondary-container rounded-2xl flex items-center justify-center text-md-on-secondary-container text-2xl mb-4 group-hover:scale-110 transition-transform">
                📋
              </div>
              <div>
                <h3 className="text-xl font-black text-md-on-surface mb-1">Track Progress</h3>
                <p className="text-xs text-md-on-surface-variant font-medium">View status of your 12 reports.</p>
              </div>
            </Link>

            <Link to="/area-health" className="bg-white p-6 rounded-[32px] border border-md-outline/10 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700 text-2xl mb-4 group-hover:scale-110 transition-transform">
                🌍
              </div>
              <div>
                <h3 className="text-xl font-black text-md-on-surface mb-1">Explore Map</h3>
                <p className="text-xs text-md-on-surface-variant font-medium">See live stats in your neighborhood.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-md-surface min-h-screen">
      {/* Hero Section - M3 Centered Display */}
      <section className="max-w-[1200px] mx-auto px-6 pt-24 pb-20 flex flex-col items-center text-center">
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-[52px] md:text-[88px] font-black tracking-tight text-md-on-surface leading-[1.05] mb-8">
            Water governance. <br />
            <span className="text-md-primary italic">Perfected.</span>
          </h1>
          <p className="text-[18px] md:text-[22px] text-md-on-surface-variant font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            The next generation of community water management. Structured, powerful, and built for modern infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/report"
              className="h-14 px-10 bg-md-primary text-white rounded-full font-black text-[15px] flex items-center justify-center shadow-md hover:shadow-lg hover:bg-md-primary/90 transition-all active:scale-95"
            >
              Report Infrastructure Issue
            </Link>
            <Link
              to="/dashboard"
              className="h-14 px-10 bg-md-secondary-container text-md-on-secondary-container rounded-full font-black text-[15px] flex items-center justify-center hover:bg-md-secondary-container/80 transition-all active:scale-95"
            >
              View System Analytics
            </Link>
          </div>
        </div>
      </section>

      {/* M3 Feature Cards - Grid Layout */}
      <section className="max-w-[1240px] mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* M3 Elevated Card */}
          <div className="md:col-span-12 lg:col-span-8 bg-white rounded-[28px] p-10 shadow-md-1 hover:shadow-md-2 transition-all flex flex-col md:flex-row items-center gap-10 overflow-hidden group">
            <div className="flex-1 z-10">
              <span className="text-md-primary font-black uppercase tracking-[0.2em] text-[11px] mb-4 block">System Core</span>
              <h2 className="text-4xl font-black text-md-on-surface mb-6 leading-tight">Live transparency for every citizen.</h2>
              <p className="text-md-on-surface-variant text-[16px] font-medium leading-relaxed mb-8">
                View resolved issues, tracking progress, and area health metrics on a high-precision interactive map.
              </p>
              <Link to="/dashboard" className="text-md-primary font-black text-[14px] uppercase tracking-widest hover:underline flex items-center gap-2">
                Explore The Data
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="flex-1 relative h-64 w-full">
              <div className="absolute inset-0 bg-md-primary/5 rounded-[24px] border-2 border-dashed border-md-primary/10 flex items-center justify-center text-6xl">📊</div>
            </div>
          </div>

          {/* M3 Tonal Card */}
          <div className="md:col-span-6 lg:col-span-4 bg-md-secondary-container rounded-[28px] p-10 text-md-on-secondary-container flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-md-on-secondary-container/60 font-black uppercase tracking-widest text-[11px] mb-4 block">Engineered for Speed</span>
              <h2 className="text-3xl font-black mb-6 leading-tight">Fastest intake ever.</h2>
            </div>
            <p className="text-md-on-secondary-container/80 text-[15px] font-medium leading-relaxed mb-8">
              Optimized for rapid response. Report a structural problem in under 30 seconds with automated location indexing.
            </p>
            <div className="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center text-2xl">⚡️</div>
          </div>

          {/* M3 Outlined Cards */}
          {[
            { tag: "Precision", title: "Automated GPS", desc: "Coordinates are gathered directly from hardware for absolute accuracy.", icon: "📍" },
            { tag: "Intelligence", title: "ML Priority", desc: "Our engine analyzes urgency to ensure critical supply issues are first.", icon: "🧠" },
            { tag: "Communication", title: "Direct Sync", desc: "Nofications trigger at every stage of the repair lifecycle.", icon: "✉️" }
          ].map((feat, i) => (
            <div key={i} className="md:col-span-4 border border-md-outline/20 rounded-[28px] p-8 hover:bg-md-primary-container/20 transition-all group">
              <div className="w-12 h-12 bg-md-surface-variant rounded-full flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform">{feat.icon}</div>
              <span className="text-md-primary font-black uppercase tracking-[0.1em] text-[10px] mb-2 block">{feat.tag}</span>
              <h3 className="text-xl font-black mb-3 text-md-on-surface">{feat.title}</h3>
              <p className="text-md-on-surface-variant text-[14px] font-medium leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Section - M3 Surface Layout */}
      <section className="bg-md-surface-variant/20 py-32 text-center px-6 border-y border-md-outline/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[32px] md:text-[44px] font-black text-md-on-surface leading-tight mb-8">
            "The infrastructure has never been this accessible. WaterSys is the definitive standard."
          </h2>
          <p className="text-md-primary font-black uppercase tracking-[0.2em] text-[12px]">— Sarah Jenkins, Executive Director</p>
        </div>
      </section>

      {/* Final CTA - M3 Large Surface */}
      <section className="bg-md-surface pb-40 pt-20 px-6 text-center">
        <div className="max-w-5xl mx-auto bg-md-primary-container rounded-[32px] p-16 md:p-24 border border-md-outline/10 overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-[44px] md:text-[72px] font-black text-md-on-primary-container mb-8 tracking-tight">Standardize impact.</h2>
            <p className="text-[18px] md:text-[21px] text-md-on-primary-container/70 font-bold mb-14 max-w-2xl mx-auto">
              Join thousands of neighbors securing our community infrastructure, one report at a time.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="h-14 px-12 bg-md-on-primary-container !text-white rounded-full font-black text-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                Onboard System
              </Link>
              <Link
                to="/report"
                className="h-14 px-12 bg-white text-md-on-primary-container rounded-full font-black text-lg flex items-center justify-center border border-md-outline/10 hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
              >
                File Report
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
