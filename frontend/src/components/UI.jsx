export function StatusBadge({ status }) {
  const cls = status?.toLowerCase()
  return <span className={`badge badge-${cls}`}>{status}</span>
}

export function RoleBadge({ role }) {
  const cls = role?.toLowerCase()
  return <span className={`badge badge-${cls}`}>{role}</span>
}

export function Loader() {
  return <div className="loader-wrap"><div className="spinner" /></div>
}

export function EmptyState({ icon = '📭', title, desc }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3>{title}</h3>
      {desc && <p style={{ fontSize: '0.85rem' }}>{desc}</p>}
    </div>
  )
}

export function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function StatCard({ value, label, color = 'var(--primary)' }) {
  return (
    <div className="stat-card">
      <div className="stat-value" style={{ color }}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
