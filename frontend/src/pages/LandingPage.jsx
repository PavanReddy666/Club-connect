import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Users, Calendar, FileText, Shield } from 'lucide-react'

const features = [
  { icon: <Users size={20} color="white" />, title: 'Discover Clubs', desc: 'Browse and explore all college clubs across categories — tech, arts, sports and more.' },
  { icon: <FileText size={20} color="white" />, title: 'Apply for Membership', desc: 'Submit membership applications with a personal message and track your status in real-time.' },
  { icon: <Calendar size={20} color="white" />, title: 'Stay Updated', desc: 'Never miss an event. Coordinators post events and all students get instant visibility.' },
  { icon: <Shield size={20} color="white" />, title: 'Admin Oversight', desc: 'Centralized admin panel for user management, club approvals, and platform analytics.' },
]

export default function LandingPage() {
  return (
    <div className="hero">
      <Navbar />
      <div className="hero-content animate-in">
        <div className="hero-badge">✨ College Club Management Platform</div>
        <h1 className="hero-title">Your Campus Life,<br />Supercharged</h1>
        <p className="hero-sub">
          Discover clubs, apply for membership, track applications, manage events — all in one beautifully designed platform.
        </p>
        <div className="hero-cta">
          <Link to="/register" className="btn btn-primary btn-lg">Get Started Free</Link>
          <Link to="/clubs" className="btn btn-secondary btn-lg">Browse Clubs</Link>
        </div>
      </div>
      <div className="hero-features">
        {features.map(f => (
          <div key={f.title} className="feature-card animate-in">
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', padding: '40px 24px', color: 'var(--text-dim)', fontSize: '0.82rem' }}>
        © 2024 ClubConnect — Built for college communities
      </div>
    </div>
  )
}
