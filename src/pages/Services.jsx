import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  HeartPulse, Brain, Bone, Baby, Stethoscope, 
  Eye, Activity, ShieldPlus, ArrowRight, ChevronDown,
  CheckCircle2, PhoneCall, Calendar
} from 'lucide-react';
import Button from '../components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

// --- MOCK DATA ---
const coreServices = [
  { id: 1, title: 'Primary Care', icon: Stethoscope, desc: 'Comprehensive everyday health care, preventive screenings, and management of chronic conditions.', features: ['Annual Physicals', 'Vaccinations', 'Blood Work'] },
  { id: 2, title: 'Cardiology', icon: HeartPulse, desc: 'Expert heart care including diagnostics, treatment of coronary artery disease, and preventive cardiology.', features: ['ECG & Echo', 'Hypertension Mgmt', 'Heart Failure Care'] },
  { id: 3, title: 'Neurology', icon: Brain, desc: 'Advanced diagnosis and treatment for disorders of the brain, spinal cord, and nervous system.', features: ['Migraine Relief', 'Stroke Recovery', 'Memory Disorders'] },
  { id: 4, title: 'Orthopedics', icon: Bone, desc: 'Specialized care for bones, joints, ligaments, tendons, and muscles to keep you moving pain-free.', features: ['Joint Replacement', 'Sports Injuries', 'Physical Therapy'] },
  { id: 5, title: 'Pediatrics', icon: Baby, desc: 'Compassionate, expert care tailored specifically for infants, children, and adolescents.', features: ['Well-Child Visits', 'Development Tracking', 'Immunizations'] },
  { id: 6, title: 'Ophthalmology', icon: Eye, desc: 'Complete eye care services from routine vision exams to advanced surgical procedures.', features: ['Glaucoma Screening', 'Cataract Surgery', 'Retina Care'] },
];

