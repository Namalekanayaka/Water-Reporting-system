import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserReports } from '../../services/api/reports';
import { useNotification } from '../../context/NotificationContext';

const MyReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const { addNotification } = useNotification();

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const response = await getUserReports();
            if (response.success) {
                setReports(response.reports);
            }
        } catch (error) {
            console.error('Error fetching reports:', error);
            addNotification('Failed to load your reports. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'in_progress':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'resolved':
                return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'closed':
                return 'bg-gray-100 text-gray-700 border-gray-200';
            default:
                return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'critical':
                return 'text-red-600 font-bold';
            case 'high':
                return 'text-orange-600 font-bold';
            case 'medium':
                return 'text-blue-600 font-bold';
            default:
                return 'text-slate-600 font-bold';
        }
    };

    const filteredReports = reports.filter(report => {
        const matchesFilter = filter === 'all' || report.status === filter;
        const matchesSearch = report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.location.address.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="w-full p-6 max-w-7xl mx-auto space-y-8">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        My Reports
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Track the status of your submitted water issues.
                    </p>
                </div>
                <Link
                    to="/report"
                    className="inline-flex items-center px-6 py-3 bg-water-600 hover:bg-water-700 !text-white rounded-xl font-semibold transition-colors shadow-sm gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Report
                </Link>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Search by ID, location, or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-water-500/20 focus:border-water-500 outline-none transition-all shadow-sm"
                    />
                    <svg className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-water-500/20 focus:border-water-500 outline-none transition-all shadow-sm font-medium text-gray-700"
                >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                </select>
            </div>

            {/* Content Section */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse bg-white rounded-2xl p-6 h-64 border border-gray-100 shadow-sm"></div>
                    ))}
                </div>
            ) : filteredReports.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No reports found</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-8">
                        {reports.length === 0
                            ? "You haven't submitted any reports yet. When you report a water issue, it will appear here."
                            : "No reports match your current search or filter criteria."}
                    </p>
                    {reports.length === 0 && (
                        <Link
                            to="/report"
                            className="inline-block px-8 py-3 bg-water-600 hover:bg-water-700 !text-white rounded-xl font-semibold transition-colors shadow-sm"
                        >
                            Report First Issue
                        </Link>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredReports.map(report => (
                        <div
                            key={report.id}
                            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyles(report.status)} uppercase tracking-wider`}>
                                    {report.status.replace('_', ' ')}
                                </span>
                                <span className="text-xs text-gray-400 font-medium">
                                    #{report.id}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2 capitalize">
                                {report.type.replace('_', ' ')}
                            </h3>

                            <div className="space-y-3 mb-6 flex-1">
                                <div className="flex items-start gap-2">
                                    <svg className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <p className="text-sm text-gray-600 line-clamp-1">{report.location.address}</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <svg className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                    </svg>
                                    <p className="text-sm text-gray-600 line-clamp-2 italic">"{report.description}"</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Priority:</span>
                                    <span className={`text-sm capitalize ${getPriorityStyles(report.priority)}`}>
                                        {report.priority}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                                <span className="text-xs text-gray-400">
                                    {formatDate(report.createdAt)}
                                </span>
                                <Link
                                    to={`/report/${report.id}`}
                                    className="text-sm font-semibold text-water-600 hover:text-water-700"
                                >
                                    View Details →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyReports;
