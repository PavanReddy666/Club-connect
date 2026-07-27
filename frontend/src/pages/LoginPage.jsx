import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/authApi'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import { Eye, EyeOff, LogIn } from 'lucide-react'

const ROLE_REDIRECTS = { STUDENT: '/student/dashboard', COORDINATOR: '/coordinator/dashboard', ADMIN: '/admin/dashboard' }

export default function LoginPage() {
  const { loginUser } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await login(form)
      loginUser(data)
      toast.success(`Welcome back, ${data.name}!`)
      navigate(ROLE_REDIRECTS[data.role] || '/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
    } finally { setLoading(false) }
  }

  return (
    <div className="auth-page">
      <div className="auth-card animate-in">
        <div className="auth-logo">⚡ ClubConnect</div>
        <div className="auth-subtitle">Sign in to your account</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-control" type="email" placeholder="you@college.edu" required
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input className="form-control" type={show ? 'text' : 'password'} placeholder="••••••••" required
                style={{ paddingRight: 44 }}
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              <button type="button" onClick={() => setShow(!show)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)' }}>
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            <LogIn size={16} /> {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <div className="divider" />
        <div style={{ background: 'rgba(108,99,255,0.08)', borderRadius: 8, padding: '12px 16px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          🔑 <strong style={{ color: 'var(--text)' }}>Demo Admin:</strong> admin@college.edu / admin123
        </div>
        <div className="auth-footer">Don't have an account? <Link to="/register">Sign up</Link></div>
      </div>
    </div>
  )
}
