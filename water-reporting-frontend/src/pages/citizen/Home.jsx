import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getUserReports, getAllReports } from "../../services/api/reports";

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // State for real data
  const [userReportCount, setUserReportCount] = useState(0);
  const [activeIssueCount, setActiveIssueCount] = useState(0);
  const [criticalCount, setCriticalCount] = useState(0);
  const [areaHealth, setAreaHealth] = useState(94); // Default strong starting point

  // Redirect Authority Users to their Dashboard immediately
  useEffect(() => {
    if (isAuthenticated && user?.role === 'authority') {
      navigate('/authority/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Fetch Real Data
  useEffect(() => {
    const fetchHomeData = async () => {
      if (!isAuthenticated) return;

      try {
        // 1. Get User Reports
        const userRes = await getUserReports();
        if (userRes.success) {
          setUserReportCount(userRes.reports.length);
        }

        // 2. Get Global Active Reports (for Area Health & Active Issues context)
        const globalRes = await getAllReports();
        if (globalRes.success) {
          const active = globalRes.reports.filter(r => r.status !== 'resolved' && r.status !== 'closed');
          setActiveIssueCount(active.length);

          const critical = active.filter(r => r.priority === 'critical');
          setCriticalCount(critical.length);

          // Simple algorithm for area health: 100 - (active_issues * 2), min 50
          const calculatedHealth = Math.max(50, 100 - (active.length * 2));
          setAreaHealth(calculatedHealth);
        }
      } catch (error) {
        console.error("Home Data Fetch Error:", error);
      }
    };
    fetchHomeData();
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return (
      <div className="w-full bg-md-surface p-4 md:p-6 lg:p-8 min-h-screen flex flex-col">
        {/* Header - Compact */}
        <div className="shrink-0 mb-8 flex items-end justify-between">
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

        {/* Top Row: Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-md-secondary-container/20 p-6 rounded-[24px] border border-md-secondary-container/10 flex flex-col justify-center transition-all hover:bg-md-secondary-container/30">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-md-on-surface-variant font-bold uppercase tracking-wider text-[10px]">My Contribution</h3>
              <span className="text-xl">🤝</span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-black text-md-on-surface">{userReportCount}</p>
              <span className="text-sm font-medium text-md-on-surface-variant">reports</span>
            </div>
            <p className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded w-fit mt-3">Helping community</p>
          </div>

          <div className="bg-md-primary-container/20 p-6 rounded-[24px] border border-md-primary-container/10 flex flex-col justify-center transition-all hover:bg-md-primary-container/30">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-md-on-surface-variant font-bold uppercase tracking-wider text-[10px]">Area Health</h3>
              <span className="text-xl">❤️</span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-black text-md-on-surface">{areaHealth}%</p>
              <span className="text-sm font-medium text-md-on-surface-variant">score</span>
            </div>
            <p className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded w-fit mt-3">Live Index</p>
          </div>

          <div className="bg-orange-50 p-6 rounded-[24px] border border-orange-100 flex flex-col justify-center transition-all hover:bg-orange-100/50">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-orange-800/70 font-bold uppercase tracking-wider text-[10px]">Active Issues</h3>
              <span className="text-xl">⚠️</span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-black text-orange-900">{activeIssueCount}</p>
              <span className="text-sm font-medium text-orange-800/60">open</span>
            </div>
            <p className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-1 rounded w-fit mt-3">{criticalCount} Critical</p>
          </div>
        </div>

        {/* Main Content: Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          {/* Primary Action - Medium Area (6 Cols) */}
          <Link to="/report" className="lg:col-span-6 bg-sky-100 text-sky-900 p-8 rounded-[32px] shadow-lg hover:shadow-xl transition-all group relative overflow-hidden flex flex-col justify-between min-h-[260px]">
            <div className="relative z-10 max-w-lg">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                +
              </div>
              <h3 className="text-3xl font-black mb-3">Report Issue</h3>
              <p className="text-sky-900/80 font-medium text-base leading-relaxed">
                Spot a leak, quality concern, or supply disruption? <br />
                File it in seconds with our precision tool.
              </p>
            </div>

            <div className="relative z-10 mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
              <span>Start Report</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" /></svg>
            </div>

            <div className="absolute right-0 bottom-0 w-80 h-80 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
            <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl font-black rotate-12 pointer-events-none">
              !
            </div>
          </Link>

          {/* Secondary Stack (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <Link to="/my-reports" className="flex-1 bg-white p-8 rounded-[32px] border border-md-outline/10 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between min-h-[160px]">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-black text-md-on-surface mb-2">Track Progress</h3>
                  <p className="text-sm text-md-on-surface-variant font-medium">View updates on your {userReportCount} reports.</p>
                </div>
                <div className="w-12 h-12 bg-md-secondary-container rounded-2xl flex items-center justify-center text-md-on-secondary-container text-2xl group-hover:rotate-12 transition-transform">
                  📋
                </div>
              </div>
              <div className="mt-4 flex gap-1">
                <span className="h-1.5 w-full bg-emerald-500 rounded-full"></span>
                <span className="h-1.5 w-full bg-emerald-500 rounded-full"></span>
                <span className="h-1.5 w-full bg-gray-200 rounded-full"></span>
              </div>
            </Link>

            <Link to="/area-health" className="flex-1 bg-white p-8 rounded-[32px] border border-md-outline/10 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between min-h-[160px]">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-black text-md-on-surface mb-2">Explore Map</h3>
                  <p className="text-sm text-md-on-surface-variant font-medium">See live stats in your area.</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-700 text-2xl group-hover:scale-110 transition-transform">
                  🌍
                </div>
              </div>
              <div className="mt-4 relative h-12 w-full bg-blue-50 rounded-xl overflow-hidden">
                <div className="absolute inset-0 opacity-30 bg-[url('https://boofcv.org/images/thumb/3/35/Example_rendered_map.png/400px-Example_rendered_map.png')] bg-cover"></div>
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
      {/* Hero Section - M3 Split Layout with Visual */}
      <section className="max-w-[1400px] mx-auto px-6 pt-12 pb-20 lg:pt-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left Content (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-md-primary-container/30 text-md-primary text-sm font-bold uppercase tracking-wider mb-8 border border-md-primary-container/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-md-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-md-primary"></span>
              </span>
              System Live in Colombo
            </div>

            <h1 className="text-[56px] md:text-[80px] lg:text-[92px] font-black tracking-tighter text-md-on-surface leading-[0.95] mb-8">
              Water governance. <br />
              <span className="text-md-primary">Perfected.</span>
            </h1>

            <p className="text-[18px] md:text-[20px] text-md-on-surface-variant font-medium mb-12 max-w-xl leading-relaxed">
              The definitive platform for community infrastructure tracking.
              Report leaks, monitor quality, and see real-time resolution data.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                to="/report"
                className="h-16 px-10 bg-md-primary text-white rounded-full font-black text-[16px] flex items-center justify-center shadow-lg hover:shadow-xl hover:translate-y-[-2px] hover:bg-md-primary/95 transition-all text-nowrap"
              >
                Start Report
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" /></svg>
              </Link>
              <Link
                to="/dashboard"
                className="h-16 px-10 bg-white text-md-on-surface rounded-full font-black text-[16px] flex items-center justify-center border border-md-outline/10 hover:bg-gray-50 hover:border-md-outline/30 transition-all text-nowrap"
              >
                View Live Map
              </Link>
            </div>
          </div>

          {/* Right Visual (5 Cols) - Abstract App Preview */}
          <div className="lg:col-span-5 relative hidden lg:block h-[600px]">
            {/* Decorative Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-md-primary-container/40 to-white/0 rounded-full blur-3xl opacity-60"></div>

            {/* Floating Cards Mockup */}
            <div className="relative h-full w-full perspective-1000">
              {/* Card 1: Map Preview */}
              <div className="absolute top-10 right-0 w-[90%] bg-white p-4 rounded-[32px] shadow-2xl border border-md-outline/5 rotate-[-6deg] hover:rotate-0 transition-transform duration-700 z-10">
                <div className="h-48 bg-slate-100 rounded-[24px] overflow-hidden relative">
                  <div className="absolute inset-0 opacity-40 bg-[url('https://boofcv.org/images/thumb/3/35/Example_rendered_map.png/400px-Example_rendered_map.png')] bg-cover"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-md-primary rounded-full shadow-lg border-4 border-white"></div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">
                    📍 12 Active Reports
                  </div>
                </div>
                <div className="mt-4 flex gap-3 items-center px-2 pb-2">
                  <div className="w-10 h-10 rounded-full bg-md-primary/10 flex items-center justify-center text-md-primary font-bold">A</div>
                  <div>
                    <div className="h-2 w-24 bg-slate-200 rounded mb-1.5"></div>
                    <div className="h-2 w-16 bg-slate-100 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Card 2: Status Alert */}
              <div className="absolute bottom-20 left-0 w-[80%] bg-md-surface-variant p-6 rounded-[32px] shadow-xl border border-white/50 rotate-[3deg] hover:rotate-0 transition-transform duration-700 z-20 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">System Update</span>
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                </div>
                <h3 className="text-xl font-black mb-2">Leak Resolved</h3>
                <div className="flex items-center gap-2 text-sm opacity-80 mb-4">
                  <span>✅ Main St. Pipe fixed</span>
                </div>
                <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-green-500"></div>
                </div>
              </div>
            </div>
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
