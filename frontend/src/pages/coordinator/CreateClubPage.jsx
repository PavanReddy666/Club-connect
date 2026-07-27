import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { createClub } from '../../api/clubApi'
import toast from 'react-hot-toast'
import { BookOpen } from 'lucide-react'

const CATEGORIES = ['Tech', 'Arts', 'Sports', 'Music', 'Science', 'Business', 'Social', 'Other']

export default function CreateClubPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', description: '', category: '', logoUrl: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await createClub(form)
      toast.success('Club created! Awaiting admin approval.')
      navigate('/coordinator/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create club')
    } finally { setLoading(false) }
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="page-container animate-in">
          <div className="page-header">
            <h1>Create a New Club</h1>
            <p>Fill in the details. Your club will be reviewed by an admin before going live.</p>
          </div>
          <div className="card" style={{ maxWidth: 600 }}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Club Name *</label>
                <input className="form-control" placeholder="e.g. Coding Club" required
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-control" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option value="">Select a category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-control" placeholder="What does your club do? Who should join?" rows={4}
                  value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Logo URL (optional)</label>
                <input className="form-control" placeholder="https://example.com/logo.png"
                  value={form.logoUrl} onChange={e => setForm({ ...form, logoUrl: e.target.value })} />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                <BookOpen size={16} /> {loading ? 'Creating…' : 'Create Club'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
