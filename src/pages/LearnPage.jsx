import { Link, useParams } from 'react-router-dom'
import { getKSA, getLearnContent, getDomain, subdomains } from '../utils'

export default function LearnPage() {
  const { ksaId } = useParams()
  const ksa = getKSA(ksaId)
  const content = getLearnContent(ksaId)

  if (!ksa) {
    return (
      <section className="card">
        <h2>KSA not found</h2>
        <Link to="/study-map" className="button">Back to Study Map</Link>
      </section>
    )
  }

  const domain = getDomain(ksa.domainId)
  const subdomain = subdomains.find((s) => s.id === ksa.subdomainId)
  const domainClass =
    ksa.domainId || `domain-${(ksa.id || ksa.ksaId).split('-')[0].replace('d', '')}`

  return (
    <div className={`stack-lg learn-page ${domainClass}`}>
      <section className="card">
        <div className="eyebrow">Learn Mode</div>
        <h2>{ksa.title}</h2>
        <div className="meta-stack">
          <span><strong>Domain:</strong> {domain?.title}</span>
          <span><strong>Subdomain:</strong> {subdomain?.code} · {subdomain?.title}</span>
        </div>

        <div className="tag-row push-top">
          {ksa.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </section>

      {content ? (
        <>
          <section className="card">
            <h3>Plain-English explainer</h3>
            <p>{content.plainEnglish}</p>
          </section>

          <section className="card">
            <h3>What the exam is really testing</h3>
            <p>{content.examIsTesting}</p>
          </section>

          {content.knowledgeBase && (
            <section className="card">
              <h3>Knowledge base</h3>
              <div className="stack-md">
                {content.knowledgeBase.map((item) => (
                  <div key={item.title} className="nested-card">
                    <h4>{item.title}</h4>

                    {item.text && <p>{item.text}</p>}

                    {item.sections && (
                      <div className="stack-md">
                        {item.sections.map((section, index) => (
                          <div key={`${item.title}-${section.heading || index}`} className="field">
                            {section.heading && <h5>{section.heading}</h5>}

                            {section.paragraphs &&
                              section.paragraphs.map((paragraph, pIndex) => (
                                <p key={`${item.title}-p-${pIndex}`}>{paragraph}</p>
                              ))}

                            {section.bullets && section.bullets.length > 0 && (
                              <ul className="clean-list">
                                {section.bullets.map((bullet) => (
                                  <li key={bullet}>{bullet}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="card">
            <h3>Red-flag distinctions</h3>
            <ul className="clean-list">
              {content.redFlags.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h3>Common distractors</h3>
            <ul className="clean-list">
              {content.commonDistractors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h3>Mini clinical examples</h3>
            <div className="stack-md">
              {content.miniExamples.map((example) => (
                <div key={example.title} className="nested-card">
                  <h4>{example.title}</h4>
                  <p>{example.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h3>Qualifier strategy notes</h3>
            <div className="grid two-up">
              {Object.entries(content.qualifierNotes).map(([qualifier, note]) => (
                <div key={qualifier} className="nested-card">
                  <div className="pill">{qualifier}</div>
                  <p>{note}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="card">
          <h3>Placeholder content</h3>
          <p>
            This KSA exists in the blueprint, but its learn content has not been written yet.
            Use this page template as the content format for future buildout.
          </p>
        </section>
      )}

      <section className="card action-card">
        <h3>Take this KSA into Practice Mode</h3>
        <Link
          to={`/practice?domainId=${ksa.domainId}&subdomainId=${ksa.subdomainId}&ksaId=${ksa.id}`}
          className="button"
        >
          Practice this KSA
        </Link>
      </section>
    </div>
  )
}