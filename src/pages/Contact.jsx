import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  MapPin, Phone, Mail, MessageSquare, Clock, 
  Send, CheckCircle2, AlertCircle, Building, Globe, ArrowRight
} from 'lucide-react';
import Button from '../components/ui/Button';

const offices = [
  { id: 1, city: 'New York, NY', type: 'Global Headquarters', address: '1190 5th Ave, Floor 42, New York, NY 10029', phone: '+1 (555) 123-4567', email: 'ny@caresync.com' },
  { id: 2, city: 'San Francisco, CA', type: 'Tech & Engineering', address: 'Market St. Suite 800, San Francisco, CA 94103', phone: '+1 (555) 987-6543', email: 'sf@caresync.com' },
  { id: 3, city: 'London, UK', type: 'European Operations', address: 'Canary Wharf, London E14 5AB, United Kingdom', phone: '+44 20 7123 4567', email: 'uk@caresync.com' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const successRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  // Initial Load Animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.contact-header',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
    )
    .fromTo('.info-card',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
      '-=0.4'
    )
    .fromTo(formRef.current,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.8 },
      '-=0.4'
    );
  }, []);

  // Form Submission Animation
  const handleSubmit = contextSafe((e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Fade out form, fade in success message
      gsap.to(formRef.current, { opacity: 0, height: 0, duration: 0.4, overflow: 'hidden' });
      gsap.fromTo(successRef.current,
        { opacity: 0, scale: 0.9, y: 20, display: 'none' },
        { opacity: 1, scale: 1, y: 0, display: 'block', duration: 0.5, ease: 'back.out(1.5)', delay: 0.4 }
      );
    }, 1500);
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-24" ref={containerRef}>
      
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="bg-primary-900 text-white pt-24 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="contact-header inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-800/50 text-primary-100 border border-primary-700 text-sm font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
            <MessageSquare size={16} /> Get in Touch
          </div>
          <h1 className="contact-header text-5xl md:text-6xl font-heading font-bold mb-6 max-w-3xl mx-auto leading-tight">
            We're here to help you navigate your health.
          </h1>
          <p className="contact-header text-lg md:text-xl text-primary-100 max-w-2xl mx-auto">
            Whether you have a question about our platform, need technical support, or want to partner with CareSync, our team is ready to assist.
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Emergency Banner */}
            <div className="info-card bg-red-50 border border-red-100 rounded-2xl p-6 flex gap-4 shadow-sm">
              <AlertCircle className="text-red-500 shrink-0 mt-1" size={28} />
              <div>
                <h3 className="text-lg font-bold text-red-900 mb-1">Medical Emergency?</h3>
                <p className="text-red-700 text-sm leading-relaxed">
                  CareSync is not for medical emergencies. If you are experiencing a life-threatening situation, please call <strong>911</strong> or go to the nearest emergency room immediately.
                </p>
              </div>
            </div>

            {/* Quick Contact Cards */}
            <div className="info-card bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group cursor-pointer">
              <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Call Us</p>
                <p className="text-xl font-heading font-bold text-gray-900">+1 (800) 123-SYNC</p>
                <p className="text-sm text-gray-500 mt-1">Mon-Fri, 8am - 8pm EST</p>
              </div>
            </div>

            <div className="info-card bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group cursor-pointer">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Email Us</p>
                <p className="text-xl font-heading font-bold text-gray-900">support@caresync.com</p>
                <p className="text-sm text-gray-500 mt-1">We typically reply within 2 hours</p>
              </div>
            </div>

            <div className="info-card bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group cursor-pointer">
              <div className="w-14 h-14 bg-success-50 text-success-600 rounded-full flex items-center justify-center group-hover:bg-success-600 group-hover:text-white transition-colors">
                <MessageSquare size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Live Chat</p>
                <p className="text-xl font-heading font-bold text-gray-900">Start a Conversation</p>
                <p className="text-sm text-gray-500 mt-1">24/7 Technical Support available</p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 overflow-hidden relative">
              
              {/* Form Container */}
              <div ref={formRef}>
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">Send us a message</h2>
                <p className="text-gray-600 mb-8">Fill out the form below and the appropriate team will get back to you shortly.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-gray-900"
                        placeholder="Alex"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-gray-900"
                        placeholder="Johnson"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-gray-900"
                        placeholder="alex@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-gray-900"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">How can we help? <span className="text-red-500">*</span></label>
                    <select 
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-gray-900 cursor-pointer appearance-none"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Technical Support">Technical Support / App Issue</option>
                      <option value="Billing">Billing & Insurance</option>
                      <option value="Medical Records">Medical Records Request</option>
                      <option value="Partnerships">Partnerships & Clinics</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Message <span className="text-red-500">*</span></label>
                    <textarea 
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-gray-900 resize-none custom-scrollbar"
                      placeholder="Please describe your question or issue in detail..."
                    ></textarea>
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-full py-4 text-lg shadow-lg"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'} <Send size={20} className="ml-2" />
                  </Button>
                  <p className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center gap-1">
                    <CheckCircle2 size={14} /> Your data is securely encrypted and HIPAA compliant.
                  </p>
                </form>
              </div>

              {/* Success State Container (Hidden initially via CSS/GSAP) */}
              <div ref={successRef} className="hidden text-center py-12">
                <div className="w-24 h-24 bg-success-50 text-success-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-success-50/50">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Message Sent!</h2>
                <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                  Thank you, {formData.firstName}. Your message has been routed to our <strong className="text-gray-900">{formData.department}</strong> team. We will respond to {formData.email} within 24 hours.
                </p>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => {
                    setFormData({ ...formData, message: '' });
                    setIsSuccess(false);
                    gsap.to(successRef.current, { opacity: 0, scale: 0.9, display: 'none', duration: 0.3 });
                    gsap.fromTo(formRef.current, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.3 });
                  }}
                >
                  Send Another Message
                </Button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* --- GLOBAL OFFICES --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex items-center gap-3 mb-10">
          <Globe className="text-primary-600" size={28} />
          <h2 className="text-3xl font-heading font-bold text-gray-900">Global Offices</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offices.map((office) => (
            <div key={office.id} className="bg-white border border-gray-200 p-6 rounded-2xl hover:border-primary-300 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{office.city}</h3>
                  <p className="text-xs font-bold text-primary-600 uppercase tracking-wider bg-primary-50 inline-block px-2 py-1 rounded">{office.type}</p>
                </div>
                <Building className="text-gray-300 group-hover:text-primary-200 transition-colors" size={32} />
              </div>
              <div className="space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-4 mt-4">
                <p className="flex items-start gap-2"><MapPin size={16} className="shrink-0 mt-0.5" /> {office.address}</p>
                <p className="flex items-center gap-2"><Phone size={16} className="shrink-0" /> {office.phone}</p>
                <p className="flex items-center gap-2"><Mail size={16} className="shrink-0" /> {office.email}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Contact;