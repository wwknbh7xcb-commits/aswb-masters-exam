import { Link } from 'react-router-dom'

export default function DomainCard({ domain }) {
  return (
    <Link to={`/domain/${domain.id}`} className="card domain-card">
      <div className="pill">{domain.code}</div>
      <h3>{domain.title}</h3>
      <p>{domain.description}</p>
      <div className="meta-row">
        <span>{domain.weight}% of exam</span>
        <span>Open domain</span>
      </div>
    </Link>
  )
}
