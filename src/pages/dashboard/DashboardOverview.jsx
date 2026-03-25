import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart 
} from 'recharts';
import { 
  Calendar, Clock, MapPin, Video, FileText, Activity, 
  ChevronRight, ArrowUpRight, ArrowDownRight, Droplet, Heart
} from 'lucide-react';
import Button from '../../components/ui/Button';

// --- MOCK DASHBOARD DATA ---
const healthData = [
  { name: 'Mon', bpSys: 120, bpDia: 80, heartRate: 72 },
  { name: 'Tue', bpSys: 118, bpDia: 79, heartRate: 75 },
  { name: 'Wed', bpSys: 122, bpDia: 81, heartRate: 71 },
  { name: 'Thu', bpSys: 125, bpDia: 83, heartRate: 78 },
  { name: 'Fri', bpSys: 119, bpDia: 78, heartRate: 70 },
  { name: 'Sat', bpSys: 117, bpDia: 77, heartRate: 68 },
  { name: 'Sun', bpSys: 120, bpDia: 80, heartRate: 72 },
];

const upcomingAppointment = {
  doctor: 'Dr. Sarah Jenkins',
  specialty: 'Cardiologist',
  image: 'https://i.pravatar.cc/150?u=sarah',
  date: 'October 15, 2025',
  time: '10:00 AM',
  type: 'Video Consult',
};

const DashboardOverview = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.dash-animate', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto pb-10">
      
      {/* Header */}
      <div className="dash-animate mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">Good morning, Alex! 👋</h1>
        <p className="text-gray-600">Here is your health overview for today.</p>
      </div>

      {/* --- QUICK STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Health Score */}
        <div className="dash-animate bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
              <Activity size={24} />
            </div>
            <span className="flex items-center text-sm font-bold text-success-600 bg-success-50 px-2 py-1 rounded-md">
              <ArrowUpRight size={16} className="mr-1" /> 2.4%
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Overall Health Score</p>
            <h3 className="text-3xl font-heading font-bold text-gray-900">92<span className="text-lg text-gray-500">/100</span></h3>
          </div>
        </div>

        {/* Heart Rate */}
        <div className="dash-animate bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500">
              <Heart size={24} />
            </div>
            <span className="flex items-center text-sm font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
              Normal
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Avg Heart Rate</p>
            <h3 className="text-3xl font-heading font-bold text-gray-900">72 <span className="text-lg text-gray-500 font-medium">bpm</span></h3>
          </div>
        </div>

        {/* Blood Pressure */}
        <div className="dash-animate bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
              <Droplet size={24} />
            </div>
            <span className="flex items-center text-sm font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md">
              <ArrowDownRight size={16} className="mr-1" /> Slightly High
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Blood Pressure</p>
            <h3 className="text-3xl font-heading font-bold text-gray-900">120<span className="text-lg text-gray-400">/80</span></h3>
          </div>
        </div>

        {/* Active Prescriptions */}
        <div className="dash-animate bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
              <FileText size={24} />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Active Prescriptions</p>
            <h3 className="text-3xl font-heading font-bold text-gray-900">2</h3>
            <p className="text-sm text-gray-500 mt-2">Next refill in 12 days</p>
          </div>
        </div>
      </div>

      {/* --- MAIN GRID (CHART & APPOINTMENT) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Vitals Chart */}
        <div className="dash-animate lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-heading font-bold text-gray-900">Vitals Trend (7 Days)</h2>
            <select className="bg-gray-50 border-none text-sm font-medium text-gray-700 rounded-lg focus:ring-0 cursor-pointer p-2">
              <option>Blood Pressure</option>
              <option>Heart Rate</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSys" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDia" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="bpSys" name="Systolic" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorSys)" />
                <Area type="monotone" dataKey="bpDia" name="Diastolic" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorDia)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column - Upcoming Appointment */}
        <div className="dash-animate bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-heading font-bold text-gray-900">Next Appointment</h2>
            <Link to="/dashboard/appointments" className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</Link>
          </div>

          <div className="bg-primary-900 text-white rounded-2xl p-6 flex-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <img src={upcomingAppointment.image} alt="Doctor" className="w-14 h-14 rounded-full border-2 border-primary-500 object-cover" />
                <div>
                  <h3 className="font-heading font-bold text-lg">{upcomingAppointment.doctor}</h3>
                  <p className="text-primary-200 text-sm">{upcomingAppointment.specialty}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                  <Calendar size={18} className="text-primary-300" />
                  <div>
                    <p className="text-xs text-primary-200 uppercase tracking-wider font-semibold">Date & Time</p>
                    <p className="font-medium">{upcomingAppointment.date} • {upcomingAppointment.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                  <Video size={18} className="text-primary-300" />
                  <div>
                    <p className="text-xs text-primary-200 uppercase tracking-wider font-semibold">Consultation</p>
                    <p className="font-medium">{upcomingAppointment.type}</p>
                  </div>
                </div>
              </div>

              <Button variant="primary" className="w-full bg-white text-primary-900 hover:bg-gray-50 border-none shadow-lg">
                Join Video Call
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardOverview;