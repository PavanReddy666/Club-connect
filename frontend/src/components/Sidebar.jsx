import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LayoutDashboard, Users, BookOpen, Calendar, FileText, Settings, LogOut, Shield, UserCheck } from 'lucide-react'

const studentLinks = [
  { to: '/student/dashboard', icon: <LayoutDashboard size={16} />, label: 'My Applications' },
  { to: '/clubs', icon: <Users size={16} />, label: 'Browse Clubs' },
  { to: '/events', icon: <Calendar size={16} />, label: 'Events' },
]
const coordinatorLinks = [
  { to: '/coordinator/dashboard', icon: <LayoutDashboard size={16} />, label: 'Dashboard' },
  { to: '/coordinator/club/new', icon: <BookOpen size={16} />, label: 'Create Club' },
  { to: '/coordinator/events/new', icon: <Calendar size={16} />, label: 'Add Event' },
  { to: '/clubs', icon: <Users size={16} />, label: 'Browse Clubs' },
]
const adminLinks = [
  { to: '/admin/dashboard', icon: <LayoutDashboard size={16} />, label: 'Dashboard' },
  { to: '/admin/users', icon: <Users size={16} />, label: 'Manage Users' },
  { to: '/admin/clubs', icon: <Shield size={16} />, label: 'Manage Clubs' },
  { to: '/clubs', icon: <BookOpen size={16} />, label: 'Browse Clubs' },
  { to: '/events', icon: <Calendar size={16} />, label: 'Events' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  if (!user) return null

  const links = user.role === 'ADMIN' ? adminLinks : user.role === 'COORDINATOR' ? coordinatorLinks : studentLinks

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">⚡ ClubConnect</div>
      <div className="sidebar-section">
        <div className="sidebar-label">Navigation</div>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
            {l.icon} {l.label}
          </NavLink>
        ))}
      </div>
      <div className="sidebar-section" style={{ marginTop: 'auto' }}>
        <div className="user-pill" style={{ marginBottom: 12 }}>
          <div className="user-avatar">{user.name?.[0]?.toUpperCase()}</div>
          <div style={{ fontSize: '0.8rem' }}>
            <div style={{ fontWeight: 600 }}>{user.name}</div>
            <div style={{ color: 'var(--text-muted)' }}>{user.role}</div>
          </div>
        </div>
        <button className="sidebar-link" style={{ width: '100%', border: 'none', background: 'none' }} onClick={() => { logout(); navigate('/') }}>
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  )
}
