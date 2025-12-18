import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full p-6 max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <section className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
          Water Reporting System
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-600">
          Report water issues in your community and help authorities respond faster.
          Track your reports and monitor water quality in real-time.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/report"
            className="px-8 py-4 bg-water-600 hover:bg-water-700 !text-white rounded-xl font-semibold transition-colors shadow-sm"
          >
            Report Water Issue
          </Link>
          <Link
            to="/dashboard"
            className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
          >
            View Public Dashboard
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-water-100 rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#20897E" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Reports Submitted</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-gray-900">1,234</span>
            <span className="text-sm text-emerald-600 mb-1">+45 this week</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Issues Resolved</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-gray-900">892</span>
            <span className="text-sm text-emerald-600 mb-1">72% success</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FB923C" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Active Water Issues</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-gray-900">342</span>
            <span className="text-sm text-orange-600 mb-1">28% pending</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-water-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#20897E" strokeWidth="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">
              Report Water Issues
            </h3>
            <p className="text-gray-600">
              Submit water problems like leaks, low pressure, or quality issues with photos and location. Quick and easy reporting.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">
              Track Your Reports
            </h3>
            <p className="text-gray-600">
              Monitor the status of your submitted reports in real-time. Get updates when authorities take action on your issue.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">
              Get Solutions Fast
            </h3>
            <p className="text-gray-600">
              Water authorities receive instant alerts and prioritize critical issues. Faster response times for your community.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-water-600 rounded-2xl p-12 text-center shadow-sm">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Help Improve Water Access in Your Community
        </h2>
        <p className="text-water-50 mb-6 max-w-2xl mx-auto text-lg">
          Join thousands of citizens reporting water issues and helping authorities respond faster. Together we can ensure clean water for everyone.
        </p>
        <Link
          to="/report"
          className="inline-block px-8 py-4 bg-white !text-water-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
        >
          Report Your First Issue
        </Link>
      </section>
    </div>
  );
};

export default Home;
