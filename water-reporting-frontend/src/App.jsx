import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';

// Citizen Pages
import Home from './pages/citizen/Home';
import ReportIssue from './pages/citizen/ReportIssue';
import MyReports from './pages/citizen/MyReports';
import ReportDetails from './pages/citizen/ReportDetails';
import AreaHealth from './pages/citizen/AreaHealth';

// Authority Pages
import AuthorityDashboard from './pages/authority/Dashboard';
import IssueManagement from './pages/authority/IssueManagement';
import Analytics from './pages/authority/Analytics';
import TeamManagement from './pages/authority/TeamManagement';
import GlobalMap from './pages/authority/GlobalMap';
import SharedResponsibilities from './pages/authority/SharedResponsibilities';

// Public Pages
import PublicDashboard from './pages/public/PublicDashboard';
import MapView from './pages/public/MapView';
import Statistics from './pages/public/Statistics';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';

// Components
import NotificationToast from './components/common/NotificationToast';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';
import ScrollToTop from './components/common/ScrollToTop';

import './App.css';

function App() {
  return (
    <div className="min-h-screen">
      <AuthProvider>
        <ThemeProvider>
          <NotificationProvider>
            <NotificationToast />
            <Router>
              <ScrollToTop />
              <MainLayout>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  } />
                  <Route path="/register" element={
                    <PublicRoute>
                      <Register />
                    </PublicRoute>
                  } />

                  {/* Public Data Pages (Sidebar hidden if not logged in via MainLayout) */}
                  <Route path="/dashboard" element={<PublicDashboard />} />
                  <Route path="/map" element={<MapView />} />
                  <Route path="/statistics" element={<Statistics />} />

                  {/* Citizen Protected Routes - Redirects to Login if not auth */}
                  <Route path="/" element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  } />
                  <Route path="/report" element={
                    <ProtectedRoute>
                      <ReportIssue />
                    </ProtectedRoute>
                  } />
                  <Route path="/my-reports" element={
                    <ProtectedRoute>
                      <MyReports />
                    </ProtectedRoute>
                  } />
                  <Route path="/report/:id" element={
                    <ProtectedRoute>
                      <ReportDetails />
                    </ProtectedRoute>
                  } />
                  <Route path="/area-health" element={
                    <ProtectedRoute>
                      <AreaHealth />
                    </ProtectedRoute>
                  } />

                  {/* Protected Routes (Empty for now until more personalization is added) */}

                  {/* Authority Routes - Protected with Role */}
                  <Route path="/authority/dashboard" element={
                    <ProtectedRoute allowedRole="authority">
                      <AuthorityDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/authority/issues" element={
                    <ProtectedRoute allowedRole="authority">
                      <IssueManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/authority/analytics" element={
                    <ProtectedRoute allowedRole="authority">
                      <Analytics />
                    </ProtectedRoute>
                  } />
                  <Route path="/authority/teams" element={
                    <ProtectedRoute allowedRole="authority">
                      <TeamManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/authority/map" element={
                    <ProtectedRoute allowedRole="authority">
                      <GlobalMap />
                    </ProtectedRoute>
                  } />
                  <Route path="/authority/security" element={
                    <ProtectedRoute allowedRole="authority">
                      <SharedResponsibilities />
                    </ProtectedRoute>
                  } />
                </Routes>
              </MainLayout>
            </Router>
          </NotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