const specializedPrograms = [
  { id: 'weight', name: 'Weight Management', desc: 'A medically supervised program combining nutrition, fitness, and behavioral therapy to achieve sustainable weight loss.', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
  { id: 'mental', name: 'Mental Wellness', desc: 'Holistic psychiatric and psychological support for anxiety, depression, and stress management.', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
  { id: 'chronic', name: 'Chronic Care', desc: 'Continuous, coordinated care for patients dealing with long-term conditions like Diabetes and COPD.', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
];

const faqs = [
  { id: 1, question: 'Do I need a referral to see a specialist?', answer: 'In most cases, yes. Your primary care physician will evaluate your condition and provide a referral if specialized care is necessary. Some insurance PPO plans may allow direct booking.' },
  { id: 2, question: 'Are telemedicine appointments available for all services?', answer: 'Telemedicine is highly effective for initial consultations, follow-ups, and mental health services. However, physical exams, imaging, and certain diagnostics require in-person visits.' },
  { id: 3, question: 'How do I access my medical records?', answer: 'Once you become a patient, you can securely access all your lab results, imaging reports, and doctor notes directly through the CareSync Patient Dashboard.' },
  { id: 4, question: 'What insurance providers do you accept?', answer: 'We partner with over 50 major insurance networks including Medicare, Blue Cross Blue Shield, Aetna, and Cigna. You can verify your specific plan during the booking process.' },
];

const Services = () => {
  const [activeProgram, setActiveProgram] = useState('weight');
  const [openFaq, setOpenFaq] = useState(1);
  
  const containerRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  useGSAP(() => {
    // Hero Animation
    gsap.fromTo('.hero-anim',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );

    // Scroll Animations for Services Grid
    const cards = gsap.utils.toArray('.service-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Scroll Animation for Section Headers
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.fromTo(header,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6,
          scrollTrigger: { trigger: header, start: 'top 80%' }
        }
      );
    });
  }, []);

  const toggleFaq = contextSafe((id) => {
    setOpenFaq(openFaq === id ? null : id);
  });

  return (
    <div className="bg-gray-50 min-h-screen font-sans" ref={containerRef}>
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="hero-anim inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-bold uppercase tracking-wider mb-6">
            <ShieldPlus size={16} /> Premium Healthcare
          </div>
          <h1 className="hero-anim text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-gray-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            World-class medical care, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
              tailored to you.
            </span>
          </h1>
          <p className="hero-anim text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            From preventive primary care to advanced surgical specialties, our network of elite physicians is here to support your health journey.
          </p>
          <div className="hero-anim flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/doctors">
              <Button size="lg" className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg shadow-lg">
                Find a Specialist
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg bg-white">
              <PhoneCall size={20} className="mr-2" /> (555) 123-4567
            </Button>
          </div>
        </div>
      </section>

      {/* --- CORE SERVICES GRID --- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Our Core Departments</h2>
            <p className="text-gray-600 text-lg">Comprehensive medical services utilizing state-of-the-art technology and evidence-based practices.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreServices.map((service) => (
              <div key={service.id} className="service-card bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  <service.icon size={32} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 flex-1 leading-relaxed">{service.desc}</p>
                
                <div className="space-y-2 mb-8 border-t border-gray-100 pt-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                      <CheckCircle2 size={16} className="text-success-500" /> {feature}
                    </div>
                  ))}
                </div>
                
                <Link to="/doctors" className="mt-auto">
                  <Button variant="outline" className="w-full group-hover:bg-primary-50 group-hover:border-primary-200 transition-colors">
                    View Doctors <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SPECIALIZED PROGRAMS (INTERACTIVE TABS) --- */}
      <section className="py-24 bg-white border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header mb-16 md:flex md:justify-between md:items-end">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Specialized Health Programs</h2>
              <p className="text-gray-600 text-lg">Targeted, multi-disciplinary approaches for specific health goals.</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Tab Controls */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
              {specializedPrograms.map((program) => (
                <button
                  key={program.id}
                  onClick={() => setActiveProgram(program.id)}
                  className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                    activeProgram === program.id 
                      ? 'border-primary-600 bg-primary-50 shadow-md transform scale-[1.02]' 
                      : 'border-gray-100 bg-white hover:border-primary-200 hover:bg-gray-50'
                  }`}
                >
                  <h3 className={`text-xl font-heading font-bold mb-2 ${activeProgram === program.id ? 'text-primary-900' : 'text-gray-900'}`}>
                    {program.name}
                  </h3>
                  <p className={`text-sm ${activeProgram === program.id ? 'text-primary-700' : 'text-gray-500'}`}>
                    {program.desc.substring(0, 80)}...
                  </p>
                </button>
              ))}
            </div>

            {/* Tab Content (Image & Details) */}
            <div className="w-full lg:w-2/3">
              {specializedPrograms.map((program) => (
                <div 
                  key={program.id}
                  className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${
                    activeProgram === program.id ? 'opacity-100 scale-100 block' : 'opacity-0 scale-95 hidden'
                  }`}
                >
                  <div className="aspect-[16/9] w-full relative">
                    <img src={program.image} alt={program.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-left">
                      {/* EXPLICIT text-white FIX ON HEADING */}
                      <h3 className="text-white text-3xl md:text-4xl font-heading font-bold mb-4">{program.name}</h3>
                      <p className="text-gray-200 text-lg max-w-2xl mb-8 leading-relaxed">{program.desc}</p>
                      
                      {/* EXPLICIT NATIVE BUTTON FIX */}
                      <button className="px-6 py-3 bg-white text-primary-900 font-bold rounded-xl shadow-lg hover:bg-gray-100 transition-colors">
                        Enroll in Program
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg">Everything you need to know about receiving care at CareSync.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div 
                key={faq.id} 
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === faq.id ? 'border-primary-500 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <button 
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between focus:outline-none"
                >
                  <span className="font-heading font-bold text-left text-gray-900 text-lg pr-4">{faq.question}</span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${openFaq === faq.id ? 'bg-primary-100 text-primary-600 rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === faq.id ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-gray-600 leading-relaxed pt-2 border-t border-gray-100">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-900"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 section-header">
          <Activity size={48} className="text-primary-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            Ready to experience better healthcare?
          </h2>
          <p className="text-primary-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of patients who have upgraded their medical experience. Book your first appointment today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/doctors">
              {/* EXPLICIT NATIVE BUTTON FIX */}
              <button className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-white text-primary-900 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-2xl">
                <Calendar size={20} className="mr-2" /> Book an Appointment
              </button>
            </Link>
            <Link to="/auth/signup">
              {/* EXPLICIT NATIVE BUTTON FIX */}
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-bold rounded-xl border border-white/30 hover:bg-white/10 transition-all">
                Create Patient Account
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;