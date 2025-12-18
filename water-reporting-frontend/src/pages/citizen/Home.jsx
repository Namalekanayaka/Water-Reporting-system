import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full bg-[#fbfbfd] min-h-screen">
      {/* Hero Section - Apple Lifestyle Aesthetic */}
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-16 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-[56px] lg:text-[80px] font-black tracking-tight text-gray-900 leading-[1.05] mb-8">
            Superior water care. <br />
            <span className="text-water-600">Purely digital.</span>
          </h1>
          <p className="text-[21px] lg:text-[24px] text-gray-500 font-medium mb-10 max-w-xl leading-relaxed">
            Leading the way in community water management. Fast, transparent, and built for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <Link
              to="/report"
              className="px-10 py-4 bg-water-600 hover:bg-[#0077ed] !text-white rounded-full font-bold text-[17px] transition-all shadow-lg active:scale-95"
            >
              Report an Issue
            </Link>
            <Link
              to="/dashboard"
              className="px-10 py-4 text-water-600 hover:underline font-bold text-[17px] inline-flex items-center gap-1"
            >
              Explore Dashboard
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex-1 animate-in fade-in zoom-in-95 duration-1000 delay-300">
          <img
            src="/water_reporting_hero_1766035001067.png"
            alt="WRS Intelligence"
            className="w-full max-w-lg mx-auto drop-shadow-[0_20px_50px_rgba(0,113,227,0.15)] animate-float"
          />
        </div>
      </section>

      {/* Grid Bento Layout - Standard Apple Feature Breakdown */}
      <section className="max-w-[1240px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Big Feature Cardio */}
          <div className="md:col-span-8 bg-white rounded-[32px] p-10 shadow-apple hover:shadow-apple-hover transition-all group overflow-hidden relative">
            <div className="relative z-10 lg:w-3/5">
              <span className="text-water-600 font-bold uppercase tracking-widest text-[13px] mb-3 block">Real-time Analytics</span>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 leading-tight">Live transparency for every citizen.</h2>
              <p className="text-gray-500 text-[17px] font-medium leading-relaxed mb-8">
                View resolved issues, tracking progress, and area health metrics on a beautiful interactive map.
              </p>
              <Link to="/dashboard" className="px-8 py-3 bg-gray-100 font-bold rounded-full hover:bg-gray-200 transition-colors inline-block">Learn more</Link>
            </div>
            <div className="absolute right-[-5%] bottom-[-10%] w-3/5 opacity-40 group-hover:opacity-60 transition-opacity">
              <img src="/logo.png" className="w-full grayscale brightness-50" style={{ transform: 'rotate(-10deg)' }} />
            </div>
          </div>

          {/* Small Feature 1 */}
          <div className="md:col-span-4 bg-gray-900 rounded-[32px] p-10 shadow-apple text-white flex flex-col justify-between">
            <div>
              <span className="text-water-400 font-bold uppercase tracking-widest text-[11px] mb-3 block">Reporting</span>
              <h2 className="text-2xl font-black mb-4 leading-tight">Fastest intake <br /> ever.</h2>
            </div>
            <p className="text-gray-400 text-[15px] font-medium leading-relaxed mb-6">
              Optimized for speed. Report a problem in under 30 seconds with intelligent location tagging.
            </p>
            <div className="text-5xl">⚡️</div>
          </div>

          {/* Small Feature 2 */}
          <div className="md:col-span-4 bg-white rounded-[32px] p-10 shadow-apple hover:shadow-apple-hover transition-all text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-3xl mb-6">📍</div>
            <h3 className="text-xl font-bold mb-3">Precise Location</h3>
            <p className="text-gray-500 text-[15px] px-2 text-center leading-relaxed">Automatic GPS coordination ensures authorities find the exact spot instantly.</p>
          </div>

          {/* Small Feature 3 */}
          <div className="md:col-span-4 bg-[#f2f2f7] rounded-[32px] p-10 shadow-apple hover:shadow-apple-hover transition-all text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm font-bold text-water-600">AI</div>
            <h3 className="text-xl font-bold mb-3">Smart Prioritization</h3>
            <p className="text-gray-500 text-[15px] px-2 text-center leading-relaxed">Our AI analyzes urgency to ensure critical supply issues are addressed first.</p>
          </div>

          {/* Small Feature 4 */}
          <div className="md:col-span-4 bg-[#eef6ff] rounded-[32px] p-10 shadow-apple hover:shadow-apple-hover transition-all text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm">✉️</div>
            <h3 className="text-xl font-bold mb-3">Instant Updates</h3>
            <p className="text-gray-500 text-[15px] px-2 text-center leading-relaxed">Get notified the moment a technician is assigned and when your issue is resolved.</p>
          </div>
        </div>
      </section>

      {/* Quote Section - Apple Style */}
      <section className="bg-white py-24 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[32px] lg:text-[48px] font-black text-gray-900 leading-tight mb-8">
            "This platform has transformed how our community interacts with water services."
          </h2>
          <div className="space-y-4">
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">— Dr. Sarah Jenkins, Municipality Lead</p>
          </div>
        </div>
      </section>

      {/* Final Call to Action - Mac Studio/iPhone Launch Style */}
      <section className="bg-white pb-32 pt-16 px-6 text-center">
        <div className="max-w-5xl mx-auto bg-gray-50/50 rounded-[48px] p-16 lg:p-24 border border-gray-100">
          <h2 className="text-[40px] lg:text-[64px] font-black text-gray-900 mb-6 tracking-tight">Community impact. <br /> Together.</h2>
          <p className="text-[19px] lg:text-[21px] text-gray-400 font-medium mb-12 max-w-2xl mx-auto">
            Join thousands of neighbors making their community better, one report at a time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="px-12 py-5 bg-gray-900 hover:bg-black !text-white rounded-full font-bold text-lg transition-transform active:scale-95"
            >
              Sign Up Now
            </Link>
            <Link
              to="/report"
              className="px-12 py-5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 rounded-full font-bold text-lg transition-transform active:scale-95"
            >
              Start Reporting
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
