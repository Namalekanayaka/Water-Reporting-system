import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-white/10 backdrop-blur-xl rounded-3xl text-white shadow-glass border border-white/20">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Report Water Issues in Your Community
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-water-50">
          AI-powered platform for real-time water issue reporting, tracking, and
          management. Help your community access clean water.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/report"
            className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-colors shadow-md border border-white/30"
          >
            Report an Issue
          </Link>
          <Link
            to="/dashboard"
            className="px-8 py-4 bg-water-600/40 backdrop-blur-sm hover:bg-water-600/60 text-white rounded-xl font-semibold transition-colors shadow-md border border-water-500/30"
          >
            View Dashboard
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-glass hover:shadow-glass transition-shadow border border-white/20">
          <div className="text-4xl font-bold text-water-600 dark:text-water-400 mb-2">
            1,234
          </div>
          <div className="text-slate-600 dark:text-slate-400 font-medium">
            Total Reports
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-card hover:shadow-hover transition-shadow">
          <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
            892
          </div>
          <div className="text-slate-600 dark:text-slate-400 font-medium">
            Resolved Issues
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-card hover:shadow-hover transition-shadow">
          <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
            342
          </div>
          <div className="text-slate-600 dark:text-slate-400 font-medium">
            Active Reports
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-glass hover:shadow-glass transition-all border border-white/20">
            <div className="text-5xl mb-4">📍</div>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
              Report Issues
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Submit water problems with location, photos, and details. AI
              predicts severity.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-card hover:shadow-hover transition-all">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
              Track Progress
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Monitor reports in real-time with interactive maps and analytics
              dashboards.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-card hover:shadow-hover transition-all">
            <div className="text-5xl mb-4">🏛️</div>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
              Get Solutions
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Authorities receive prioritized alerts and AI-powered resource
              allocation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-water-600/20 backdrop-blur-xl p-12 rounded-3xl text-center shadow-glass border border-water-500/20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Join the Movement for Clean Water
        </h2>
        <p className="text-water-50 dark:text-water-200 mb-6 max-w-2xl mx-auto text-lg">
          Aligned with UN Sustainable Development Goal 6: Clean Water and
          Sanitation for All
        </p>
        <Link
          to="/register"
          className="inline-block px-8 py-4 bg-white text-water-600 rounded-lg font-semibold hover:bg-water-50 transition-colors shadow-md"
        >
          Get Started Today
        </Link>
      </section>
    </div>
  );
};

export default Home;
