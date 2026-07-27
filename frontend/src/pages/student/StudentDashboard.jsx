import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Loader, EmptyState, StatusBadge } from '../../components/UI'
import { getMyApplications } from '../../api/applicationApi'
import { Clock, CheckCircle, XCircle } from 'lucide-react'

export default function StudentDashboard() {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMyApplications().then(r => setApps(r.data)).finally(() => setLoading(false))
  }, [])

  const pending = apps.filter(a => a.status === 'PENDING').length
  const approved = apps.filter(a => a.status === 'APPROVED').length
  const rejected = apps.filter(a => a.status === 'REJECTED').length

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="page-container animate-in">
          <div className="page-header">
            <h1>My Applications</h1>
            <p>Track all your club membership applications</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card"><div className="stat-value" style={{ color: 'var(--warning)' }}>{pending}</div><div className="stat-label">Pending</div></div>
            <div className="stat-card"><div className="stat-value" style={{ color: 'var(--success)' }}>{approved}</div><div className="stat-label">Approved</div></div>
            <div className="stat-card"><div className="stat-value" style={{ color: 'var(--danger)' }}>{rejected}</div><div className="stat-label">Rejected</div></div>
            <div className="stat-card"><div className="stat-value">{apps.length}</div><div className="stat-label">Total Applied</div></div>
          </div>
          {loading ? <Loader /> : apps.length === 0 ? (
            <EmptyState icon="📋" title="No applications yet" desc="Browse clubs and apply for membership to get started!" />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {apps.map(app => (
                <div key={app.id} className="card">
                  <div className="flex-between" style={{ flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 4 }}>{app.clubName}</div>
                      {app.message && <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 8 }}>"{app.message}"</div>}
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                        Applied: {new Date(app.appliedAt).toLocaleDateString()} · Updated: {new Date(app.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
