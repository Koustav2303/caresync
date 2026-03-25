import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { HeartPulse, Menu, X, LayoutDashboard, Settings, LogOut, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const dropdownRef = useRef(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      
      {/* ================= NAVBAR ================= */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary-50 p-2 rounded-xl group-hover:bg-primary-100 transition-colors">
                <HeartPulse className="h-6 w-6 text-primary-600" />
              </div>
              <span className="font-heading font-bold text-2xl text-gray-900 tracking-tight">
                Care<span className="text-primary-600">Sync</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors">Home</Link>
              <Link to="/doctors" className="text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors">Find Doctors</Link>
              <Link to="/services" className="text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors">Services</Link>
              <Link to="/contact" className="text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors">Contact</Link>
            </div>

            {/* Desktop Auth / User Menu */}
            <div className="hidden md:flex items-center gap-4">
              {!user ? (
                <>
                  <Link to="/auth/login" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">Log In</Link>
                  <Link to="/auth/signup">
                    <Button variant="primary" className="shadow-md">Sign Up</Button>
                  </Link>
                </>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 p-1 pr-3 rounded-full border border-gray-200 hover:border-primary-300 hover:bg-gray-50 transition-all focus:outline-none"
                  >
                    <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm font-bold text-gray-700">{user.name.split(' ')[0]}</span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-50">
                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <div className="p-2 space-y-1">
                        <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-primary-50 hover:text-primary-700 transition-colors">
                          <LayoutDashboard size={16} /> Patient Dashboard
                        </Link>
                        <Link to="/dashboard/settings" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-primary-50 hover:text-primary-700 transition-colors">
                          <Settings size={16} /> Account Settings
                        </Link>
                      </div>
                      <div className="p-2 border-t border-gray-50">
                        <button 
                          onClick={logout}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors text-left"
                        >
                          <LogOut size={16} /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none p-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE MENU --- */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-4 absolute w-full shadow-lg">
            <Link to="/" className="block px-3 py-2 rounded-xl text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary-600">Home</Link>
            <Link to="/doctors" className="block px-3 py-2 rounded-xl text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary-600">Find Doctors</Link>
            <Link to="/services" className="block px-3 py-2 rounded-xl text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary-600">Services</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-xl text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary-600">Contact</Link>
            
            <div className="border-t border-gray-100 pt-4 mt-2">
              {!user ? (
                <div className="grid grid-cols-2 gap-3 px-3">
                  <Link to="/auth/login"><Button variant="outline" className="w-full">Log In</Button></Link>
                  <Link to="/auth/signup"><Button variant="primary" className="w-full">Sign Up</Button></Link>
                </div>
              ) : (
                <div className="space-y-2 px-3">
                  <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                    <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Link to="/dashboard"><Button variant="primary" className="w-full justify-center"><LayoutDashboard size={18} className="mr-2"/> Dashboard</Button></Link>
                  <Button variant="outline" className="w-full justify-center text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300" onClick={logout}><LogOut size={18} className="mr-2"/> Log Out</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* ================= PAGE CONTENT ================= */}
      {/* flex-1 ensures the content expands to push the footer to the bottom */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#0a192f] text-gray-300 pt-20 pb-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-primary-500 p-2 rounded-xl">
                  <HeartPulse className="h-6 w-6 text-white" />
                </div>
                <span className="font-heading font-bold text-2xl text-white tracking-tight">
                  Care<span className="text-primary-500">Sync</span>
                </span>
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                Premium healthcare management system. Connecting you with top specialists for a healthier tomorrow.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all"><Facebook size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all"><Twitter size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all"><Linkedin size={18} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
              <ul className="space-y-4 text-sm">
                <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
                <li><Link to="/doctors" className="hover:text-primary-400 transition-colors">Find a Doctor</Link></li>
                <li><Link to="/services" className="hover:text-primary-400 transition-colors">Our Services</Link></li>
                <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact Us</Link></li>
                <li><Link to="/auth/login" className="hover:text-primary-400 transition-colors">Patient Login</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Legal</h3>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">HIPAA Compliance</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Accessibility</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary-500 shrink-0 mt-0.5" />
                  <span>123 Health Avenue, Medical District,<br/>New York, NY 10001</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-primary-500 shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-primary-500 shrink-0" />
                  <span>support@caresync.com</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} CareSync Medical Technologies. All rights reserved.</p>
            <p className="flex items-center gap-1">Designed with <HeartPulse size={14} className="text-primary-500" /> for better health.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default MainLayout;