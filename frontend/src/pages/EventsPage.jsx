import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Loader, EmptyState } from '../components/UI'
import { getAllEvents } from '../api/eventApi'
import { Calendar, MapPin, Tag } from 'lucide-react'

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllEvents().then(r => setEvents(r.data)).finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navbar />
      <div className="page-container animate-in">
        <div className="page-header">
          <h1>All Events</h1>
          <p>{events.length} upcoming events across all clubs</p>
        </div>
        {loading ? <Loader /> : events.length === 0 ? (
          <EmptyState icon="📅" title="No events yet" desc="Events will appear here once coordinators post them." />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {events.map(ev => (
              <div key={ev.id} className="event-card">
                <div className="event-date-box">
                  <span className="event-date-day">{ev.date ? new Date(ev.date).getDate() : '?'}</span>
                  <span className="event-date-mon">{ev.date ? new Date(ev.date).toLocaleString('default', { month: 'short' }) : '—'}</span>
                </div>
                <div className="event-info">
                  <div className="event-title">{ev.title}</div>
                  <div className="event-meta">
                    <span><Tag size={12} /> {ev.clubName}</span>
                    {ev.venue && <span><MapPin size={12} /> {ev.venue}</span>}
                    {ev.description && <span>{ev.description}</span>}
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
