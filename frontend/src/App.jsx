import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ClubsPage from './pages/ClubsPage'
import ClubDetailPage from './pages/ClubDetailPage'
import EventsPage from './pages/EventsPage'

import StudentDashboard from './pages/student/StudentDashboard'
import CoordinatorDashboard from './pages/coordinator/CoordinatorDashboard'
import CreateClubPage from './pages/coordinator/CreateClubPage'
import CreateEventPage from './pages/coordinator/CreateEventPage'

import AdminDashboard from './pages/admin/AdminDashboard'
import ManageUsersPage from './pages/admin/ManageUsersPage'
import ManageClubsPage from './pages/admin/ManageClubsPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#13142a', color: '#f0f0ff', border: '1px solid rgba(108,99,255,0.3)' },
            success: { iconTheme: { primary: '#22d3a0', secondary: '#13142a' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#13142a' } },
          }}
        />
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/clubs/:id" element={<ClubDetailPage />} />
          <Route path="/events" element={<EventsPage />} />

          {/* Student */}
          <Route path="/student/dashboard" element={
            <PrivateRoute roles={['STUDENT']}><StudentDashboard /></PrivateRoute>
          } />

          {/* Coordinator */}
          <Route path="/coordinator/dashboard" element={
            <PrivateRoute roles={['COORDINATOR']}><CoordinatorDashboard /></PrivateRoute>
          } />
          <Route path="/coordinator/club/new" element={
            <PrivateRoute roles={['COORDINATOR']}><CreateClubPage /></PrivateRoute>
          } />
          <Route path="/coordinator/events/new" element={
            <PrivateRoute roles={['COORDINATOR']}><CreateEventPage /></PrivateRoute>
          } />

          {/* Admin */}
          <Route path="/admin/dashboard" element={
            <PrivateRoute roles={['ADMIN']}><AdminDashboard /></PrivateRoute>
          } />
          <Route path="/admin/users" element={
            <PrivateRoute roles={['ADMIN']}><ManageUsersPage /></PrivateRoute>
          } />
          <Route path="/admin/clubs" element={
            <PrivateRoute roles={['ADMIN']}><ManageClubsPage /></PrivateRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
