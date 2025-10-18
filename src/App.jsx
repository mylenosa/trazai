import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout'

// Auth
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Pages
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import CreateEvent from './pages/CreateEvent'
import EventDetails from './pages/EventDetails'
import PublicEvent from './pages/PublicEvent'
import Upgrade from './pages/Upgrade'
import UpgradeConfirm from './pages/UpgradeConfirm'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-event"
              element={
                <ProtectedRoute>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />

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