import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LogOut, Zap } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">⚡ ClubConnect</Link>
      <div className="navbar-links">
        <NavLink to="/clubs" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Clubs</NavLink>
        <NavLink to="/events" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Events</NavLink>
      </div>
      <div className="navbar-actions">
        {user ? (
          <>
            <div className="user-pill">
              <div className="user-avatar">{user.name?.[0]?.toUpperCase()}</div>
              <span>{user.name}</span>
              <span className={`badge badge-${user.role.toLowerCase()}`}>{user.role}</span>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
              <LogOut size={14} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  )
}
