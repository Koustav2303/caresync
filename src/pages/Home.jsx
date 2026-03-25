import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  HeartPulse, Activity, ShieldCheck, Clock, 
  Search, CalendarCheck, Video, ArrowRight,
  Star, Users, Building, Award, MessageSquare,
  FileText, Smartphone, ChevronRight, Quote
} from 'lucide-react';
import Button from '../components/ui/Button';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- MOCK DATA FOR NEW SECTIONS ---
const partners = ["Mayo Clinic", "Cleveland Clinic", "Johns Hopkins", "UCLA Health", "Mount Sinai", "Stanford Health", "Mass General"];

const testimonials = [
  { id: 1, name: "Sarah Jenkins", role: "Patient for 2 years", text: "CareSync completely changed how I manage my chronic condition. Booking is instant, and my doctor is always just a message away.", rating: 5 },
  { id: 2, name: "Michael Chen", role: "New Patient", text: "The telemedicine feature is flawless. High definition video, secure connection, and my prescriptions were sent directly to my local pharmacy.", rating: 5 },
  { id: 3, name: "Emily Rodriguez", role: "Mother of two", text: "Having all my children's medical records and upcoming vaccination schedules in one beautifully designed dashboard is a lifesaver.", rating: 5 },
];

const Home = () => {
  const mainRef = useRef(null);
  
  const { contextSafe } = useGSAP({ scope: mainRef });

  useGSAP(() => {
    // 1. HERO ANIMATION (Complex Timeline)
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    heroTl.fromTo('.hero-badge', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 })
          .fromTo('.hero-title-line', { opacity: 0, y: 50, rotateX: -20 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.15, transformOrigin: "0% 50% -50" }, '-=0.4')
          .fromTo('.hero-desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
          .fromTo('.hero-btns', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
          .fromTo('.hero-image-wrapper', { opacity: 0, scale: 0.9, x: 40 }, { opacity: 1, scale: 1, x: 0, duration: 1, ease: 'power2.out' }, '-=0.8');

    // Floating UI Cards in Hero (Continuous motion)
    gsap.to('.float-card-1', { y: -15, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    gsap.to('.float-card-2', { y: 15, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1 });

    // 2. INFINITE MARQUEE ANIMATION
    gsap.to('.marquee-track', {
      xPercent: -50,
      ease: 'none',
      duration: 20,
      repeat: -1,
    });

    // 3. STATS COUNTER WITH SCROLL TRIGGER
    gsap.utils.toArray('.stat-number').forEach((stat) => {
      const target = parseFloat(stat.getAttribute('data-target'));
      gsap.to(stat, {
        scrollTrigger: { trigger: stat, start: 'top 85%' },
        innerHTML: target,
        duration: 2.5,
        ease: 'power2.out',
        snap: { innerHTML: 1 },
      });
    });

    // 4. BENTO BOX GRID REVEAL (3D Stagger)
    gsap.fromTo('.bento-item', 
      { opacity: 0, y: 100, scale: 0.95 },
      { 
        scrollTrigger: { trigger: '.bento-grid', start: 'top 80%' },
        opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)'
      }
    );

    // 5. STICKY SCROLL SECTION (How it works)
    ScrollTrigger.create({
      trigger: ".sticky-container",
      start: "top 100px",
      end: "bottom bottom",
      pin: ".sticky-text",
      pinSpacing: false,
    });

    // Fade in sticky steps as they scroll up
    gsap.utils.toArray('.step-card').forEach((card) => {
      gsap.fromTo(card, 
        { opacity: 0, x: 50 },
        { 
          scrollTrigger: { trigger: card, start: 'top 75%', end: 'top 40%', scrub: 1 },
          opacity: 1, x: 0
        }
      );
    });

    // 6. PARALLAX BACKGROUNDS
    gsap.to('.parallax-bg', {
      yPercent: 30,
      ease: "none",
      scrollTrigger: { trigger: '.cta-section', start: "top bottom", end: "bottom top", scrub: true }
    });

  }, []);

  return (
    <div className="bg-white min-h-screen font-sans overflow-hidden" ref={mainRef}>
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden perspective-1000">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary-50 mix-blend-multiply blur-[80px] opacity-70"></div>
          <div className="absolute top-40 -left-20 w-[500px] h-[500px] rounded-full bg-blue-50 mix-blend-multiply blur-[80px] opacity-70"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Content */}
            <div className="lg:col-span-6 max-w-2xl">
              <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-primary-700 text-sm font-bold uppercase tracking-wider mb-8 border border-gray-100 shadow-sm">
                <HeartPulse size={16} className="text-primary-500" /> Next-Gen Healthcare
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-heading font-bold text-gray-900 tracking-tight mb-8 leading-[1.05]">
                <div className="hero-title-line overflow-hidden py-1">Modern care,</div>
                <div className="hero-title-line overflow-hidden py-1 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500">centered around</div>
                <div className="hero-title-line overflow-hidden py-1">your life.</div>
              </h1>
              
              <p className="hero-desc text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
                Connect with elite specialists, manage all your medical records, and attend virtual consultations through one beautifully engineered platform.
              </p>
              
              <div className="hero-btns flex flex-col sm:flex-row gap-4">
                <Link to="/doctors">
                  <Button size="lg" className="w-full sm:w-auto shadow-xl shadow-primary-500/20 text-base px-8 py-4">
                    Find a Doctor
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 py-4 bg-white border-2">
                    Explore Services
                  </Button>
                </Link>
              </div>

              <div className="hero-btns mt-12 flex items-center gap-4 text-sm text-gray-500 font-medium bg-gray-50 p-3 rounded-2xl border border-gray-100 w-max">
                <div className="flex -space-x-3">
                  <img src="https://i.pravatar.cc/100?u=11" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="https://i.pravatar.cc/100?u=22" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="https://i.pravatar.cc/100?u=33" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-700">4.9★</div>
                </div>
                <p>Trusted by <strong className="text-gray-900">10,000+</strong> patients.</p>
              </div>
            </div>

            {/* Right: Master Mockup */}
            <div className="lg:col-span-6 relative hidden lg:block hero-image-wrapper">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-100 rotate-2 hover:rotate-0 transition-transform duration-700 ease-out z-10">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Doctor with patient" 
                  className="w-full h-[650px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent mix-blend-multiply"></div>
              </div>
              
              {/* Floating UI Elements */}
              <div className="float-card-1 absolute top-20 -left-12 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white/50 flex items-center gap-4 z-20">
                <div className="w-14 h-14 bg-success-50 rounded-xl flex items-center justify-center text-success-500">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Security</p>
                  <p className="text-base font-bold text-gray-900">HIPAA Compliant</p>
                </div>
              </div>

              <div className="float-card-2 absolute bottom-24 -right-8 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white/50 flex items-center gap-4 z-20">
                <div className="relative w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                  <Video size={28} />
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Incoming Call</p>
                  <p className="text-base font-bold text-gray-900">Dr. Sarah Jenkins</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= MARQUEE PARTNERS SECTION ================= */}
      <section className="py-8 border-y border-gray-100 bg-white overflow-hidden flex items-center relative">
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex whitespace-nowrap marquee-track w-[200%]">
          {/* Double the content for seamless loop */}
          {[...partners, ...partners].map((partner, i) => (
            <div key={i} className="flex items-center justify-center w-64 shrink-0 px-8 text-xl font-heading font-bold text-gray-300 hover:text-gray-900 transition-colors cursor-default">
              {partner}
            </div>
          ))}
        </div>
      </section>

      {/* ================= STICKY SCROLL SECTION (HOW IT WORKS) ================= */}
      <section className="py-32 bg-gray-50 sticky-container relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 relative items-start">
            
            {/* Left: Pinned Text */}
            <div className="lg:w-1/3 sticky-text pt-10">
              <h2 className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-3">The Process</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6 leading-tight">Healthcare, <br/>streamlined.</h3>
              <p className="text-gray-600 text-lg mb-8">We've engineered out the waiting rooms and the paperwork. Get the care you need in three simple steps.</p>
              <Link to="/auth/signup">
                <Button variant="primary" className="shadow-md">Get Started Now</Button>
              </Link>
            </div>

            {/* Right: Scrolling Cards */}
            <div className="lg:w-2/3 space-y-8 lg:space-y-24 py-10 lg:pl-16">
              {[
                { icon: Search, color: 'text-blue-500', bg: 'bg-blue-50', title: 'Find your specialist.', desc: 'Search our vetted network of top-tier doctors by specialty, symptom, or location. Read verified patient reviews before booking.' },
                { icon: CalendarCheck, color: 'text-primary-500', bg: 'bg-primary-50', title: 'Book instantly.', desc: 'See real-time availability and book your slot instantly. No phone calls, no holding, no back-and-forth scheduling.' },
                { icon: Smartphone, color: 'text-success-500', bg: 'bg-success-50', title: 'Consult & recover.', desc: 'Attend your secure video consultation from home, or visit in-person. Prescriptions are routed directly to your local pharmacy.' },
              ].map((step, i) => (
                <div key={i} className="step-card bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden group">
                  <div className="absolute top-0 right-0 text-[12rem] font-black text-gray-50 -mt-12 -mr-8 leading-none select-none pointer-events-none group-hover:text-gray-100 transition-colors">
                    {i+1}
                  </div>
                  <div className={`w-20 h-20 shrink-0 ${step.bg} ${step.color} rounded-2xl flex items-center justify-center relative z-10`}>
                    <step.icon size={40} />
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-2xl font-heading font-bold text-gray-900 mb-4">{step.title}</h4>
                    <p className="text-gray-600 text-lg leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================= BENTO BOX FEATURES GRID ================= */}
      <section className="py-32 bg-white bento-grid overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">Everything you need. <br/>Nothing you don't.</h2>
            <p className="text-xl text-gray-600">A powerful suite of tools designed to put you back in control of your medical data.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Box 1 (Span 2 cols) */}
            <div className="bento-item md:col-span-2 bg-gray-50 rounded-[2rem] p-10 flex flex-col justify-between border border-gray-200 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white shadow-sm border border-gray-100 text-primary-600 rounded-xl flex items-center justify-center mb-6">
                  <FileText size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Centralized Records</h3>
                <p className="text-gray-600 max-w-md">Access your entire medical history, lab results, and imaging in one secure, unified dashboard.</p>
              </div>
            </div>

            {/* Box 2 (Span 1 col) */}
            <div className="bento-item bg-primary-900 text-white rounded-[2rem] p-10 flex flex-col justify-between border border-primary-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 backdrop-blur border border-white/20 text-white rounded-xl flex items-center justify-center mb-6">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Bank-Grade Security</h3>
                <p className="text-primary-100 text-sm">End-to-end encryption and full HIPAA compliance.</p>
              </div>
            </div>

            {/* Box 3 (Span 1 col) */}
            <div className="bento-item bg-blue-50 rounded-[2rem] p-10 flex flex-col justify-between border border-blue-100">
              <div>
                <div className="w-14 h-14 bg-white shadow-sm border border-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Activity size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Smart Checker</h3>
                <p className="text-gray-600 text-sm">AI-driven symptom analysis to direct you to the right care.</p>
              </div>
            </div>

            {/* Box 4 (Span 2 cols) */}
            <div className="bento-item md:col-span-2 bg-white rounded-[2rem] p-10 flex flex-col justify-between border border-gray-200 shadow-xl shadow-gray-100/50 relative overflow-hidden">
              <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                <div className="flex-1">
                  <div className="w-14 h-14 bg-gray-50 border border-gray-100 text-gray-900 rounded-xl flex items-center justify-center mb-6">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Direct Messaging</h3>
                  <p className="text-gray-600">Don't wait weeks for an answer. Message your care team directly for follow-ups and prescription refills.</p>
                </div>
                {/* Mock UI Graphic */}
                <div className="w-full md:w-64 bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col gap-3">
                  <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm self-start text-xs font-medium text-gray-600 max-w-[80%]">Are my lab results ready?</div>
                  <div className="bg-primary-600 p-3 rounded-lg text-white shadow-sm self-end text-xs font-medium max-w-[80%]">Yes, they look perfectly normal. I've uploaded them.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-20 bg-primary-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-primary-800/50">
            <div>
              <p className="text-4xl md:text-5xl font-heading font-bold text-white mb-2 flex items-center justify-center gap-1">
                <span className="stat-number" data-target="150">0</span>+
              </p>
              <p className="text-primary-200 text-xs md:text-sm font-bold uppercase tracking-widest">Top Specialists</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-heading font-bold text-white mb-2 flex items-center justify-center gap-1">
                <span className="stat-number" data-target="50">0</span>k+
              </p>
              <p className="text-primary-200 text-xs md:text-sm font-bold uppercase tracking-widest">Active Patients</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-heading font-bold text-white mb-2 flex items-center justify-center gap-1">
                <span className="stat-number" data-target="98">0</span>%
              </p>
              <p className="text-primary-200 text-xs md:text-sm font-bold uppercase tracking-widest">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-heading font-bold text-white mb-2 flex items-center justify-center gap-1">
                <span className="stat-number" data-target="24">0</span>/7
              </p>
              <p className="text-primary-200 text-xs md:text-sm font-bold uppercase tracking-widest">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">Don't just take our word for it.</h2>
            <p className="text-xl text-gray-600">Hear from patients who have transformed their healthcare experience with CareSync.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div key={test.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col relative">
                <Quote className="absolute top-8 right-8 text-gray-100" size={60} />
                <div className="flex text-yellow-400 mb-6 relative z-10">
                  {[...Array(test.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 text-lg mb-8 flex-1 relative z-10">"{test.text}"</p>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{test.name}</h4>
                    <p className="text-sm text-gray-500">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="cta-section bg-[#0a192f] py-32 relative overflow-hidden">
        {/* Deep Parallax Elements */}
        <div className="parallax-bg absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30 translate-x-1/3 -translate-y-1/2 pointer-events-none"></div>
        <div className="parallax-bg absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 -translate-x-1/4 translate-y-1/2 pointer-events-none"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 leading-tight">
            Ready to upgrade your health experience?
          </h2>
          <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto font-light">
            Join the platform that puts patients first. Create your free account today and find the perfect doctor in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/auth/signup">
              {/* NATIVE EXPLICIT BUTTON (NO CSS CLASH) */}
              <button className="w-full sm:w-auto px-10 py-5 bg-white text-[#0a192f] font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1 text-lg flex items-center justify-center gap-2">
                Create Free Account <ArrowRight size={20} />
              </button>
            </Link>
            <Link to="/doctors">
              {/* NATIVE EXPLICIT BUTTON (NO CSS CLASH) */}
              <button className="w-full sm:w-auto px-10 py-5 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all backdrop-blur-md text-lg">
                View Specialists
              </button>
            </Link>
          </div>
          
          <p className="mt-8 text-sm text-gray-500 flex items-center justify-center gap-2">
            <ShieldCheck size={16} /> Secure, private, and HIPAA compliant.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Home;