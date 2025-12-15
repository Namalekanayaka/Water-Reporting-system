import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';

// Citizen Pages
import Home from './pages/citizen/Home';
import ReportIssue from './pages/citizen/ReportIssue';
import MyReports from './pages/citizen/MyReports';
import AreaHealth from './pages/citizen/AreaHealth';

// Authority Pages
import AuthorityDashboard from './pages/authority/Dashboard';
import IssueManagement from './pages/authority/IssueManagement';
import Analytics from './pages/authority/Analytics';
import TeamManagement from './pages/authority/TeamManagement';

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

import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      <AuthProvider>
        <ThemeProvider>
          <NotificationProvider>
            <Router>
              <MainLayout>
                <Routes>
                  {/* Citizen Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/report" element={<ReportIssue />} />
                  <Route path="/my-reports" element={<MyReports />} />
                  <Route path="/area-health" element={<AreaHealth />} />

                  {/* Authority Routes */}
                  <Route path="/authority/dashboard" element={<AuthorityDashboard />} />
                  <Route path="/authority/issues" element={<IssueManagement />} />
                  <Route path="/authority/analytics" element={<Analytics />} />
                  <Route path="/authority/teams" element={<TeamManagement />} />

                  {/* Public Routes */}
                  <Route path="/dashboard" element={<PublicDashboard />} />
                  <Route path="/map" element={<MapView />} />
                  <Route path="/statistics" element={<Statistics />} />

                  {/* Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
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
