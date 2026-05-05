import { Link, useParams } from 'react-router-dom'
import SubdomainBlock from '../components/SubdomainBlock'
import { getDomain, getSubdomainsByDomain, getKSAsBySubdomain } from '../utils'

export default function DomainPage() {
  const { domainId } = useParams()
  const domain = getDomain(domainId)
  const subdomains = getSubdomainsByDomain(domainId)

  if (!domain) {
    return (
      <section className="card">
        <h2>Domain not found</h2>
        <Link to="/study-map" className="button">Back to Study Map</Link>
      </section>
    )
  }

  return (
      <div className={`stack-lg domain-page ${domain.id}`}>
      <section className="card">
        <div className="pill">{domain.code}</div>
        <h2>{domain.title}</h2>
        <p>{domain.description}</p>
        <div className="meta-row">
          <span>{domain.weight}% of exam</span>
          <Link className="text-link" to={`/practice?domainId=${domain.id}`}>Practice this domain</Link>
        </div>
      </section>

      {subdomains.map((subdomain) => (
        <SubdomainBlock key={subdomain.id} subdomain={subdomain} ksas={getKSAsBySubdomain(subdomain.id)} />
      ))}
    </div>
  )
}
