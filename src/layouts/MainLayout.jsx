import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { HeartPulse, Menu, X, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // <-- ADD THIS
import Button from '../components/ui/Button';

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For user avatar menu
  const location = useLocation();
  const { user, logout } = useAuth(); // <-- GET AUTH STATE
  
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
    <div className="min-h-screen flex flex-col font-sans">
      {/* --- NAVBAR --- */}
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
                /* SHOW IF LOGGED OUT */
                <>
                  <Link to="/auth/login" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">Log In</Link>
                  <Link to="/auth/signup">
                    <Button variant="primary">Sign Up</Button>
                  </Link>
                </>
              ) : (
                /* SHOW IF LOGGED IN (Cool Dropdown) */
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 p-1 pr-3 rounded-full border border-gray-200 hover:border-primary-300 hover:bg-gray-50 transition-all focus:outline-none"
                  >
                    <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm font-bold text-gray-700">{user.name.split(' ')[0]}</span>
                  </button>

                  {/* Dropdown Menu */}
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

      {/* --- PAGE CONTENT --- */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* --- FOOTER --- */}
      {/* (Keep your existing footer code here) */}
    </div>
  );
};

export default MainLayout;