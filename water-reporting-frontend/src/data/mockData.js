// Mock data for development and testing

export const mockStats = {
    totalReports: 1234,
    resolvedReports: 892,
    activeReports: 342,
    criticalReports: 28,
};

export const mockIssueTypes = [
    { type: 'Water Shortage', count: 450, color: '#3B82F6' },
    { type: 'Contamination', count: 320, color: '#EF4444' },
    { type: 'Low Pressure', count: 280, color: '#F59E0B' },
    { type: 'Infrastructure Damage', count: 184, color: '#8B5CF6' },
];

export const mockRecentReports = [
    {
        id: 1,
        type: 'Contamination',
        severity: 'critical',
        location: 'Downtown Area, Main Street',
        description: 'Brown water coming from taps, possible pipe contamination',
        time: '2 hours ago',
        status: 'pending',
        reporter: 'John Doe',
    },
    {
        id: 2,
        type: 'Low Pressure',
        severity: 'medium',
        location: 'North District, Block A',
        description: 'Very low water pressure in the morning hours',
        time: '5 hours ago',
        status: 'in-progress',
        reporter: 'Jane Smith',
    },
    {
        id: 3,
        type: 'Water Shortage',
        severity: 'high',
        location: 'East Side, Residential Area',
        description: 'No water supply for the past 6 hours',
        time: '8 hours ago',
        status: 'in-progress',
        reporter: 'Mike Johnson',
    },
    {
        id: 4,
        type: 'Infrastructure Damage',
        severity: 'medium',
        location: 'South Park, Near Fountain',
        description: 'Visible pipe leak on the street',
        time: '12 hours ago',
        status: 'resolved',
        reporter: 'Sarah Williams',
    },
    {
        id: 5,
        type: 'Contamination',
        severity: 'low',
        location: 'West End, Community Center',
        description: 'Slight odor in water supply',
        time: '1 day ago',
        status: 'resolved',
        reporter: 'David Brown',
    },
];

export const mockTrendData = [
    { date: 'Jan 1', reports: 28 },
    { date: 'Jan 5', reports: 35 },
    { date: 'Jan 10', reports: 42 },
    { date: 'Jan 15', reports: 38 },
    { date: 'Jan 20', reports: 45 },
    { date: 'Jan 25', reports: 52 },
    { date: 'Jan 30', reports: 48 },
    { date: 'Feb 1', reports: 40 },
];

export const mockRegionalData = [
    { region: 'North District', reports: 156, severity: 'low' },
    { region: 'South District', reports: 298, severity: 'high' },
    { region: 'East District', reports: 234, severity: 'medium' },
    { region: 'West District', reports: 189, severity: 'medium' },
    { region: 'Downtown', reports: 357, severity: 'critical' },
];

export const severityColors = {
    low: '#10B981',      // green
    medium: '#F59E0B',   // orange
    high: '#EF4444',     // red
    critical: '#DC2626', // dark red
};

export const statusColors = {
    pending: '#F59E0B',
    'in-progress': '#3B82F6',
    resolved: '#10B981',
    closed: '#6B7280',
};
