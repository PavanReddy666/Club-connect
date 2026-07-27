import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { Loader, EmptyState, StatusBadge } from '../../components/UI'
import { getMyClubs } from '../../api/clubApi'
import { getCoordinatorApplications } from '../../api/applicationApi'
import { updateApplicationStatus } from '../../api/applicationApi'
import toast from 'react-hot-toast'
import { CheckCircle, XCircle, Plus } from 'lucide-react'

export default function CoordinatorDashboard() {
  const [clubs, setClubs] = useState([])
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    Promise.all([getMyClubs(), getCoordinatorApplications()])
      .then(([c, a]) => { setClubs(c.data); setApps(a.data) })
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleStatus = async (id, status) => {
    try {
      await updateApplicationStatus(id, status)
      toast.success(`Application ${status.toLowerCase()}`)
      setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    } catch { toast.error('Failed to update') }
  }

  const pending = apps.filter(a => a.status === 'PENDING')

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="page-container animate-in">
          <div className="page-header flex-between" style={{ flexWrap: 'wrap', gap: 16 }}>
            <div><h1>Coordinator Dashboard</h1><p>Manage your clubs and review applications</p></div>
            <Link to="/coordinator/club/new" className="btn btn-primary"><Plus size={16} /> Create Club</Link>
          </div>
          <div className="stats-grid">
            <div className="stat-card"><div className="stat-value">{clubs.length}</div><div className="stat-label">My Clubs</div></div>
            <div className="stat-card"><div className="stat-value" style={{ color: 'var(--warning)' }}>{pending.length}</div><div className="stat-label">Pending Applications</div></div>
            <div className="stat-card"><div className="stat-value">{apps.length}</div><div className="stat-label">Total Applications</div></div>
            <div className="stat-card"><div className="stat-value" style={{ color: 'var(--success)' }}>{apps.filter(a => a.status === 'APPROVED').length}</div><div className="stat-label">Approved</div></div>
          </div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>My Clubs</h2>
          {loading ? <Loader /> : clubs.length === 0 ? (
            <EmptyState icon="🏫" title="No clubs yet" desc="Create your first club to get started." />
          ) : (
            <div className="card-grid" style={{ marginBottom: 32 }}>
              {clubs.map(c => (
                <div key={c.id} className="card">
                  <div className="flex-between" style={{ marginBottom: 8 }}>
                    <span style={{ fontWeight: 700 }}>{c.name}</span>
                    <StatusBadge status={c.status} />
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{c.category}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: 8 }}>
                    {c.status === 'PENDING' ? '⏳ Awaiting admin approval' : c.status === 'APPROVED' ? '✅ Live and accepting applications' : '❌ Rejected by admin'}
                  </div>
                </div>
              ))}
            </div>
          )}
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>Incoming Applications</h2>
          {apps.length === 0 ? (
            <EmptyState icon="📬" title="No applications yet" desc="Applications will appear here once students apply to your clubs." />
          ) : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>Student</th><th>Club</th><th>Message</th><th>Applied</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {apps.map(app => (
                    <tr key={app.id}>
                      <td><div style={{ fontWeight: 600 }}>{app.studentName}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.studentEmail}</div></td>
                      <td>{app.clubName}</td>
                      <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-muted)' }}>{app.message || '—'}</td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{new Date(app.appliedAt).toLocaleDateString()}</td>
                      <td><StatusBadge status={app.status} /></td>
                      <td>
                        {app.status === 'PENDING' && (
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button className="btn btn-success btn-sm" onClick={() => handleStatus(app.id, 'APPROVED')}>
                              <CheckCircle size={12} /> Approve
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleStatus(app.id, 'REJECTED')}>
                              <XCircle size={12} /> Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
