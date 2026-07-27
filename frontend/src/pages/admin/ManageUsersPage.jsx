import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Loader, EmptyState, RoleBadge } from '../../components/UI'
import { getAllUsers, deleteUser, changeUserRole } from '../../api/adminApi'
import toast from 'react-hot-toast'
import { Trash2, RefreshCw } from 'lucide-react'

export default function ManageUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => getAllUsers().then(r => setUsers(r.data)).finally(() => setLoading(false))
  useEffect(load, [])

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete user "${name}"?`)) return
    try { await deleteUser(id); setUsers(u => u.filter(x => x.id !== id)); toast.success('User deleted') }
    catch { toast.error('Failed to delete') }
  }

  const handleRole = async (id, role) => {
    try {
      const { data } = await changeUserRole(id, role)
      setUsers(u => u.map(x => x.id === id ? data : x))
      toast.success('Role updated')
    } catch { toast.error('Failed to update role') }
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="page-container animate-in">
          <div className="page-header flex-between" style={{ flexWrap: 'wrap', gap: 12 }}>
            <div><h1>Manage Users</h1><p>{users.length} registered users</p></div>
            <button className="btn btn-secondary btn-sm" onClick={load}><RefreshCw size={14} /> Refresh</button>
          </div>
          {loading ? <Loader /> : users.length === 0 ? (
            <EmptyState icon="👥" title="No users found" />
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>#</th><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={u.id}>
                      <td style={{ color: 'var(--text-dim)' }}>{i + 1}</td>
                      <td style={{ fontWeight: 600 }}>{u.name}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{u.email}</td>
                      <td><RoleBadge role={u.role} /></td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          <select className="form-control" style={{ padding: '4px 8px', fontSize: '0.78rem', width: 'auto' }}
                            value={u.role} onChange={e => handleRole(u.id, e.target.value)}>
                            <option value="STUDENT">STUDENT</option>
                            <option value="COORDINATOR">COORDINATOR</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id, u.name)}>
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
