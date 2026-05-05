import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/study-map', label: 'Study Map' },
  { to: '/practice', label: 'Practice' },
]

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-kicker">ASWB Clinical</div>
          <h1 className="brand-title">Exam Hub v1</h1>
          <p className="brand-subtitle">
            Study map, learn mode, and practice mode in one starter scaffold.
          </p>
        </div>

        <nav className="nav">
          {navItems.map((item) => {
            const active = location.pathname === item.to
            return (
              <Link key={item.to} to={item.to} className={`nav-link ${active ? 'active' : ''}`}>
                {item.label}
              </Link>
            )
          })}
        </nav>
      </header>

      <main className="page-wrap">{children}</main>
    </div>
  )
}
