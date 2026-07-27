import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Loader, EmptyState } from '../components/UI'
import { getApprovedClubs } from '../api/clubApi'
import { Search } from 'lucide-react'

const EMOJI = { Tech: '💻', Arts: '🎨', Sports: '⚽', Music: '🎵', Science: '🔬', Business: '💼', Social: '🌍', default: '🏫' }

export default function ClubsPage() {
  const [clubs, setClubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getApprovedClubs().then(r => setClubs(r.data)).finally(() => setLoading(false))
  }, [])

  const filtered = clubs.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.category?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Navbar />
      <div className="page-container animate-in">
        <div className="page-header flex-between" style={{ flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1>Explore Clubs</h1>
            <p>{clubs.length} clubs available to join</p>
          </div>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input className="form-control" placeholder="Search clubs…" style={{ paddingLeft: 36, width: 260 }}
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        {loading ? <Loader /> : filtered.length === 0 ? (
          <EmptyState icon="🔍" title="No clubs found" desc="Try a different search term" />
        ) : (
          <div className="card-grid">
            {filtered.map(club => (
              <div key={club.id} className="club-card">
                <div className="club-card-header">
                  {EMOJI[club.category] || EMOJI.default}
                </div>
                <div className="club-card-body">
                  <div className="club-category">{club.category || 'General'}</div>
                  <div className="club-name">{club.name}</div>
                  <div className="club-desc">{club.description || 'No description provided.'}</div>
                </div>
                <div className="club-card-footer">
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>by {club.coordinatorName}</span>
                  <Link to={`/clubs/${club.id}`} className="btn btn-primary btn-sm">View</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
