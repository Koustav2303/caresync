import { HashRouter as Router, Routes, Route } from 'react-router-dom';

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
      <Routes>
        
        {/* 1. PUBLIC WEBSITE ROUTES (Wrapped in Navbar/Footer) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="doctors" element={<DoctorListing />} />
          <Route path="doctors/:id" element={<DoctorProfile />} />
        </Route>

        {/* 2. AUTHENTICATION ROUTES (Split-Screen Premium Layout) */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* 3. PROTECTED DASHBOARD ROUTES (Sidebar & Topbar Layout) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="symptoms" element={<SymptomChecker />} />
          <Route path="records" element={<MedicalRecords />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;