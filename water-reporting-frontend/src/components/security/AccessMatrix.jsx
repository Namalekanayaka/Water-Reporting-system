import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../services/api/users';

const AccessMatrix = () => {
    const roles = ['citizen', 'authority']; // Simplified for now based on DB
    const resources = [
        { name: 'Reports', key: 'reports' },
        { name: 'Analytics', key: 'analytics' },
        { name: 'User Data', key: 'users' },
        { name: 'Console', key: 'config' },
    ];

    // Default Permissions
    const defaultPerms = {
        'authority': { reports: 2, analytics: 2, users: 2, config: 2 },
        'citizen': { reports: 1, analytics: 0, users: 0, config: 0 }
    };

    const [permissions, setPermissions] = useState(defaultPerms);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const { success, users: data } = await getAllUsers();
            if (success) setUsers(data.splice(0, 5)); // Show top 5 for demo
        };
        fetchUsers();
    }, []);

    const togglePermission = (role, resourceKey) => {
        setPermissions(prev => ({
            ...prev,
            [role]: {
                ...prev[role],
                [resourceKey]: (prev[role][resourceKey] + 1) % 3
            }
        }));
    };

    const getPermissionBadge = (level) => {
        switch (level) {
            case 2: return <span className="w-20 py-1 text-center bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-lg">Full</span>;
            case 1: return <span className="w-20 py-1 text-center bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-lg">Read</span>;
            default: return <span className="w-20 py-1 text-center bg-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-lg">None</span>;
        }
    };

    return (
        <div className="bg-md-surface p-8 rounded-[32px] border border-md-outline/10 shadow-sm overflow-hidden">
            <div className="mb-8">
                <h3 className="text-xl font-black text-md-on-surface mb-2">Access Control Matrix</h3>
                <p className="text-md-on-surface-variant text-sm">Tap cells to cycle permission levels (None → Read → Full).</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="p-4 bg-md-surface-variant/20 rounded-tl-2xl border-b border-md-outline/10 text-xs font-black uppercase tracking-widest text-md-on-surface-variant">
                                Role / Resource
                            </th>
                            {resources.map(res => (
                                <th key={res.key} className="p-4 border-b border-md-outline/10 text-xs font-black uppercase tracking-widest text-md-on-surface-variant text-center">
                                    {res.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role, idx) => (
                            <tr key={role} className="hover:bg-md-primary/5 transition-colors group">
                                <td className={`p-4 font-bold text-md-on-surface border-b border-md-outline/5 ${idx === roles.length - 1 ? 'rounded-bl-2xl' : ''}`}>
                                    {role}
                                </td>
                                {resources.map(res => (
                                    <td
                                        key={res.key}
                                        onClick={() => togglePermission(role, res.key)}
                                        className="p-4 border-b border-md-outline/5 text-center cursor-pointer select-none"
                                    >
                                        <div className="flex justify-center transition-transform active:scale-95 duration-100">
                                            {getPermissionBadge(permissions[role][res.key])}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex justify-end">
                <button className="bg-md-primary text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-water-700 transition-colors">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default AccessMatrix;
