import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Loader, EmptyState, StatusBadge } from '../components/UI'
import { getClub } from '../api/clubApi'
import { getClubEvents } from '../api/eventApi'
import { applyToClub } from '../api/applicationApi'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import { Calendar, MapPin, User, ArrowLeft } from 'lucide-react'

export default function ClubDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [club, setClub] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [message, setMessage] = useState('')
  const [showApply, setShowApply] = useState(false)

  useEffect(() => {
    Promise.all([getClub(id), getClubEvents(id)])
      .then(([c, e]) => { setClub(c.data); setEvents(e.data) })
      .finally(() => setLoading(false))
  }, [id])

  const handleApply = async () => {
    if (!user) return navigate('/login')
    setApplying(true)
    try {
      await applyToClub(id, { message })
      toast.success('Application submitted!')
      setShowApply(false)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to apply')
    } finally { setApplying(false) }
  }

  if (loading) return <><Navbar /><Loader /></>
  if (!club) return <><Navbar /><EmptyState title="Club not found" /></>

  return (
    <>
      <Navbar />
      <div className="page-container animate-in">
        <button className="btn btn-secondary btn-sm" style={{ marginBottom: 20 }} onClick={() => navigate(-1)}>
          <ArrowLeft size={14} /> Back
        </button>
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ fontSize: '4rem', lineHeight: 1 }}>🏫</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                <h1 style={{ fontSize: '1.8rem', fontFamily: 'Plus Jakarta Sans' }}>{club.name}</h1>
                <StatusBadge status={club.status} />
              </div>
              {club.category && <div className="club-category">{club.category}</div>}
              <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>{club.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <User size={14} /> Coordinator: <strong style={{ color: 'var(--text)' }}>{club.coordinatorName}</strong>
              </div>
            </div>
            {user?.role === 'STUDENT' && (
              <div>
                {!showApply ? (
                  <button className="btn btn-primary" onClick={() => setShowApply(true)}>Apply for Membership</button>
                ) : (
                  <div style={{ minWidth: 280 }}>
                    <textarea className="form-control" placeholder="Tell us why you want to join…"
                      value={message} onChange={e => setMessage(e.target.value)} style={{ marginBottom: 8 }} />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-primary btn-sm" onClick={handleApply} disabled={applying}>
                        {applying ? 'Submitting…' : 'Submit Application'}
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setShowApply(false)}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>Upcoming Events</h2>
        {events.length === 0 ? (
          <EmptyState icon="📅" title="No events yet" desc="This club hasn't posted any events." />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {events.map(ev => (
              <div key={ev.id} className="event-card">
                <div className="event-date-box">
                  <span className="event-date-day">{ev.date ? new Date(ev.date).getDate() : '—'}</span>
                  <span className="event-date-mon">{ev.date ? new Date(ev.date).toLocaleString('default', { month: 'short' }) : ''}</span>
                </div>
                <div className="event-info">
                  <div className="event-title">{ev.title}</div>
                  <div className="event-meta">
                    {ev.venue && <span><MapPin size={12} /> {ev.venue}</span>}
                    {ev.description && <span style={{ color: 'var(--text-muted)' }}>{ev.description}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
