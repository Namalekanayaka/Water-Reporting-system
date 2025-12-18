import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full p-6 max-w-7xl mx-auto space-y-12">
      {/* Hero Section */}
      <section className="bg-white rounded-3xl p-8 lg:p-16 shadow-sm border border-gray-100 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
        <div className="flex-1 text-left z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-water-50 text-water-700 rounded-full text-sm font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-water-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-water-600"></span>
            </span>
            Live Community Monitoring
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
            Every Drop <span className="text-water-600">Counts.</span> Every Report <span className="text-water-600">Matters.</span>
          </h1>
          <p className="text-lg lg:text-xl mb-10 max-w-xl text-gray-600 leading-relaxed">
            Empowering citizens to report water issues and helping authorities respond with lightning speed. Track your impact on community water health in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/report"
              className="px-10 py-4 bg-water-600 hover:bg-water-700 !text-white rounded-2xl font-bold transition-all shadow-lg shadow-water-200 text-center scale-100 hover:scale-105"
            >
              Report Water Issue
            </Link>
            <Link
              to="/dashboard"
              className="px-10 py-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-2xl font-bold transition-all border border-gray-200 text-center scale-100 hover:scale-105"
            >
              Live Dashboard
            </Link>
          </div>
        </div>
        <div className="flex-1 relative">
          <img
            src="/water_reporting_hero_1766035001067.png"
            alt="Water Reporting Hero"
            className="w-full max-w-lg mx-auto drop-shadow-2xl animate-float"
          />
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-water-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Reports", value: "2,840", icon: "📊", color: "bg-water-50", text: "text-water-700", trend: "+12% this month" },
          { label: "Resolved Today", value: "48", icon: "✅", color: "bg-emerald-50", text: "text-emerald-700", trend: "Fastest response: 2h" },
          { label: "Critical Issues", value: "12", icon: "⚠️", color: "bg-orange-50", text: "text-orange-700", trend: "High priority" },
          { label: "Citizens Engaged", value: "5,200", icon: "👥", color: "bg-blue-50", text: "text-blue-700", trend: "Growing community" }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-water-200 transition-all hover:shadow-md group">
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <h3 className="text-sm font-semibold text-gray-500 mb-1">{stat.label}</h3>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className={`text-xs font-medium ${stat.text}`}>{stat.trend}</div>
          </div>
        ))}
      </section>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Recent Community Reports</h2>
              <Link to="/dashboard" className="text-water-600 font-bold hover:underline text-sm">View All</Link>
            </div>
            <div className="space-y-4">
              {[
                { type: "Pipeline Leakage", location: "Colombo 03", time: "2 hours ago", status: "In Progress", statusColor: "text-blue-600 bg-blue-50" },
                { type: "Water Quality", location: "Kandy Central", time: "5 hours ago", status: "Resolved", statusColor: "text-emerald-600 bg-emerald-50" },
                { type: "No Supply", location: "Galle Fort", time: "Yesterday", status: "Critical", statusColor: "text-red-600 bg-red-50" },
                { type: "Low Pressure", location: "Negombo Road", time: "2 days ago", status: "Pending", statusColor: "text-orange-600 bg-orange-50" }
              ].map((report, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-all group cursor-default">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-water-100 transition-colors">
                      💧
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{report.type}</h4>
                      <p className="text-sm text-gray-500">{report.location} • {report.time}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${report.statusColor}`}>
                    {report.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-water-600 to-blue-700 rounded-3xl p-10 shadow-lg text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Together we are saving <span className="text-blue-200 underline decoration-2">2.5M liters</span> every month.</h2>
              <p className="text-water-50 mb-8 max-w-lg opacity-90 leading-relaxed text-lg italic">
                "Since joining the platform, my neighborhood reported 12 leaks that were fixed within 48 hours. The transparency is unlike anything we've seen before."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border-2 border-white/50 bg-gray-200 overflow-hidden">
                  <img src="https://ui-avatars.com/api/?name=Arshad+Khan&background=random" alt="User" />
                </div>
                <div>
                  <div className="font-bold">Arshad Khan</div>
                  <div className="text-xs text-water-100 font-medium uppercase tracking-wider">Community Lead, Colombo</div>
                </div>
              </div>
            </div>
            {/* Visual background decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
          </div>
        </section>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">How It Works</h2>
            <div className="space-y-8">
              {[
                { step: "01", title: "Spot & Snap", desc: "Notice a water leak or supply issue? Take a quick photo.", color: "bg-blue-500" },
                { step: "02", title: "Auto-Locate", desc: "Our map pinpoints your location instantly for authorities.", color: "bg-water-500" },
                { step: "03", title: "Track Progress", desc: "Watch in real-time as your report moves to resolution.", color: "bg-emerald-500" }
              ].map((item, i) => (
                <div key={i} className="relative pl-12">
                  <div className={`absolute left-0 top-0 w-8 h-8 ${item.color} rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg`}>
                    {item.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <Link to="/report" className="mt-8 block w-full py-4 bg-gray-900 !text-white text-center rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl">
              Start Reporting
            </Link>
          </section>

          <section className="bg-slate-900 rounded-3xl p-8 shadow-sm text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-4">Report via WhatsApp</h2>
              <p className="text-sm text-slate-400 mb-6">Send a photo and location link to our automated AI bot for instant filing.</p>
              <a href="#" className="flex items-center justify-center gap-2 py-3 bg-emerald-500 !text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-900/20">
                <span>WhatsApp Help</span>
              </a>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl"></div>
          </section>
        </div>
      </div>

      {/* Trust Badges / Partners */}
      <section className="py-12 border-t border-gray-100 text-center">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-8">Trusted by National Authorities & International Org</p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all">
          <div className="text-xl font-black text-slate-800 tracking-tighter italic">NWSDB</div>
          <div className="text-xl font-black text-slate-800 tracking-tighter italic">UN-WATER</div>
          <div className="text-xl font-black text-slate-800 tracking-tighter italic">WATERAID</div>
          <div className="text-xl font-black text-slate-800 tracking-tighter italic">WORLD BANK</div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="bg-water-600 rounded-[3rem] p-12 lg:p-20 text-center shadow-2xl shadow-water-200 overflow-hidden relative">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
            Ready to make a difference in your community?
          </h2>
          <p className="text-water-100 mb-10 text-lg lg:text-xl opacity-90">
            Join 12,000+ citizens who have already submitted reports this year. Your eyes on the ground can save millions of liters of clean water.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/register"
              className="px-12 py-5 bg-white !text-water-600 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all shadow-xl scale-100 hover:scale-105"
            >
              Sign Up for Free
            </Link>
            <Link
              to="/map"
              className="px-12 py-5 bg-water-500 !text-white rounded-2xl font-black text-lg hover:bg-water-400 transition-all shadow-xl scale-100 hover:scale-105 border border-white/20"
            >
              Live Heatmap
            </Link>
          </div>
        </div>
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      </section>
    </div>
  );
};

export default Home;
