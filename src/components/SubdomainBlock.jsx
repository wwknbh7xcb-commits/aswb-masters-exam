import { Link } from 'react-router-dom'

export default function SubdomainBlock({ subdomain, ksas }) {
  return (
    <section className="card subdomain-block">
      <div className="subdomain-header">
        <div className="pill">{subdomain.code}</div>
        <h3>{subdomain.title}</h3>
      </div>

      <div className="ksa-list">
        {ksas.map((ksa) => (
          <div key={ksa.id} className="ksa-row">
            <div className="ksa-copy">
              <h4>{ksa.title}</h4>
              <div className="tag-row">
                {ksa.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="ksa-actions">
              <Link to={`/learn/${ksa.id}`} className="button secondary">Learn</Link>
              <Link to={`/practice?domainId=${ksa.domainId}&subdomainId=${ksa.subdomainId}&ksaId=${ksa.id}`} className="button">
                Practice
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
