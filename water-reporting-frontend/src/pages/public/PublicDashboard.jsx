import React from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/dashboard/StatCard';
import ReportCard from '../../components/reports/ReportCard';
import IssueTypeChart from '../../components/charts/BarChart';
import TrendChart from '../../components/charts/TimeSeriesChart';
import {
    mockStats,
    mockIssueTypes,
    mockRecentReports,
    mockTrendData,
    mockRegionalData,
} from '../../data/mockData';

const PublicDashboard = () => {
    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-1">
                            Dashboard
                        </h1>
                        <p className="text-gray-500">
                            Real-time overview of water issues in our community
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            to="/report"
                            className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
                        >
                            Add Report
                        </Link>
                        <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                            Export Data
                        </button>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-4 gap-5 mb-8">
                <StatCard
                    title="Total Reports"
                    value={mockStats.totalReports}
                    icon="📊"
                    color="green"
                    subtitle="All time"
                    trend={12}
                />
                <StatCard
                    title="Resolved Issues"
                    value={mockStats.resolvedReports}
                    icon="✅"
                    color="green"
                    subtitle={`${Math.round((mockStats.resolvedReports / mockStats.totalReports) * 100)}% resolution rate`}
                    trend={8}
                />
                <StatCard
                    title="Active Issues"
                    value={mockStats.activeReports}
                    icon="⚠️"
                    color="orange"
                    subtitle="Being addressed"
                    trend={-5}
                />
                <StatCard
                    title="Critical Issues"
                    value={mockStats.criticalReports}
                    icon="🔴"
                    color="purple"
                    subtitle="Needs urgent attention"
                    trend={-15}
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-5 mb-8">
                <IssueTypeChart data={mockIssueTypes} />
                <TrendChart data={mockTrendData} />
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-3 gap-5">
                {/* Recent Reports - 2 columns */}
                <div className="col-span-2">
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-gray-800">
                                Recent Reports
                            </h2>
                            <Link
                                to="/map"
                                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                            >
                                View All →
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {mockRecentReports.slice(0, 5).map((report) => (
                                <ReportCard key={report.id} report={report} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Regional Overview - 1 column */}
                <div>
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-800 mb-5">
                            Regional Status
                        </h2>
                        <div className="space-y-3">
                            {mockRegionalData.map((region) => (
                                <div
                                    key={region.region}
                                    className="bg-gray-50 border border-gray-200 rounded-xl p-3 hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800 text-sm">
                                                {region.region}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {region.reports} reports
                                            </p>
                                        </div>
                                        <div className="text-2xl">
                                            {region.severity === 'low' && '🟢'}
                                            {region.severity === 'medium' && '🟡'}
                                            {region.severity === 'high' && '🟠'}
                                            {region.severity === 'critical' && '🔴'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link
                            to="/map"
                            className="mt-4 block w-full text-center py-2.5 bg-emerald-600 text-white rounded-xl font-medium text-sm hover:bg-emerald-700 transition-colors"
                        >
                            View Full Map
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicDashboard;
