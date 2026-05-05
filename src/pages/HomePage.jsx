import { Link } from 'react-router-dom'
import DomainCard from '../components/DomainCard'
import { domains } from '../utils'

export default function HomePage() {
  return (
    <div className="stack-lg">
      <section className="hero card">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">v1 scaffold</div>
            <h2>ASWB Clinical Exam Prep Hub</h2>
            <p>
              This starter app includes a blueprint-driven study map, learn pages for starter KSAs,
              and a modular practice engine with filtering by domain, KSA, cognitive level, and qualifier.
            </p>
          </div>

          <div className="hero-actions">
            <Link to="/study-map" className="button">Open Study Map</Link>
            <Link to="/practice" className="button secondary">Launch Practice Builder</Link>
          </div>
        </div>
      </section>

      <section className="grid">
        {domains.map((domain) => (
          <DomainCard key={domain.id} domain={domain} />
        ))}
      </section>
    </div>
  )
}
