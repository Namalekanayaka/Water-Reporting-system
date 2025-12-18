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
            default: return 'bg-gray-50 text-gray-400';
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
        <div className="w-full bg-[#fbfbfd] min-h-screen p-6 md:p-12">
            <div className="max-w-[1240px] mx-auto">
                {/* Clean Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div className="animate-in fade-in slide-in-from-left-4 duration-700">
                        <h1 className="text-[40px] md:text-[56px] font-black tracking-tight text-gray-900 leading-none">
                            My Reports.
                        </h1>
                        <p className="text-[19px] text-gray-400 font-medium mt-4">Track the status of your community impact.</p>
                    </div>
                    <Link
                        to="/report"
                        className="px-10 py-5 bg-gray-900 hover:bg-black !text-white rounded-full font-black text-[15px] transition-all active:scale-95 shadow-lg shadow-gray-200 inline-flex items-center gap-2"
                    >
                        <span>New Report</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                    </Link>
                </div>

                {/* Filters Row - Ultra Minimalist */}
                <div className="flex flex-col md:flex-row gap-4 mb-12">
                    <div className="flex-1 relative group">
                        <input
                            type="text"
                            placeholder="Find a report..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-white border border-transparent focus:border-gray-200 rounded-3xl font-medium outline-none transition-all shadow-apple hover:shadow-apple-hover"
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-water-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-6 py-4 bg-white border border-transparent rounded-3xl font-bold text-gray-600 outline-none shadow-apple appearance-none cursor-pointer hover:shadow-apple-hover transition-all pr-12 relative"
                        style={{ backgroundImage: 'url(\'data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%22%20%220%22%20%2224%22%20%2224%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M7%2010L12%2015L17%2010%22%20stroke%3D%22%236e6e73%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E\')', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.5rem center' }}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">Processing</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>

                {/* Grid Section */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse bg-white rounded-[40px] h-64 shadow-apple border border-gray-50/50"></div>
                        ))}
                    </div>
                ) : filteredReports.length === 0 ? (
                    <div className="bg-white rounded-[40px] p-20 text-center shadow-apple border border-gray-50/50 animate-in fade-in zoom-in-95 duration-700">
                        <div className="text-6xl mb-8">🔍</div>
                        <h3 className="text-[28px] font-black text-gray-900 mb-4">No reports found.</h3>
                        <p className="text-[17px] text-gray-400 font-medium mb-12 max-w-sm mx-auto">
                            Start making an impact by reporting your first water issue today.
                        </p>
                        <Link
                            to="/report"
                            className="inline-block px-12 py-5 bg-water-600 hover:bg-[#0077ed] !text-white rounded-full font-black text-[15px] transition-all active:scale-95 shadow-lg"
                        >
                            Get Started
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredReports.map((report, i) => (
                            <div
                                key={report.id}
                                className="bg-white rounded-[40px] p-10 shadow-apple hover:shadow-apple-hover transition-all border border-gray-50/50 flex flex-col group animate-in fade-in slide-in-from-bottom-4 duration-500"
                                style={{ animationDelay: `${i * 50}ms` }}
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest ${getStatusStyles(report.status)}`}>
                                        {report.status.replace('_', ' ')}
                                    </span>
                                    <span className="text-[12px] text-gray-300 font-bold uppercase tracking-widest">#{report.id.slice(0, 8)}</span>
                                </div>

                                <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight capitalize leading-tight">
                                    {report.type.replace('_', ' ')}
                                </h3>

                                <div className="space-y-4 mb-10 flex-1">
                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 text-gray-300 mt-1">📍</div>
                                        <p className="text-[15px] text-gray-500 font-medium leading-relaxed line-clamp-2">{report.location.address}</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 text-gray-300 mt-1">📝</div>
                                        <p className="text-[14px] text-gray-400 font-medium leading-relaxed line-clamp-3 italic">"{report.description}"</p>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
                                    <span className="text-[12px] text-gray-300 font-bold uppercase tracking-widest">
                                        {formatDate(report.createdAt)}
                                    </span>
                                    <Link
                                        to={`/report/${report.id}`}
                                        className="text-[14px] font-black text-water-600 hover:underline inline-flex items-center gap-1"
                                    >
                                        Details
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
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
