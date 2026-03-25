import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // <-- 1. CRITICAL: Import the provider

// --- LAYOUTS ---
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/auth/AuthLayout';
import DashboardLayout from './layouts/dashboard/DashboardLayout';

// --- PUBLIC PAGES ---
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import DoctorListing from './pages/doctors/DoctorListing';
import DoctorProfile from './pages/doctors/DoctorProfile';

// --- AUTHENTICATION PAGES ---
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// --- DASHBOARD PAGES ---
import DashboardOverview from './pages/dashboard/DashboardOverview';
import SymptomChecker from './pages/dashboard/SymptomChecker';
import MedicalRecords from './pages/dashboard/MedicalRecords';
import Appointments from './pages/dashboard/Appointments';
import Messages from './pages/dashboard/Messages';
import Settings from './pages/dashboard/Settings';

function App() {
  return (
    <Router>
      {/* 2. CRITICAL: Wrap all Routes inside the AuthProvider */}
      <AuthProvider> 
        <Routes>
          
          {/* 1. PUBLIC WEBSITE ROUTES */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<Contact />} />
            <Route path="doctors" element={<DoctorListing />} />
            <Route path="doctors/:id" element={<DoctorProfile />} />
          </Route>

          {/* 2. AUTHENTICATION ROUTES */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/* 3. PROTECTED DASHBOARD ROUTES */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="symptoms" element={<SymptomChecker />} />
            <Route path="records" element={<MedicalRecords />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<Settings />} />
          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;