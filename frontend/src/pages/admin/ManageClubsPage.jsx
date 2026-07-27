import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Loader, EmptyState, StatusBadge } from '../../components/UI'
import { getAllClubs, updateClubStatus, deleteClub } from '../../api/clubApi'
import toast from 'react-hot-toast'
import { CheckCircle, XCircle, Trash2 } from 'lucide-react'

export default function ManageClubsPage() {
  const [clubs, setClubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

  const load = () => { getAllClubs().then(r => setClubs(r.data)).finally(() => setLoading(false)) }
  useEffect(() => { load() }, [])

  const handleStatus = async (id, status) => {
    try {
      const { data } = await updateClubStatus(id, status)
      setClubs(c => c.map(x => x.id === id ? data : x))
      toast.success(`Club ${status.toLowerCase()}`)
    } catch { toast.error('Failed') }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete club "${name}"?`)) return
    try { await deleteClub(id); setClubs(c => c.filter(x => x.id !== id)); toast.success('Club deleted') }
    catch { toast.error('Failed to delete') }
  }

  const filtered = filter === 'ALL' ? clubs : clubs.filter(c => c.status === filter)

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="page-container animate-in">
          <div className="page-header flex-between" style={{ flexWrap: 'wrap', gap: 12 }}>
            <div><h1>Manage Clubs</h1><p>{clubs.length} total clubs</p></div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map(s => (
                <button key={s} className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter(s)}>{s}</button>
              ))}
            </div>
          </div>
          {loading ? <Loader /> : filtered.length === 0 ? (
            <EmptyState icon="🏫" title="No clubs found" />
          ) : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>Club</th><th>Category</th><th>Coordinator</th><th>Status</th><th>Created</th><th>Actions</th></tr></thead>
                <tbody>
                  {filtered.map(club => (
                    <tr key={club.id}>
                      <td style={{ fontWeight: 600 }}>{club.name}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{club.category || '—'}</td>
                      <td>
                        <div style={{ fontSize: '0.85rem' }}>{club.coordinatorName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{club.coordinatorEmail}</div>
                      </td>
                      <td><StatusBadge status={club.status} /></td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{new Date(club.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {club.status !== 'APPROVED' && (
                            <button className="btn btn-success btn-sm" onClick={() => handleStatus(club.id, 'APPROVED')}>
                              <CheckCircle size={12} /> Approve
                            </button>
                          )}
                          {club.status !== 'REJECTED' && (
                            <button className="btn btn-danger btn-sm" onClick={() => handleStatus(club.id, 'REJECTED')}>
                              <XCircle size={12} /> Reject
                            </button>
                          )}
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(club.id, club.name)}>
                            <Trash2 size={12} />
                          </button>
                        </div>
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
