import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Search, Calendar, Video, FileText, Star, Activity, 
  Shield, Clock, ChevronRight, CheckCircle2, MapPin
} from 'lucide-react';
import Button from '../components/ui/Button';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// --- MOCK DATA ---
const stats = [
  { id: 1, label: 'Active Doctors', value: '500+' },
  { id: 2, label: 'Happy Patients', value: '50k+' },
  { id: 3, label: 'Specialties', value: '40+' },
  { id: 4, label: 'Partner Hospitals', value: '120+' },
];

const services = [
  { id: 1, icon: Calendar, title: 'In-Clinic Booking', desc: 'Book confirmed appointments with top doctors in your city.' },
  { id: 2, icon: Video, title: 'Video Consultations', desc: 'Consult with specialists from the comfort of your home.' },
  { id: 3, icon: FileText, title: 'Health Records', desc: 'Securely store and access your medical history anytime.' },
  { id: 4, icon: Shield, title: 'Prescription Tracking', desc: 'Manage your active prescriptions and refill reminders.' },
];

const topDoctors = [
  { id: 1, name: 'Dr. Sarah Jenkins', specialty: 'Cardiologist', rating: 4.9, reviews: 128, image: 'https://i.pravatar.cc/150?u=sarah', location: 'New York, NY' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurologist', rating: 4.8, reviews: 95, image: 'https://i.pravatar.cc/150?u=michael', location: 'San Francisco, CA' },
  { id: 3, name: 'Dr. Emily Carter', specialty: 'Pediatrician', rating: 5.0, reviews: 210, image: 'https://i.pravatar.cc/150?u=emily', location: 'Chicago, IL' },
  { id: 4, name: 'Dr. James Wilson', specialty: 'Dermatologist', rating: 4.7, reviews: 84, image: 'https://i.pravatar.cc/150?u=james', location: 'Austin, TX' },
];

const steps = [
  { id: 1, title: 'Search for a Specialist', desc: 'Find the right doctor by specialty, location, or symptom.' },
  { id: 2, title: 'Choose your Time', desc: 'Select an available time slot that fits your schedule perfectly.' },
  { id: 3, title: 'Book & Confirm', desc: 'Confirm your appointment and receive instant notifications.' },
];

const Home = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const floatingCard1 = useRef(null);
  const floatingCard2 = useRef(null);

  useGSAP(() => {
    // 1. Hero Entrance Animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo('.hero-badge', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo('.hero-title', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8 }, 
      '-=0.4'
    )
    .fromTo('.hero-desc', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6 }, 
      '-=0.6'
    )
    .fromTo('.hero-search', 
      { opacity: 0, y: 20, scale: 0.95 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.6 }, 
      '-=0.4'
    )
    .fromTo(floatingCard1.current,
      { opacity: 0, x: -50, rotation: -10 },
      { opacity: 1, x: 0, rotation: -6, duration: 0.8, ease: 'back.out(1.5)' },
      '-=0.2'
    )
    .fromTo(floatingCard2.current,
      { opacity: 0, x: 50, rotation: 10 },
      { opacity: 1, x: 0, rotation: 6, duration: 0.8, ease: 'back.out(1.5)' },
      '-=0.6'
    );

    // Continuous floating animation for hero cards
    gsap.to(floatingCard1.current, {
      y: -15, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut'
    });
    gsap.to(floatingCard2.current, {
      y: 15, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.5
    });

    // 2. ScrollTrigger Animations for Sections
    const revealElements = gsap.utils.toArray('.reveal-up');
    
    revealElements.forEach((el) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        {
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Staggered Cards (Services & Doctors)
    const staggerSections = gsap.utils.toArray('.stagger-grid');
    
    staggerSections.forEach((grid) => {
      const cards = grid.querySelectorAll('.stagger-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden bg-gray-50">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-success-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium mb-6">
            <Activity size={16} />
            <span>Smart Healthcare System v2.0</span>
          </div>
          
          <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-gray-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Find the right doctor.<br className="hidden md:block" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-success-500">
              Get the right care.
            </span>
          </h1>
          
          <p className="hero-desc text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Book appointments, consult online, and manage your health records in one premium, secure healthcare platform.
          </p>

          {/* Large Search Bar */}
          <div className="hero-search max-w-3xl mx-auto bg-white p-2 md:p-3 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-2">
            <div className="flex-1 flex items-center w-full px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100">
              <Search className="text-gray-400 mr-3" size={20} />
              <input 
                type="text" 
                placeholder="Search doctors, symptoms, clinics..." 
                className="w-full focus:outline-none text-gray-700 placeholder-gray-400 bg-transparent"
              />
            </div>
            <div className="flex-1 flex items-center w-full px-4 py-2">
              <MapPin className="text-gray-400 mr-3" size={20} />
              <input 
                type="text" 
                placeholder="New York, NY" 
                className="w-full focus:outline-none text-gray-700 placeholder-gray-400 bg-transparent"
              />
            </div>
            <Button variant="primary" size="lg" className="w-full md:w-auto mt-2 md:mt-0 px-8 py-4 rounded-xl">
              Search
            </Button>
          </div>

        </div>

        {/* Floating Abstract Cards (Desktop Only) */}
        <div ref={floatingCard1} className="hidden lg:flex absolute top-40 left-[10%] bg-white p-4 rounded-2xl shadow-lg border border-gray-100 items-center gap-4 z-20">
          <div className="bg-green-100 p-3 rounded-full text-green-600">
            <Star size={24} className="fill-current" />
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-500 font-medium">Platform Rating</p>
            <p className="text-lg font-bold text-gray-900">4.9/5.0</p>
          </div>
        </div>

        <div ref={floatingCard2} className="hidden lg:flex absolute bottom-32 right-[10%] bg-white p-4 rounded-2xl shadow-lg border border-gray-100 items-center gap-4 z-20">
          <div className="flex -space-x-3">
            <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="user" />
            <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=2" alt="user" />
            <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=3" alt="user" />
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-500 font-medium">Active Patients</p>
            <p className="text-lg font-bold text-gray-900">10,000+</p>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center reveal-up">
                <p className="text-3xl md:text-4xl font-heading font-bold text-primary-600 mb-2">{stat.value}</p>
                <p className="text-sm md:text-base text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES OVERVIEW --- */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-up">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Comprehensive Care Solutions</h2>
            <p className="text-gray-600 text-lg">Everything you need to manage your health, conveniently located in one unified platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-grid">
            {services.map((service) => (
              <div key={service.id} className="stagger-card bg-white p-8 rounded-2xl shadow-soft border border-gray-100 hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-up">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">Booking an appointment has never been easier.</h2>
              <p className="text-gray-600 text-lg mb-10">Skip the waiting room. Find specialists, read verified reviews, and book your slot in under 2 minutes.</p>
              
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-success-100 text-success-600 rounded-full flex items-center justify-center font-bold text-xl border-4 border-white shadow-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-heading font-semibold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-gray-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link to="/auth/signup">
                  <Button variant="primary" size="lg" className="rounded-xl px-8">
                    Get Started Now <ChevronRight className="ml-2" size={20} />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative reveal-up lg:ml-auto">
              {/* Mockup illustration / Premium placeholder */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100 aspect-[4/3] w-full max-w-md border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Doctor with patient" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center gap-4">
                  <CheckCircle2 className="text-success-500" size={32} />
                  <div>
                    <p className="font-heading font-bold text-gray-900">Appointment Confirmed!</p>
                    <p className="text-sm text-gray-600">Today at 2:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TOP DOCTORS --- */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 reveal-up">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Top Rated Specialists</h2>
              <p className="text-gray-600 text-lg">Connect with highly reviewed healthcare professionals.</p>
            </div>
            <Link to="/doctors" className="hidden md:flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors">
              View all doctors <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-grid">
            {topDoctors.map((doc) => (
              <div key={doc.id} className="stagger-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="h-48 overflow-hidden relative">
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold flex items-center gap-1 shadow-sm">
                    <Star size={12} className="text-yellow-400 fill-current" />
                    {doc.rating}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-primary-600 text-sm font-semibold mb-1">{doc.specialty}</p>
                  <h3 className="text-lg font-heading font-bold text-gray-900 mb-2 truncate">{doc.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin size={14} className="mr-1" /> {doc.location}
                  </div>
                  <Button variant="outline" className="w-full group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-colors">
                    Book Visit
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 md:hidden text-center reveal-up">
            <Link to="/doctors">
              <Button variant="outline" className="w-full">View all doctors</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-900"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 reveal-up">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            Ready to take control of your health?
          </h2>
          <p className="text-primary-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of patients who trust CareSync for their daily healthcare needs. Sign up today for free.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto bg-white text-primary-900 hover:bg-gray-50 border-none px-8 py-4 rounded-xl shadow-lg">
                Create Free Account
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 px-8 py-4 rounded-xl">
                I already have an account
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;