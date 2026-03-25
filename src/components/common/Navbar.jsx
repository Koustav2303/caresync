import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, HeartPulse } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from '../ui/Button';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Find Doctors', path: '/doctors' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const { contextSafe } = useGSAP();
  const location = useLocation();

  // Close mobile menu automatically when the route changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  }, [location.pathname]);

  // GSAP animation for toggling the mobile menu
  const toggleMobileMenu = contextSafe(() => {
    if (isMobileMenuOpen) {
      // Close animation
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.inOut",
        onComplete: () => setIsMobileMenuOpen(false)
      });
    } else {
      // Open animation
      setIsMobileMenuOpen(true);
      gsap.fromTo(mobileMenuRef.current, 
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  });

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg">
            <div className="bg-primary-50 p-2 rounded-xl group-hover:bg-primary-100 transition-colors duration-300">
              <HeartPulse className="h-6 w-6 text-primary-600" />
            </div>
            <span className="font-heading font-bold text-2xl tracking-tight text-gray-900">
              Care<span className="text-primary-600">Sync</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || 
                               (link.path !== '/' && location.pathname.startsWith(link.path));
              
              return (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`text-sm font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md px-2 py-1 ${
                    isActive 
                      ? 'text-primary-600' 
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/auth/login" tabIndex={-1}>
              <Button variant="ghost" size="sm" className="font-semibold">Log In</Button>
            </Link>
            <Link to="/auth/signup" tabIndex={-1}>
              <Button variant="primary" size="sm" className="font-semibold shadow-md hover:shadow-lg">Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="text-gray-600 hover:text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 p-2 rounded-xl transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        ref={mobileMenuRef} 
        className="md:hidden overflow-hidden bg-white border-b border-gray-100 absolute w-full left-0 shadow-lg"
        style={{ height: 0, opacity: 0 }} // Initial state for GSAP
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || 
                             (link.path !== '/' && location.pathname.startsWith(link.path));
            
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive 
                    ? 'text-primary-700 bg-primary-50' 
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          {/* Mobile Auth Buttons */}
          <div className="pt-6 mt-4 border-t border-gray-100 flex flex-col gap-3 px-2">
             <Link to="/auth/login" tabIndex={-1} className="w-full">
               <Button variant="outline" className="w-full justify-center py-3 text-base">Log In</Button>
             </Link>
             <Link to="/auth/signup" tabIndex={-1} className="w-full">
               <Button variant="primary" className="w-full justify-center py-3 text-base shadow-md">Sign Up for Free</Button>
             </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;