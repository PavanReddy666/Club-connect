import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { getMyClubs } from '../../api/clubApi'
import { createEvent } from '../../api/eventApi'
import toast from 'react-hot-toast'
import { Calendar } from 'lucide-react'

export default function CreateEventPage() {
  const navigate = useNavigate()
  const [clubs, setClubs] = useState([])
  const [form, setForm] = useState({ clubId: '', title: '', description: '', date: '', venue: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getMyClubs().then(r => { const approved = r.data.filter(c => c.status === 'APPROVED'); setClubs(approved); if (approved[0]) setForm(f => ({ ...f, clubId: approved[0].id })) })
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.clubId) return toast.error('Select a club first')
    setLoading(true)
    try {
      await createEvent(form.clubId, { title: form.title, description: form.description, date: form.date || null, venue: form.venue })
      toast.success('Event created!')
      navigate('/coordinator/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create event')
    } finally { setLoading(false) }
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="page-container animate-in">
          <div className="page-header">
            <h1>Add a New Event</h1>
            <p>Post events for your approved clubs</p>
          </div>
          {clubs.length === 0 ? (
            <div className="card" style={{ maxWidth: 600 }}>
              <p style={{ color: 'var(--text-muted)' }}>⚠️ You have no approved clubs yet. Create a club and wait for admin approval before adding events.</p>
            </div>
          ) : (
            <div className="card" style={{ maxWidth: 600 }}>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Club *</label>
                  <select className="form-control" required value={form.clubId} onChange={e => setForm({ ...form, clubId: e.target.value })}>
                    {clubs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Event Title *</label>
                  <input className="form-control" placeholder="e.g. Hackathon 2024" required
                    value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input type="date" className="form-control"
                    value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Venue</label>
                  <input className="form-control" placeholder="e.g. Auditorium, Room 301"
                    value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" placeholder="Event details, agenda, etc." rows={3}
                    value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  <Calendar size={16} /> {loading ? 'Creating…' : 'Create Event'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
