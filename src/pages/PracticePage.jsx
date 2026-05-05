import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { domains, subdomains, ksas, getQuestionsByFilters } from '../utils'

const cognitiveOptions = ['recall', 'application', 'reasoning']
const qualifierOptions = ['FIRST', 'NEXT', 'BEST', 'MOST', 'MOST likely']

export default function PracticePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [domainId, setDomainId] = useState(searchParams.get('domainId') || '')
  const [subdomainId, setSubdomainId] = useState(searchParams.get('subdomainId') || '')
  const [ksaId, setKsaId] = useState(searchParams.get('ksaId') || '')
  const [cognitiveLevel, setCognitiveLevel] = useState('')
  const [qualifier, setQualifier] = useState('')

  const filteredSubdomains = useMemo(
    () => subdomains.filter((s) => !domainId || s.domainId === domainId),
    [domainId]
  )

  const filteredKsas = useMemo(
    () => ksas.filter((k) => (!domainId || k.domainId === domainId) && (!subdomainId || k.subdomainId === subdomainId)),
    [domainId, subdomainId]
  )

  const previewQuestions = getQuestionsByFilters({ domainId, subdomainId, ksaId, cognitiveLevel, qualifier })

  function startSession() {
    const params = new URLSearchParams()
    if (domainId) params.set('domainId', domainId)
    if (subdomainId) params.set('subdomainId', subdomainId)
    if (ksaId) params.set('ksaId', ksaId)
    if (cognitiveLevel) params.set('cognitiveLevel', cognitiveLevel)
    if (qualifier) params.set('qualifier', qualifier)
    navigate(`/practice/session?${params.toString()}`)
  }

  return (
    <div className="stack-lg">
      <section className="card">
        <div className="eyebrow">Practice Mode</div>
        <h2>Build a quiz session</h2>
        <p>
          Filter by domain, KSA, cognitive level, and qualifier. In v1, weak areas are a placeholder you can wire into analytics later.
        </p>
      </section>

      <section className="card form-card">
        <div className="grid two-up">
          <label className="field">
            <span>Domain</span>
            <select value={domainId} onChange={(e) => { setDomainId(e.target.value); setSubdomainId(''); setKsaId('') }}>
              <option value="">All domains</option>
              {domains.map((d) => (
                <option key={d.id} value={d.id}>{d.code} · {d.title}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Subdomain</span>
            <select value={subdomainId} onChange={(e) => { setSubdomainId(e.target.value); setKsaId('') }}>
              <option value="">All subdomains</option>
              {filteredSubdomains.map((s) => (
                <option key={s.id} value={s.id}>{s.code} · {s.title}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>KSA</span>
            <select value={ksaId} onChange={(e) => setKsaId(e.target.value)}>
              <option value="">All KSAs</option>
              {filteredKsas.map((k) => (
                <option key={k.id} value={k.id}>{k.title}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Weak areas</span>
            <select disabled>
              <option>Coming in a later version</option>
            </select>
          </label>
        </div>

        <div className="stack-md push-top">
          <div>
            <div className="field-label">Cognitive level</div>
            <div className="chip-row">
              <button type="button" className={`chip ${cognitiveLevel === '' ? 'active' : ''}`} onClick={() => setCognitiveLevel('')}>All</button>
              {cognitiveOptions.map((level) => (
                <button type="button" key={level} className={`chip ${cognitiveLevel === level ? 'active' : ''}`} onClick={() => setCognitiveLevel(level)}>
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="field-label">Question qualifier</div>
            <div className="chip-row">
              <button type="button" className={`chip ${qualifier === '' ? 'active' : ''}`} onClick={() => setQualifier('')}>All</button>
              {qualifierOptions.map((q) => (
                <button type="button" key={q} className={`chip ${qualifier === q ? 'active' : ''}`} onClick={() => setQualifier(q)}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="card action-card">
        <h3>Session preview</h3>
        <p>{previewQuestions.length} question(s) currently match these filters.</p>
        <button type="button" className="button" onClick={startSession} disabled={previewQuestions.length === 0}>
          Start session
        </button>
      </section>
    </div>
  )
}
