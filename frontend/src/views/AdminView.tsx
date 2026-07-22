import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Lock, KeyRound, Activity, Globe, Server, CheckCircle2 } from 'lucide-react';
import { INITIAL_USERS, INITIAL_AUDIT_LOGS, User, AuditLog } from '../services/mockData';
import { fetchAuditLogs } from '../services/api';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../context/ToastContext';

export const AdminView: React.FC = () => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const { addToast } = useToast();

  useEffect(() => {
    fetchAuditLogs()
      .then((result) => setAuditLogs(result))
      .catch(() => {
        // Keep preview audit logs
      });
  }, []);

  const handleRoleChange = (userId: string, newRole: User['role']) => {
    setUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, role: newRole } : u))
    );

    // Add audit log
    const newLog: AuditLog = {
      id: `audit-${Date.now()}`,
      userId: 'usr-1',
      userName: 'Alex',
      userRole: 'ADMIN',
      action: 'USER_ROLE_UPDATE',
      details: `Updated role for user ${userId} to ${newRole}`,
      ipAddress: '192.168.1.104',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };

    setAuditLogs([newLog, ...auditLogs]);
    addToast('success', 'User Role Updated', `Role changed to ${newRole}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#5B5FFF]" /> Executive Administration & Security Shield
        </h2>
        <p className="text-xs text-slate-400">Team user accounts, RBAC permission matrix & real-time system audit trail</p>
      </div>

      {/* User Management Table Card */}
      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-[#00D4FF]" /> Team Users & Role Allocations
          </h3>
          <Badge variant="purple">4 Active Team Members</Badge>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/10 text-slate-300 font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-3">User Profile</th>
                <th className="p-3">Department</th>
                <th className="p-3">Role Preset</th>
                <th className="p-3">Permissions Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-white/5">
                  <td className="p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-700 ring-2 ring-[#5B5FFF]/30 flex items-center justify-center text-[11px] font-semibold text-white uppercase">
                      {u.name
                        .split(' ')
                        .map(part => part[0] || '')
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-bold text-white">{u.name}</p>
                      <p className="text-slate-400 text-[11px]">{u.email}</p>
                    </div>
                  </td>
                  <td className="p-3 text-slate-300">{u.department}</td>
                  <td className="p-3">
                    <select
                      value={u.role}
                      onChange={e => handleRoleChange(u.id, e.target.value as User['role'])}
                      className="px-2.5 py-1 rounded-lg glass-input text-xs font-bold focus:outline-none"
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="SALES">SALES</option>
                      <option value="WAREHOUSE">WAREHOUSE</option>
                      <option value="ACCOUNTS">ACCOUNTS</option>
                    </select>
                  </td>
                  <td className="p-3 text-slate-400">
                    {u.role === 'ADMIN' && 'Full Master Control, User Role Edit, Audit Logs'}
                    {u.role === 'SALES' && 'CRM Access, Lead Creation, Sales Challan Drafts'}
                    {u.role === 'WAREHOUSE' && 'Inventory Stock Logs, Rack Locations, PO Requests'}
                    {u.role === 'ACCOUNTS' && 'Invoice Generation, Tax Breakdown, Reports Export'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Real-time Audit Logs Stream */}
      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> Security Audit Log Telemetry
            </h3>
            <p className="text-xs text-slate-400">Immutable record of platform operations and IP footprints</p>
          </div>
          <Badge variant="success">Live Stream Active</Badge>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/10 text-slate-300 font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">User</th>
                <th className="p-3">Action</th>
                <th className="p-3">Details</th>
                <th className="p-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-white/5">
                  <td className="p-3 text-slate-400">{log.timestamp}</td>
                  <td className="p-3 font-bold text-white">{log.userName}</td>
                  <td className="p-3">
                    <Badge variant="purple" className="text-[9px]">
                      {log.action}
                    </Badge>
                  </td>
                  <td className="p-3 text-slate-300 font-sans">{log.details}</td>
                  <td className="p-3 text-[#00D4FF]">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
