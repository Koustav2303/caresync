import { Outlet, Link } from 'react-router-dom';
import { HeartPulse, ShieldCheck, Activity } from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const AuthLayout = () => {
  const brandPanelRef = useRef(null);
  const iconRef1 = useRef(null);
  const iconRef2 = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(brandPanelRef.current, 
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1 }
    )
    .fromTo([iconRef1.current, iconRef2.current],
      { scale: 0, opacity: 0, rotation: -45 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.2 },
      "-=0.4"
    );
  });

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Column - Form Area */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-[480px] xl:w-[560px] lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 group w-max">
              <div className="bg-primary-50 p-2 rounded-lg group-hover:bg-primary-100 transition-colors">
                <HeartPulse className="h-6 w-6 text-primary-600" />
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight text-gray-900">
                Care<span className="text-primary-600">Sync</span>
              </span>
            </Link>
          </div>
          
          <Outlet />
        </div>
      </div>

      {/* Right Column - Premium Branding Panel */}
      <div className="hidden lg:flex flex-1 relative bg-gray-50 items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-48 -left-24 w-72 h-72 bg-success-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        <div ref={brandPanelRef} className="relative z-10 max-w-lg text-center">
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-6 leading-tight">
            Managing your health has never been easier.
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Join thousands of patients and doctors experiencing seamless appointment scheduling, medical records management, and real-time consultations.
          </p>

          <div className="grid grid-cols-2 gap-6 text-left">
            <div ref={iconRef1} className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
              <ShieldCheck className="h-8 w-8 text-success-500 mb-4" />
              <h3 className="font-heading font-semibold text-gray-900 mb-2">Secure Data</h3>
              <p className="text-sm text-gray-500">HIPAA compliant infrastructure keeping your medical records safe.</p>
            </div>
            <div ref={iconRef2} className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
              <Activity className="h-8 w-8 text-primary-500 mb-4" />
              <h3 className="font-heading font-semibold text-gray-900 mb-2">Smart Tracking</h3>
              <p className="text-sm text-gray-500">Monitor your vital signs and upcoming appointments in real-time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;