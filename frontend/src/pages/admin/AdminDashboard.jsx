import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Loader, StatCard } from '../../components/UI'
import { getAdminStats } from '../../api/adminApi'
import { Users, BookOpen, FileText, CheckCircle, Clock, XCircle } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAdminStats().then(r => setStats(r.data)).finally(() => setLoading(false))
  }, [])

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="page-container animate-in">
          <div className="page-header">
            <h1>Admin Dashboard</h1>
            <p>Platform-wide overview and statistics</p>
          </div>
          {loading ? <Loader /> : (
            <>
              <div className="stats-grid">
                <StatCard value={stats.totalUsers} label="Total Users" color="var(--primary)" />
                <StatCard value={stats.totalClubs} label="Total Clubs" color="var(--accent)" />
                <StatCard value={stats.approvedClubs} label="Approved Clubs" color="var(--success)" />
                <StatCard value={stats.pendingClubs} label="Pending Clubs" color="var(--warning)" />
                <StatCard value={stats.totalApplications} label="Total Applications" color="var(--info)" />
                <StatCard value={stats.pendingApplications} label="Pending Applications" color="var(--warning)" />
                <StatCard value={stats.approvedApplications} label="Approved Applications" color="var(--success)" />
              </div>
              <div className="card-grid">
                <div className="card" style={{ borderLeft: '3px solid var(--primary)' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 8 }}>Quick Actions</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <a href="/admin/users" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}><Users size={15} /> Manage Users</a>
                    <a href="/admin/clubs" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}><BookOpen size={15} /> Review Club Requests</a>
                  </div>
                </div>
                <div className="card" style={{ borderLeft: '3px solid var(--accent)' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 8 }}>System Info</div>
                  <div style={{ fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div className="flex-between"><span>DB Status</span><span style={{ color: 'var(--success)', fontWeight: 600 }}>✅ Online (H2)</span></div>
                    <div className="flex-between"><span>API Status</span><span style={{ color: 'var(--success)', fontWeight: 600 }}>✅ Running</span></div>
                    <div className="flex-between"><span>Auth</span><span style={{ color: 'var(--primary-light)', fontWeight: 600 }}>🔐 JWT</span></div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
