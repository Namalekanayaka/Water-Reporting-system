import React from 'react';

const ReportIssue = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Report Issue
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Submit a new water-related issue for your area.
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-card border border-slate-100 dark:border-slate-700">
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Issue Format
                            </label>
                            <select className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-water-500/20 focus:border-water-500 outline-none transition-all">
                                <option>Pipeline Leakage</option>
                                <option>Low Pressure</option>
                                <option>Water Quality</option>
                                <option>No Water Supply</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Priority Level
                            </label>
                            <select className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-water-500/20 focus:border-water-500 outline-none transition-all">
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Critical</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Location
                        </label>
                        <input
                            type="text"
                            placeholder="Enter street address or area"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-water-500/20 focus:border-water-500 outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Description
                        </label>
                        <textarea
                            rows="4"
                            placeholder="Describe the issue in detail..."
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-water-500/20 focus:border-water-500 outline-none transition-all resize-none"
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-8 py-3 bg-water-600 hover:bg-water-700 text-white font-semibold rounded-xl shadow-lg shadow-water-900/10 transition-colors"
                        >
                            Submit Report
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportIssue;
