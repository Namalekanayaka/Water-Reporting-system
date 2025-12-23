import React, { useEffect, useState } from 'react';
import StatCard from '../../components/dashboard/StatCard';
import PriorityQueue from '../../components/dashboard/PriorityQueue';
import AlertPanel from '../../components/dashboard/AlertPanel';
import ResourceAllocation from '../../components/dashboard/ResourceAllocation';
import { getAllReports } from '../../services/api/reports';
import { getTeams, getSystemAlerts, seedInitialAdminData } from '../../services/api/authority';

const AuthorityDashboard = () => {
    const [reports, setReports] = useState([]);
    const [teams, setTeams] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([
        { title: 'Total Reports', value: '0', trend: 'Live', isPositive: true, icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
        { title: 'Active Issues', value: '0', trend: 'Live', isPositive: false, icon: <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> },
        { title: 'Resolved', value: '0', trend: 'Live', isPositive: true, icon: <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { title: 'Critical', value: '0', trend: 'Alert', isPositive: false, icon: <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    ]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            // 1. Ensure DB has structure (Seeds mock data if empty)
            await seedInitialAdminData();

            // 2. Fetch All Data Parallel
            const [reportsRes, teamsRes, alertsRes] = await Promise.all([
                getAllReports(),
                getTeams(),
                getSystemAlerts()
            ]);

            if (reportsRes.success) {
                const data = reportsRes.reports || [];
                setReports(data || []);

                // Calculate Stats
                const total = data.length;
                const active = data.filter(r => r.status !== 'resolved' && r.status !== 'closed').length;
                const resolved = data.filter(r => r.status === 'resolved').length;
                const critical = data.filter(r => r.priority === 'critical' || r.priority === 'high').length;

                setStats(prev => [
                    { ...prev[0], value: total.toString() },
                    { ...prev[1], value: active.toString() },
                    { ...prev[2], value: resolved.toString() },
                    { ...prev[3], value: critical.toString() }
                ]);
            }

            if (teamsRes.success) {
                setTeams(teamsRes.teams || []);
            }

            if (alertsRes.success) {
                setAlerts((alertsRes.alerts || []).map(a => ({
                    id: a.id,
                    message: a.message,
                    time: a.createdAt ? new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'
                })));
            }

            setLoading(false);
        };
        fetchDashboardData();
    }, []);

    // Filter for Priority Queue (High/Critical only)
    const criticalQueue = reports
        .filter(r => r.priority === 'critical' || r.priority === 'high')
        .map(r => ({
            id: r.id,
            title: r.type ? r.type.replace(/_/g, ' ').toUpperCase() : 'ISSUE REPORT',
            location: { address: r.location?.address || 'Unknown Location' },
            aiSeverityScore: (() => {
                const p = (r.priority || 'medium').toLowerCase();
                if (p === 'critical') return 0.95;
                if (p === 'high') return 0.8;
                return 0.5;
            })(),
            timeAgo: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'Recently'
        }));

    return (
        <div className="w-full bg-md-surface min-h-screen p-4 md:p-6 lg:p-8 animate-in fade-in zoom-in duration-500">
            <div className="max-w-[1600px] mx-auto">
                <div className="mb-8 md:mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-2 h-2 rounded-full bg-md-primary"></span>
                        <span className="text-md-primary font-black uppercase tracking-[0.2em] text-[11px]">Authority Console</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-md-on-surface tracking-tighter">Overview.</h1>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                    {stats.map((stat, i) => (
                        <StatCard key={i} {...stat} />
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                    {/* Left Column - Priority Queue */}
                    <div className="xl:col-span-2 min-h-[500px] lg:h-[650px]">
                        <PriorityQueue reports={criticalQueue.length > 0 ? criticalQueue : []} />
                        {loading && <p className="text-center text-gray-500 mt-4">Loading real-time data...</p>}
                        {!loading && criticalQueue.length === 0 && <p className="text-center text-gray-500 mt-4">No critical issues reported yet.</p>}
                    </div>

                    {/* Right Column - Alerts & Resources */}
                    <div className="space-y-6 flex flex-col min-h-[500px] lg:h-[650px]">
                        <AlertPanel alerts={alerts} />
                        <div className="flex-1 min-h-0">
                            <ResourceAllocation teams={teams} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthorityDashboard;
