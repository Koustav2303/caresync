import { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  Star, MapPin, Award, Clock, Calendar, Video, ShieldCheck, 
  CheckCircle2, ChevronRight, ThumbsUp, Map, Phone, Mail, 
  GraduationCap, Briefcase, HeartPulse, User, CreditCard, ChevronLeft
} from 'lucide-react';
import Button from '../../components/ui/Button';

// --- MASSIVE MOCK DATA FOR ENTERPRISE FEEL ---
const doctorData = {
  id: 1,
  name: 'Dr. Sarah Jenkins',
  specialty: 'Interventional Cardiologist',
  degrees: 'MD, FACC, FSCAI',
  rating: 4.9,
  reviewCount: 128,
  image: 'https://i.pravatar.cc/300?u=sarah',
  location: 'Mount Sinai Heart Institute, New York, NY',
  address: '1190 5th Ave, New York, NY 10029',
  phone: '+1 (555) 123-4567',
  about: 'Dr. Sarah Jenkins is a highly sought-after, board-certified Interventional Cardiologist with over 15 years of clinical excellence. She specializes in complex coronary interventions, transcatheter aortic valve replacement (TAVR), and preventive cardiovascular medicine. Dr. Jenkins is dedicated to providing patient-centered care, combining state-of-the-art medical technology with a compassionate approach.',
  specialtiesList: ['Coronary Artery Disease', 'Heart Failure', 'Echocardiography', 'Hypertension', 'TAVR'],
  languages: ['English (Native)', 'Spanish (Fluent)'],
  acceptedInsurances: ['Aetna', 'Blue Cross Blue Shield', 'Cigna', 'Medicare', 'UnitedHealthcare', 'Humana'],
  pricing: { video: 150, inPerson: 200 },
};

const experienceTimeline = [
  { id: 1, role: 'Director of Interventional Cardiology', clinic: 'Mount Sinai Heart Institute', years: '2018 - Present', desc: 'Leading a team of 15 cardiologists, overseeing complex structural heart programs.' },
  { id: 2, role: 'Attending Cardiologist', clinic: 'Johns Hopkins Hospital', years: '2011 - 2018', desc: 'Specialized in high-risk percutaneous coronary interventions (PCI).' },
  { id: 3, role: 'Fellowship in Cardiovascular Disease', clinic: 'Mayo Clinic', years: '2008 - 2011', desc: 'Comprehensive training in advanced cardiovascular imaging and hemodynamics.' },
];

const reviewData = [
  { id: 1, author: 'Michael T.', rating: 5, date: 'October 12, 2025', text: 'Dr. Jenkins saved my life. Her attention to detail and calm demeanor during my procedure were exceptional. She explained everything clearly to my family.', helpful: 14 },
  { id: 2, author: 'Elena R.', rating: 5, date: 'September 28, 2025', text: 'Very thorough and professional. The wait time was a bit long (about 20 mins), but she did not rush the appointment at all once I was in the room.', helpful: 8 },
  { id: 3, author: 'David W.', rating: 4, date: 'August 15, 2025', text: 'Excellent doctor, very knowledgeable. The clinic staff is also very polite. Only giving 4 stars because parking at the facility is quite difficult.', helpful: 2 },
];

const ratingBreakdown = { 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 }; // Percentages

// Helper to generate next 7 days
const generateUpcomingDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    dates.push({
      fullDate: nextDate,
      dayName: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : nextDate.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: nextDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    });
  }
  return dates;
};

// Grouped time slots
const timeSlots = {
  Morning: ['09:00 AM', '09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM'],
  Afternoon: ['01:30 PM', '02:00 PM', '03:15 PM', '04:00 PM'],
  Evening: ['05:30 PM', '06:00 PM']
};

