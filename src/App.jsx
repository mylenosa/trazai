import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import { AuthProvider } from './contexts/AuthContext'

// Pages
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import CreateEvent from './pages/CreateEvent'
import EventDetails from './pages/EventDetails'
import PublicEvent from './pages/PublicEvent'
import Upgrade from './pages/Upgrade'
import UpgradeConfirm from './pages/UpgradeConfirm'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/public-event" element={<PublicEvent />} />
            <Route path="/upgrade" element={<Upgrade />} />
            <Route path="/upgrade/confirm" element={<UpgradeConfirm />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  )
}

export default App