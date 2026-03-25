import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  LayoutDashboard, CalendarCheck, FileText, Activity, 
  MessageSquare, Settings, LogOut, Bell, Search, Menu, 
  X, HeartPulse, ChevronDown
} from 'lucide-react';

const sidebarLinks = [
  { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Appointments', path: '/dashboard/appointments', icon: CalendarCheck },
  { name: 'Medical Records', path: '/dashboard/records', icon: FileText },
  { name: 'Symptom Checker', path: '/dashboard/symptoms', icon: Activity },
  { name: 'Messages', path: '/dashboard/messages', icon: MessageSquare },
  { name: 'Settings', path: '/dashboard/settings', icon: Settings },
];

const DashboardLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { contextSafe } = useGSAP();

  // Close mobile sidebar on route change
  useEffect(() => {
    if (isMobileSidebarOpen) toggleMobileSidebar();
  }, [location.pathname]);

  const toggleMobileSidebar = contextSafe(() => {
    if (isMobileSidebarOpen) {
      gsap.to(sidebarRef.current, { x: '-100%', duration: 0.3, ease: 'power3.inOut' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: () => setIsMobileSidebarOpen(false) });
    } else {
      setIsMobileSidebarOpen(true);
      gsap.to(sidebarRef.current, { x: '0%', duration: 0.3, ease: 'power3.out' });
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
    }
  });

  const handleLogout = () => {
    // Mock logout logic
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      
      {/* Mobile Sidebar Overlay */}
      <div 
        ref={overlayRef}
        onClick={toggleMobileSidebar}
        className={`fixed inset-0 bg-gray-900/50 z-40 lg:hidden ${isMobileSidebarOpen ? 'block' : 'hidden'}`}
        style={{ opacity: 0 }}
      ></div>

      {/* --- SIDEBAR --- */}
      <aside 
        ref={sidebarRef}
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 z-50 transform lg:transform-none transition-none flex flex-col ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary-50 p-2 rounded-xl">
              <HeartPulse className="h-6 w-6 text-primary-600" />
            </div>
            <span className="font-heading font-bold text-2xl text-gray-900">
              Care<span className="text-primary-600">Sync</span>
            </span>
          </Link>
          <button onClick={toggleMobileSidebar} className="lg:hidden text-gray-500 hover:text-gray-900">
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Main Menu</p>
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                }`}
              >
                <link.icon size={20} className={isActive ? 'text-white' : 'text-gray-400'} />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer (Logout) */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={toggleMobileSidebar} className="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-lg hover:bg-gray-50">
              <Menu size={24} />
            </button>
            
            {/* Dashboard Search */}
            <div className="hidden md:flex items-center bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20 transition-all w-80">
              <Search size={18} className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search appointments, records..." 
                className="bg-transparent border-none focus:outline-none text-sm w-full text-gray-700 placeholder-gray-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors">
              <Bell size={22} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 focus:outline-none"
              >
                <img src="https://i.pravatar.cc/150?u=patient" alt="User" className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm" />
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-bold text-gray-900 leading-none mb-1">Alex Johnson</p>
                  <p className="text-xs text-gray-500 font-medium">Patient</p>
                </div>
                <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
              </button>

              {/* Simple Mock Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <Link to="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Profile</Link>
                  <Link to="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Account Settings</Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign Out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;