const DoctorProfile = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('overview');
  const [consultType, setConsultType] = useState('inPerson');
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  const navigate = useNavigate();
  const dates = generateUpcomingDates();
  
  // --- REFS FOR GSAP ---
  const containerRef = useRef(null);
  const tabContentRef = useRef(null);
  const bookingWidgetRef = useRef(null);
  const successModalRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  // --- ANIMATIONS ---
  // Initial Load
  useGSAP(() => {
    gsap.fromTo('.stagger-fade', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );
  });

  // Tab Switching Animation
  useEffect(() => {
    if (tabContentRef.current) {
      gsap.fromTo(tabContentRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', clearProps: 'all' }
      );
    }
  }, [activeTab]);

  // Booking Confirmation Animation
  const handleConfirmBooking = contextSafe(() => {
    setIsBooking(true);
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false);
      setBookingSuccess(true);
      gsap.fromTo(successModalRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }
      );
    }, 1500);
  });

  // --- RENDER HELPERS ---
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} size={16} className={`${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`} />
    ));
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 border-t border-gray-100 font-sans" ref={containerRef}>
      
      {/* --- PREMIUM HERO HEADER --- */}
      <div className="bg-white border-b border-gray-200 pt-8 pb-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 stagger-fade">
          
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link> <ChevronRight size={14}/> 
            <Link to="/doctors" className="hover:text-primary-600 transition-colors">Specialists</Link> <ChevronRight size={14}/> 
            <span className="text-gray-900 font-medium">{doctorData.name}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative group">
              <img src={doctorData.image} alt={doctorData.name} className="w-40 h-40 md:w-48 md:h-48 rounded-3xl object-cover shadow-xl border-4 border-white" />
              <div className="absolute -bottom-3 -right-3 bg-white rounded-full p-2 shadow-lg">
                <CheckCircle2 size={28} className="text-success-500 fill-success-100" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider border border-primary-100">{doctorData.specialty}</span>
                <span className="text-gray-500 font-medium text-sm flex items-center gap-1"><GraduationCap size={16}/> {doctorData.degrees}</span>
              </div>
              
              <h1 className="text-4xl font-heading font-bold text-gray-900 mb-3">{doctorData.name}</h1>
              
              <p className="text-gray-600 flex items-center gap-2 mb-6 text-lg">
                <MapPin size={20} className="text-gray-400"/> {doctorData.location}
              </p>

              {/* Quick Stats Banner */}
              <div className="flex flex-wrap gap-6 bg-gray-50 p-4 rounded-2xl border border-gray-100 inline-flex">
                <div className="flex items-center gap-3 pr-6 border-r border-gray-200">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                    <Star size={20} className="fill-current" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">{doctorData.rating}</p>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{doctorData.reviewCount} Reviews</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 pr-6 border-r border-gray-200">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">15+</p>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Years Exp.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">5,000+</p>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Patients</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- LEFT COLUMN: MASTER DETAILS --- */}
          <div className="flex-1 stagger-fade">
            
            {/* Custom Tabs Navigation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6 sticky top-20 z-30">
              <div className="flex overflow-x-auto custom-scrollbar">
                {['overview', 'experience', 'reviews', 'insurance'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 px-6 text-sm font-heading font-semibold capitalize transition-all duration-200 whitespace-nowrap ${activeTab === tab ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Tab Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8" ref={tabContentRef}>
              
              {/* TAB: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">About {doctorData.name}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{doctorData.about}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                    <div>
                      <h3 className="text-lg font-heading font-bold text-gray-900 mb-4 flex items-center gap-2"><HeartPulse className="text-primary-500"/> Clinical Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {doctorData.specialtiesList.map(spec => (
                          <span key={spec} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">{spec}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-gray-900 mb-4 flex items-center gap-2"><Map className="text-primary-500"/> Clinic Info</h3>
                      <div className="space-y-3 text-gray-600">
                        <p className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 text-gray-400 flex-shrink-0"/> {doctorData.address}</p>
                        <p className="flex items-center gap-3"><Phone size={18} className="text-gray-400 flex-shrink-0"/> {doctorData.phone}</p>
                        <p className="flex items-center gap-3 text-primary-600 font-medium cursor-pointer hover:underline"><Map size={18} className="flex-shrink-0"/> Get Directions</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: EXPERIENCE */}
              {activeTab === 'experience' && (
                <div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-8">Work & Education History</h3>
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                    {experienceTimeline.map((item, index) => (
                      <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary-100 text-primary-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                          <Briefcase size={16} />
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-primary-600 font-bold text-sm">{item.years}</span>
                          </div>
                          <h4 className="font-heading font-bold text-gray-900 text-lg mb-1">{item.role}</h4>
                          <p className="text-sm font-medium text-gray-500 mb-3">{item.clinic}</p>
                          <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: REVIEWS */}
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-8">Patient Feedback</h3>
                  
                  {/* Rating Breakdown */}
                  <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-10">
                    <div className="text-center w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:pr-6">
                      <p className="text-5xl font-heading font-bold text-gray-900 mb-2">{doctorData.rating}</p>
                      <div className="flex justify-center mb-2">{renderStars(doctorData.rating)}</div>
                      <p className="text-sm text-gray-500 font-medium">Based on {doctorData.reviewCount} reviews</p>
                    </div>
                    <div className="w-full md:w-2/3 space-y-2">
                      {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-600 w-4">{star}</span>
                          <Star size={14} className="text-gray-400 fill-gray-400" />
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${ratingBreakdown[star]}%` }}></div>
                          </div>
                          <span className="text-sm text-gray-500 w-8 text-right">{ratingBreakdown[star]}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Review Cards */}
                  <div className="space-y-6">
                    {reviewData.map(review => (
                      <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-lg">
                              {review.author.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{review.author}</p>
                              <p className="text-xs text-gray-500">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex">{renderStars(review.rating)}</div>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">{review.text}</p>
                        <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors">
                          <ThumbsUp size={16}/> Helpful ({review.helpful})
                        </button>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-4">Load More Reviews</Button>
                  </div>
                </div>
              )}

              {/* TAB: INSURANCE */}
              {activeTab === 'insurance' && (
                <div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Accepted Insurance Plans</h3>
                  <p className="text-gray-600 mb-8">Please note that network participation may change. Always verify with your insurance provider before your visit.</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {doctorData.acceptedInsurances.map((ins, idx) => (
                      <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center gap-3 hover:border-primary-300 transition-colors">
                        <CreditCard className="text-primary-500" size={20} />
                        <span className="font-medium text-gray-800">{ins}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* --- RIGHT COLUMN: ADVANCED BOOKING WIDGET --- */}
          <div className="w-full lg:w-[420px] flex-shrink-0 stagger-fade">
            {!bookingSuccess ? (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden sticky top-20 z-20">
                
                {/* Booking Header */}
                <div className="bg-gray-900 text-white p-6">
                  <h2 className="text-xl font-heading font-bold mb-1">Book an Appointment</h2>
                  <p className="text-gray-400 text-sm mb-4">Select your consultation preference</p>
                  
                  {/* Consult Type Toggle */}
                  <div className="bg-gray-800 p-1 rounded-xl flex relative">
                    <button 
                      onClick={() => {setConsultType('inPerson'); setSelectedSlot(null);}}
                      className={`flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 z-10 ${consultType === 'inPerson' ? 'text-gray-900 shadow-sm' : 'text-gray-300 hover:text-white'}`}
                    >
                      <User size={16}/> In-Clinic
                    </button>
                    <button 
                      onClick={() => {setConsultType('video'); setSelectedSlot(null);}}
                      className={`flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 z-10 ${consultType === 'video' ? 'text-gray-900 shadow-sm' : 'text-gray-300 hover:text-white'}`}
                    >
                      <Video size={16}/> Video Call
                    </button>
                    {/* Animated Background Pill */}
                    <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg transition-transform duration-300 ease-out ${consultType === 'video' ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'}`}></div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Price Indicator */}
                  <div className="flex justify-between items-center mb-6 bg-primary-50 p-4 rounded-xl border border-primary-100">
                    <span className="text-primary-900 font-semibold">Consultation Fee</span>
                    <span className="text-2xl font-bold text-primary-600">${consultType === 'inPerson' ? doctorData.pricing.inPerson : doctorData.pricing.video}</span>
                  </div>

                  {/* Date Selector (Horizontal Scroll) */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold text-gray-900">Select Date</h3>
                      <button className="text-primary-600 text-sm font-semibold flex items-center"><Calendar size={14} className="mr-1"/> Calendar</button>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar -mx-2 px-2">
                      {dates.map((date, idx) => (
                        <button 
                          key={idx}
                          onClick={() => {setSelectedDateIdx(idx); setSelectedSlot(null);}}
                          className={`flex-shrink-0 w-20 py-3 rounded-2xl border text-center transition-all duration-200 ${selectedDateIdx === idx ? 'bg-primary-600 border-primary-600 text-white shadow-md transform scale-105' : 'bg-white border-gray-200 text-gray-700 hover:border-primary-300 hover:bg-primary-50'}`}
                        >
                          <p className={`text-xs font-semibold mb-1 uppercase tracking-wider opacity-80 ${selectedDateIdx === idx ? 'text-primary-100' : 'text-gray-500'}`}>{date.dayName}</p>
                          <p className="text-sm font-bold">{date.dateNum.split(' ')[1]}</p>
                          <p className={`text-[10px] mt-0.5 ${selectedDateIdx === idx ? 'text-primary-200' : 'text-gray-400'}`}>{date.dateNum.split(' ')[0]}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots Container */}
                  <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {Object.entries(timeSlots).map(([period, slots]) => (
                      <div key={period}>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                          {period === 'Morning' ? <Clock size={14}/> : period === 'Afternoon' ? <User size={14}/> : <Star size={14}/>} {period}
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          {slots.map((slot, idx) => {
                            const uniqueSlotId = `${period}-${idx}`;
                            const isSelected = selectedSlot === uniqueSlotId;
                            return (
                              <button 
                                key={idx}
                                onClick={() => setSelectedSlot(uniqueSlotId)}
                                className={`py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${isSelected ? 'bg-gray-900 text-white border-gray-900 shadow-md ring-2 ring-gray-900 ring-offset-2' : 'border-gray-200 text-gray-700 hover:border-primary-500 hover:text-primary-700 hover:bg-primary-50'}`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="w-full text-lg py-4 shadow-lg shadow-primary-500/30" 
                      disabled={!selectedSlot || isBooking}
                      isLoading={isBooking}
                      onClick={handleConfirmBooking}
                    >
                      {isBooking ? 'Processing...' : 'Proceed to Checkout'}
                    </Button>
                    <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
                      <ShieldCheck size={14} /> HIPAA Compliant & Secure
                    </p>
                  </div>

                </div>
              </div>
            ) : (
              
              /* --- PREMIUM SUCCESS STATE MODAL --- */
              <div ref={successModalRef} className="bg-white rounded-3xl shadow-2xl border border-success-100 p-8 text-center sticky top-20 z-20 overflow-hidden relative">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-success-50 to-transparent"></div>
                
                <div className="relative z-10">
                  <div className="w-24 h-24 bg-success-100 text-success-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-success-50">
                    <CheckCircle2 size={48} />
                  </div>
                  
                  <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                  <p className="text-gray-500 mb-8">A confirmation email has been sent with your appointment details.</p>
                  
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-left mb-8 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-sm"><User size={18}/></div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase">Doctor</p>
                        <p className="font-bold text-gray-900">{doctorData.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-sm"><Calendar size={18}/></div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase">Date & Time</p>
                        <p className="font-bold text-gray-900">{dates[selectedDateIdx].fullDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-sm">{consultType === 'video' ? <Video size={18}/> : <MapPin size={18}/>}</div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase">Consultation</p>
                        <p className="font-bold text-gray-900">{consultType === 'video' ? 'Video Call Link' : doctorData.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button variant="primary" className="w-full py-4 text-base shadow-md" onClick={() => navigate('/dashboard')}>Go to Patient Dashboard</Button>
                    <Button variant="ghost" className="w-full font-semibold text-gray-500 hover:text-gray-900" onClick={() => {setBookingSuccess(false); setSelectedSlot(null);}}>Book another appointment</Button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;