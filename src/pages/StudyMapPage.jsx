import DomainCard from '../components/DomainCard'
import { domains } from '../utils'

export default function StudyMapPage() {
  return (
    <div className="stack-lg">
      <section className="card">
        <div className="eyebrow">Study Map</div>
        <h2>Clinical exam blueprint</h2>
        <p>
          Browse the full domain structure first, then drill down into subdomains, KSAs, learn pages, and quiz sessions.
        </p>
      </section>

      <section className="grid">
        {domains.map((domain) => (
          <DomainCard key={domain.id} domain={domain} />
        ))}
      </section>
    </div>
  )
}
