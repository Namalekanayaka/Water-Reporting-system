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
            case 'pending': return 'bg-orange-50 text-orange-600';
            case 'in_progress': return 'bg-blue-50 text-blue-600';
            case 'resolved': return 'bg-emerald-50 text-emerald-600';
            case 'closed': return 'bg-gray-100 text-gray-500';
            case 'pending': return 'bg-md-secondary-container text-md-on-secondary-container';
            case 'in_progress': return 'bg-md-primary-container text-md-on-primary-container';
            case 'resolved': return 'bg-md-primary text-md-on-primary';
            case 'closed': return 'bg-md-surface-variant text-md-on-surface-variant';
            default: return 'bg-md-surface-variant/40 text-md-on-surface-variant';
        }
    };

    const filteredReports = reports.filter(report => {
        const matchesFilter = filter === 'all' || report.status === filter;
        const matchesSearch =
            report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.location.address.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="w-full bg-md-surface min-h-screen">
            <div className="max-w-[1240px] mx-auto py-12 md:py-20 px-6">
                {/* M3 Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 px-2">
                    <div className="animate-in fade-in slide-in-from-left-4 duration-700">
                        <span className="text-md-primary font-black uppercase tracking-[0.2em] text-[11px] mb-3 block">Personal Impact</span>
                        <h1 className="text-[40px] md:text-[64px] font-black tracking-tight text-md-on-surface leading-none">
                            My Reports.
                        </h1>
                        <p className="text-[19px] text-md-on-surface-variant font-medium mt-4">Trace your historical contributions to the community health.</p>
                    </div>
                    <Link
                        to="/report"
                        className="h-16 px-10 bg-md-primary text-white rounded-full font-black text-[15px] flex items-center gap-3 shadow-md hover:shadow-lg transition-all active:scale-95"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                        New Report
                    </Link>
                </div>

                {/* M3 Filters Bar */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 px-2">
                    <div className="flex-1 relative group">
                        <input
                            type="text"
                            placeholder="Search reports by ID or detail..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-16 pl-14 pr-6 bg-md-surface-variant/30 border border-md-outline/10 focus:border-md-primary rounded-[28px] font-medium text-md-on-surface outline-none transition-all shadow-sm"
                        />
                        <svg className="w-6 h-6 text-md-on-surface-variant absolute left-5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <div className="relative">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="h-16 px-8 bg-md-surface-variant/30 border border-md-outline/10 rounded-[28px] font-black text-[14px] text-md-on-surface-variant outline-none cursor-pointer appearance-none min-w-[180px]"
                        >
                            <option value="all">Global Filter</option>
                            <option value="pending">Pending Scan</option>
                            <option value="in_progress">Active Process</option>
                            <option value="resolved">Resolved Case</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-md-on-surface-variant">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>

                {/* Grid Section */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse bg-md-surface-variant/10 rounded-[32px] h-72 border border-md-outline/5"></div>
                        ))}
                    </div>
                ) : filteredReports.length === 0 ? (
                    <div className="bg-md-surface-variant/5 rounded-[40px] p-24 text-center border-2 border-dashed border-md-outline/10 animate-in fade-in zoom-in-95 duration-700">
                        <div className="text-7xl mb-10 opacity-40">🗳️</div>
                        <h3 className="text-[32px] font-black text-md-on-surface mb-6">Database Empty</h3>
                        <p className="text-[18px] text-md-on-surface-variant font-medium mb-12 max-w-sm mx-auto">
                            No active records match your criteria. Begin documenting community issues now.
                        </p>
                        <Link
                            to="/report"
                            className="inline-flex px-14 py-5 bg-md-primary text-white rounded-full font-black text-[15px] shadow-md hover:shadow-lg transition-all active:scale-95"
                        >
                            Log First Submission
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredReports.map((report, i) => (
                            <div
                                key={report.id}
                                className="bg-white rounded-[32px] p-10 shadow-md-1 hover:shadow-md-2 transition-all border border-md-outline/5 flex flex-col group animate-in fade-in slide-in-from-bottom-4 duration-500"
                                style={{ animationDelay: `${i * 50}ms` }}
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] ${getStatusStyles(report.status)} shadow-sm`}>
                                        {report.status.replace('_', ' ')}
                                    </span>
                                    <span className="text-[11px] text-md-on-surface-variant/40 font-bold uppercase tracking-[0.2em]">S-ID: {report.id.slice(0, 8)}</span>
                                </div>

                                <h3 className="text-[22px] font-black text-md-on-surface mb-4 tracking-tight capitalize leading-tight">
                                    {report.type.replace('_', ' ')}
                                </h3>

                                <div className="space-y-4 mb-10 flex-1">
                                    <div className="flex items-start gap-3">
                                        <span className="text-lg opacity-50">📍</span>
                                        <p className="text-[15px] text-md-on-surface-variant font-medium leading-relaxed line-clamp-2">{report.location.address}</p>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 bg-md-surface-variant/10 rounded-[20px] border border-md-outline/5">
                                        <p className="text-[14px] text-md-on-surface-variant/70 font-medium leading-relaxed line-clamp-3 italic">
                                            "{report.description}"
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-md-outline/5 flex items-center justify-between">
                                    <span className="text-[12px] text-md-on-surface-variant/40 font-bold uppercase tracking-widest leading-none">
                                        {formatDate(report.createdAt)}
                                    </span>
                                    <Link
                                        to={`/report/${report.id}`}
                                        className="h-10 px-6 bg-md-surface-variant/20 hover:bg-md-primary/10 text-md-primary rounded-full font-black text-[12px] flex items-center gap-2 transition-all active:scale-95"
                                    >
                                        Inspect
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyReports;
