import React from 'react';
import StatCard from '../../components/dashboard/StatCard';
import PriorityQueue from '../../components/dashboard/PriorityQueue';
import AlertPanel from '../../components/dashboard/AlertPanel';
import ResourceAllocation from '../../components/dashboard/ResourceAllocation';

const AuthorityDashboard = () => {
    // Mock Data
    const stats = [
        { title: 'Total Reports', value: '1,234', trend: '8% today', isPositive: true, icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
        { title: 'Active Issues', value: '342', trend: '12% this week', isPositive: false, icon: <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> },
        { title: 'Resolved', value: '892', trend: '5% this month', isPositive: true, icon: <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { title: 'Avg. Response', value: '4.2h', trend: '1.5h faster', isPositive: true, icon: <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    ];

    const criticalReports = [
        { id: '1', title: 'Major Pipe Burst - Main St', location: { address: '123 Main St, Bangalore' }, aiSeverityScore: 0.95, timeAgo: '10m ago' },
        { id: '2', title: 'Contaminated Water Supply', location: { address: 'Sector 4, Indiranagar' }, aiSeverityScore: 0.88, timeAgo: '45m ago' },
        { id: '3', title: 'Low Pressure Alert', location: { address: 'Palm Grove Apts' }, aiSeverityScore: 0.65, timeAgo: '2h ago' },
        { id: '4', title: 'Sewage Leakage', location: { address: 'Market Road' }, aiSeverityScore: 0.92, timeAgo: '3h ago' },
        { id: '5', title: 'No Water Supply', location: { address: 'Layout 5' }, aiSeverityScore: 0.78, timeAgo: '5h ago' },
    ];

    const alerts = [
        { id: '1', message: 'Heavy rain forecast - Expect flooding reports in Zone A', time: '1 hour ago' },
        { id: '2', message: 'Maintenance scheduled for Pumping Station 3 tonight', time: '3 hours ago' },
    ];

    const teams = [
        { id: '1', name: 'Team Alpha', avatar: 'TA', status: 'busy', currentTask: 'Fixing leak at Main St' },
        { id: '2', name: 'Team Beta', avatar: 'TB', status: 'available', currentTask: '' },
        { id: '3', name: 'Team Gamma', avatar: 'TG', status: 'off-duty', currentTask: '' },
    ];

    return (
        <div className="w-full bg-md-surface min-h-screen p-4 md:p-6 lg:p-8 animate-in fade-in zoom-in duration-500">
            <div className="max-w-[1440px] mx-auto">
                <div className="mb-10">
                    <span className="text-md-primary font-black uppercase tracking-[0.2em] text-[11px] mb-2 block">Authority Console</span>
                    <h1 className="text-4xl md:text-5xl font-black text-md-on-surface tracking-tight">Overview.</h1>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, i) => (
                        <StatCard key={i} {...stat} />
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Priority Queue */}
                    <div className="lg:col-span-2 h-[600px]">
                        <PriorityQueue reports={criticalReports} />
                    </div>

                    {/* Right Column - Alerts & Resources */}
                    <div className="space-y-6 flex flex-col h-[600px]">
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
