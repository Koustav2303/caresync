import { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  Calendar, Clock, MapPin, Video, MoreVertical, 
  Plus, CheckCircle2, XCircle, Clock4, User
} from 'lucide-react';
import Button from '../../components/ui/Button';

// --- MOCK APPOINTMENTS DATA ---
const mockAppointments = [
  { 
    id: 'APT-001', 
    doctor: 'Dr. Sarah Jenkins', 
    specialty: 'Cardiologist', 
    image: 'https://i.pravatar.cc/150?u=sarah', 
    date: 'March 26, 2026', // Tomorrow
    time: '10:00 AM', 
    type: 'Video', 
    status: 'Upcoming',
    location: 'Secure Video Link'
  },
  { 
    id: 'APT-002', 
    doctor: 'Dr. Michael Chen', 
    specialty: 'Neurologist', 
    image: 'https://i.pravatar.cc/150?u=michael', 
    date: 'April 02, 2026', 
    time: '02:30 PM', 
    type: 'In-Person', 
    status: 'Upcoming',
    location: 'UCSF Medical Center, CA'
  },
  { 
    id: 'APT-003', 
    doctor: 'Dr. Emily Carter', 
    specialty: 'Pediatrician', 
    image: 'https://i.pravatar.cc/150?u=emily', 
    date: 'February 15, 2026', 
    time: '09:15 AM', 
    type: 'Video', 
    status: 'Completed',
    location: 'Secure Video Link'
  },
  { 
    id: 'APT-004', 
    doctor: 'Dr. James Wilson', 
    specialty: 'Dermatologist', 
    image: 'https://i.pravatar.cc/150?u=james', 
    date: 'January 10, 2026', 
    time: '11:00 AM', 
    type: 'In-Person', 
    status: 'Cancelled',
    location: 'Austin Skin Clinic, TX'
  },
  { 
    id: 'APT-005', 
    doctor: 'Dr. Anita Patel', 
    specialty: 'Psychiatrist', 
    image: 'https://i.pravatar.cc/150?u=anita', 
    date: 'December 05, 2025', 
    time: '04:00 PM', 
    type: 'Video', 
    status: 'Completed',
    location: 'Secure Video Link'
  },
];

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const listRef = useRef(null);
  const { contextSafe } = useGSAP();

  // Filter appointments based on active tab
  const filteredAppointments = useMemo(() => {
    return mockAppointments.filter(apt => {
      if (activeTab === 'Upcoming') return apt.status === 'Upcoming';
      if (activeTab === 'Past') return apt.status === 'Completed' || apt.status === 'Cancelled';
      return true;
    });
  }, [activeTab]);

  // GSAP Animation when tab switches
  useGSAP(() => {
    gsap.fromTo('.appointment-card',
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', clearProps: 'all' }
    );
  }, [activeTab, filteredAppointments]);

  // Helper for status badges
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Upcoming': return <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100"><Clock4 size={14}/> Scheduled</span>;
      case 'Completed': return <span className="flex items-center gap-1.5 bg-success-50 text-success-700 px-3 py-1 rounded-full text-xs font-bold border border-success-100"><CheckCircle2 size={14}/> Completed</span>;
      case 'Cancelled': return <span className="flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-100"><XCircle size={14}/> Cancelled</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600">Manage your upcoming visits and view your consultation history.</p>
        </div>
        <Link to="/doctors">
          <Button variant="primary" className="w-full sm:w-auto shadow-md shrink-0">
            <Plus size={18} className="mr-2" /> Book New Visit
          </Button>
        </Link>
      </div>

      {/* --- TABS --- */}
      <div className="bg-white p-1.5 rounded-xl shadow-sm border border-gray-100 inline-flex mb-8">
        {['Upcoming', 'Past'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-primary-600 text-white shadow-md' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {tab} Visits
          </button>
        ))}
      </div>

      {/* --- APPOINTMENTS LIST --- */}
      <div className="space-y-4" ref={listRef}>
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((apt) => (
            <div key={apt.id} className="appointment-card bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6">
              
              {/* Doctor Info */}
              <div className="flex items-center gap-4 md:w-1/3 shrink-0 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 pr-4">
                <img src={apt.image} alt={apt.doctor} className="w-16 h-16 rounded-full object-cover border-2 border-gray-50" />
                <div>
                  <h3 className="font-heading font-bold text-lg text-gray-900 leading-tight mb-1">{apt.doctor}</h3>
                  <p className="text-primary-600 text-sm font-medium">{apt.specialty}</p>
                </div>
              </div>

              {/* Date & Location Details */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-gray-600">
                    <div className="mt-0.5 bg-gray-50 p-1.5 rounded-lg text-gray-400"><Calendar size={16} /></div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Date</p>
                      <p className="font-medium text-gray-900">{apt.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-gray-600">
                    <div className="mt-0.5 bg-gray-50 p-1.5 rounded-lg text-gray-400"><Clock size={16} /></div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Time</p>
                      <p className="font-medium text-gray-900">{apt.time}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-gray-600">
                    <div className="mt-0.5 bg-primary-50 p-1.5 rounded-lg text-primary-500">
                      {apt.type === 'Video' ? <Video size={16} /> : <User size={16} />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Type</p>
                      <p className="font-medium text-gray-900">{apt.type} Consult</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-gray-600">
                    <div className="mt-0.5 bg-gray-50 p-1.5 rounded-lg text-gray-400"><MapPin size={16} /></div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location</p>
                      <p className="font-medium text-gray-900 truncate max-w-[150px] sm:max-w-[180px]">{apt.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions & Status */}
              <div className="md:w-48 shrink-0 flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 pl-0 md:pl-6">
                <div className="w-full flex justify-between md:justify-end items-center mb-4 md:mb-0">
                  {getStatusBadge(apt.status)}
                  <button className="text-gray-400 hover:text-gray-900 transition-colors md:ml-3">
                    <MoreVertical size={20} />
                  </button>
                </div>
                
                <div className="w-full flex flex-col gap-2 mt-auto">
                  {apt.status === 'Upcoming' ? (
                    <>
                      {apt.type === 'Video' && (
                        <Button variant="primary" className="w-full bg-primary-600 hover:bg-primary-700 shadow-md">
                          Join Call
                        </Button>
                      )}
                      <Button variant="outline" className="w-full text-xs py-2">Reschedule</Button>
                    </>
                  ) : (
                    <Button variant="outline" className="w-full">Book Again</Button>
                  )}
                </div>
              </div>

            </div>
          ))
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Calendar size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">No {activeTab.toLowerCase()} appointments</h3>
            <p className="text-gray-500 max-w-sm mb-6">
              {activeTab === 'Upcoming' 
                ? "You don't have any scheduled visits. Need to see a doctor?" 
                : "You don't have any past appointment history."}
            </p>
            {activeTab === 'Upcoming' && (
              <Link to="/doctors">
                <Button variant="primary">Find a Doctor</Button>
              </Link>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default Appointments;