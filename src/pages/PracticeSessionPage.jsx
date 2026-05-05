import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getQuestionsByFilters } from '../utils'

export default function PracticeSessionPage() {
  const [searchParams] = useSearchParams()
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const filters = {
    domainId: searchParams.get('domainId') || '',
    subdomainId: searchParams.get('subdomainId') || '',
    ksaId: searchParams.get('ksaId') || '',
    cognitiveLevel: searchParams.get('cognitiveLevel') || '',
    qualifier: searchParams.get('qualifier') || '',
  }

  const sessionQuestions = useMemo(() => getQuestionsByFilters(filters), [searchParams.toString()])
  const question = sessionQuestions[index]

  if (!question) {
    return (
      <section className="card">
        <h2>No questions found</h2>
        <p>Try broadening your filters in Practice Mode.</p>
        <Link to="/practice" className="button">Back to Practice Builder</Link>
      </section>
    )
  }

  const selectedOption = question.options.find((opt) => opt.id === selected)
  const isCorrect = selected === question.correctAnswer
  const isLast = index === sessionQuestions.length - 1

  function handleNext() {
    setSelected('')
    setSubmitted(false)
    setIndex((prev) => prev + 1)
  }

  return (
    <div className="stack-lg">
      <section className="card">
        <div className="meta-row">
          <span>Question {index + 1} of {sessionQuestions.length}</span>
          <span>{question.cognitiveLevel}</span>
          <span>{question.qualifier}</span>
        </div>
        <h2>{question.stem}</h2>
      </section>

      <section className="card">
        <div className="options-list">
          {question.options.map((option) => {
            const checked = selected === option.id
            const revealCorrect = submitted && option.id === question.correctAnswer
            const revealIncorrect = submitted && checked && option.id !== question.correctAnswer

            return (
              <button
                type="button"
                key={option.id}
                className={`option ${checked ? 'selected' : ''} ${revealCorrect ? 'correct' : ''} ${revealIncorrect ? 'incorrect' : ''}`}
                onClick={() => !submitted && setSelected(option.id)}
                disabled={submitted}
              >
                <strong>{option.id}.</strong> {option.text}
              </button>
            )
          })}
        </div>

        {!submitted ? (
          <button type="button" className="button push-top" onClick={() => setSubmitted(true)} disabled={!selected}>
            Submit answer
          </button>
        ) : (
          <div className="stack-md push-top">
            <section className="nested-card">
              <h3>{isCorrect ? 'Correct' : 'Not quite'}</h3>
              <p>{question.rationale.correct}</p>
              {!isCorrect && selectedOption ? (
                <p>
                  <strong>Why {selectedOption.id} is not the best answer:</strong> {question.rationale.incorrect[selectedOption.id]}
                </p>
              ) : null}
            </section>

            {!isLast ? (
              <button type="button" className="button" onClick={handleNext}>Next question</button>
            ) : (
              <Link className="button" to="/practice">Back to Practice Builder</Link>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
