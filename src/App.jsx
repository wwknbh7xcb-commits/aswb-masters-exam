import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import StudyMapPage from './pages/StudyMapPage'
import DomainPage from './pages/DomainPage'
import LearnPage from './pages/LearnPage'
import PracticePage from './pages/PracticePage'
import PracticeSessionPage from './pages/PracticeSessionPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/study-map" element={<StudyMapPage />} />
        <Route path="/domain/:domainId" element={<DomainPage />} />
        <Route path="/learn/:ksaId" element={<LearnPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/practice/session" element={<PracticeSessionPage />} />
      </Routes>
    </Layout>
  )
}
