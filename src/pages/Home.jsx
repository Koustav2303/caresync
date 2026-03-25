import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  HeartPulse, Activity, ShieldCheck, Clock, 
  Search, CalendarCheck, Video, ArrowRight,
  Star, Users, Building, Award
} from 'lucide-react';
import Button from '../components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  useGSAP(() => {
    // Hero Animations
    const tl = gsap.timeline();
    tl.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.2 })
      .fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .fromTo('.hero-btns', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .fromTo('.hero-image', { opacity: 0, scale: 0.95, x: 40 }, { opacity: 1, scale: 1, x: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6');

    // Scroll Animations for Features
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });

    // Stats Counter Animation
    gsap.utils.toArray('.stat-number').forEach((stat) => {
      const target = parseFloat(stat.getAttribute('data-target'));
      gsap.to(stat, {
        innerHTML: target,
        duration: 2,
        ease: 'power2.out',
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: stat,
          start: 'top 80%',
        }
      });
    });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans" ref={containerRef}>
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary-50 mix-blend-multiply blur-3xl opacity-70"></div>
          <div className="absolute top-40 -left-20 w-[500px] h-[500px] rounded-full bg-blue-50 mix-blend-multiply blur-3xl opacity-70"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Hero Content */}
            <div className="max-w-2xl">
              <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-bold uppercase tracking-wider mb-6 border border-primary-100">
                <HeartPulse size={16} /> #1 Healthcare Platform
              </div>
              <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-gray-900 tracking-tight mb-6 leading-[1.1]">
                Modern care, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
                  centered around you.
                </span>
              </h1>
              <p className="hero-desc text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with top-rated specialists, manage your medical records, and attend virtual consultations—all from one secure platform.
              </p>
              
              <div className="hero-btns flex flex-col sm:flex-row gap-4">
                <Link to="/doctors">
                  <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl text-base px-8 py-4">
                    Find a Doctor
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 py-4 bg-white">
                    Explore Services
                  </Button>
                </Link>
              </div>

              <div className="hero-btns mt-10 flex items-center gap-4 text-sm text-gray-500 font-medium">
                <div className="flex -space-x-3">
                  <img src="https://i.pravatar.cc/100?u=1" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="https://i.pravatar.cc/100?u=2" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="https://i.pravatar.cc/100?u=3" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">+2k</div>
                </div>
                <p>Trusted by thousands of patients.</p>
              </div>
            </div>

            {/* Hero Image / UI Mockup */}
            <div className="hero-image relative hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Doctor with patient" 
                  className="w-full h-[600px] object-cover opacity-90"
                />
                
                {/* Floating UI Elements overlay */}
                <div className="absolute top-10 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="w-12 h-12 bg-success-50 rounded-full flex items-center justify-center text-success-500">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Status</p>
                    <p className="text-sm font-bold text-gray-900">Fully Protected</p>
                  </div>
                </div>

                <div className="absolute bottom-10 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
                    <CalendarCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Next Visit</p>
                    <p className="text-sm font-bold text-gray-900">Tomorrow, 10 AM</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-12 bg-primary-900 border-y border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-primary-800/50">
            <div>
              <p className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 flex items-center justify-center gap-1">
                <span className="stat-number" data-target="150">0</span>+
              </p>
              <p className="text-primary-200 text-sm font-medium uppercase tracking-wider">Top Specialists</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 flex items-center justify-center gap-1">
                <span className="stat-number" data-target="50">0</span>k+
              </p>
              <p className="text-primary-200 text-sm font-medium uppercase tracking-wider">Active Patients</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 flex items-center justify-center gap-1">
                <span className="stat-number" data-target="98">0</span>%
              </p>
              <p className="text-primary-200 text-sm font-medium uppercase tracking-wider">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 flex items-center justify-center gap-1">
                <span className="stat-number" data-target="24">0</span>/7
              </p>
              <p className="text-primary-200 text-sm font-medium uppercase tracking-wider">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Your health, simplified.</h2>
            <p className="text-lg text-gray-600">We have designed a seamless experience to get you the care you need, exactly when you need it.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-gray-200 via-primary-300 to-gray-200 z-0"></div>

            {[
              { icon: Search, title: 'Find your doctor', desc: 'Filter by specialty, location, or availability to find the perfect match for your needs.', step: '01' },
              { icon: CalendarCheck, title: 'Book instantly', desc: 'Choose a time that works for you and book your appointment in just three clicks.', step: '02' },
              { icon: Video, title: 'Get expert care', desc: 'Attend your consultation in-person or via secure, high-definition video call.', step: '03' },
            ].map((feature, i) => (
              <div key={i} className="feature-card relative z-10 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-20 h-20 mx-auto bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6 relative">
                  <feature.icon size={36} />
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-900 shadow-sm">
                    {feature.step}
                  </div>
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION (FIXED HIGH CONTRAST BUTTONS) --- */}
      <section className="bg-primary-900 py-24 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-700 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            Ready to take control of your health?
          </h2>
          <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of patients who trust CareSync for their daily healthcare needs. Sign up today for free.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth/signup">
              {/* SOLID WHITE BUTTON FIX */}
              <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary-900 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Create Free Account
              </button>
            </Link>
            <Link to="/doctors">
              {/* TRANSLUCENT GLASS BUTTON FIX */}
              <button className="w-full sm:w-auto px-8 py-3.5 bg-primary-800/50 text-white font-bold rounded-xl border border-primary-700 hover:bg-primary-700 transition-all backdrop-blur-sm">
                Find a Doctor
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;