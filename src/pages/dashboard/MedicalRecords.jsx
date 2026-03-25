import { useState, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  FileText, Search, Filter, Download, Eye, 
  FileImage, Pill, Activity, ChevronRight, Calendar
} from 'lucide-react';
import Button from '../../components/ui/Button';

// --- MOCK MEDICAL RECORDS DATA ---
const mockRecords = [
  { id: 'REC-001', date: 'Oct 12, 2025', title: 'Complete Blood Count (CBC)', category: 'Lab Result', doctor: 'Dr. Sarah Jenkins', status: 'Available', size: '1.2 MB' },
  { id: 'REC-002', date: 'Sep 28, 2025', title: 'Chest X-Ray', category: 'Imaging', doctor: 'Dr. Robert Fox', status: 'Available', size: '4.5 MB' },
  { id: 'REC-003', date: 'Sep 15, 2025', title: 'Lisinopril 10mg Prescription', category: 'Prescription', doctor: 'Dr. Sarah Jenkins', status: 'Active', size: '0.8 MB' },
  { id: 'REC-004', date: 'Aug 02, 2025', title: 'Lipid Panel', category: 'Lab Result', doctor: 'Dr. Michael Chen', status: 'Available', size: '1.1 MB' },
  { id: 'REC-005', date: 'Jul 18, 2025', title: 'MRI Brain Scan', category: 'Imaging', doctor: 'Dr. Omar Farooq', status: 'Processing', size: '--' },
  { id: 'REC-006', date: 'Jun 30, 2025', title: 'Amoxicillin 500mg', category: 'Prescription', doctor: 'Dr. Emily Carter', status: 'Expired', size: '0.5 MB' },
  { id: 'REC-007', date: 'May 14, 2025', title: 'Thyroid Function Test', category: 'Lab Result', doctor: 'Dr. Sarah Jenkins', status: 'Available', size: '1.0 MB' },
];

const MedicalRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  
  const tableRef = useRef(null);
  const { contextSafe } = useGSAP();

  // --- FILTERING LOGIC ---
  const filteredRecords = useMemo(() => {
    return mockRecords.filter(record => {
      const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            record.doctor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === 'All' || record.category === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  // --- GSAP ANIMATIONS ---
  useGSAP(() => {
    gsap.fromTo('.record-row',
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', clearProps: 'all' }
    );
  }, [filteredRecords, activeTab]); // Re-animate when data changes

  // Helper to get the right icon based on category
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Lab Result': return <Activity size={18} className="text-blue-500" />;
      case 'Imaging': return <FileImage size={18} className="text-purple-500" />;
      case 'Prescription': return <Pill size={18} className="text-green-500" />;
      default: return <FileText size={18} className="text-gray-500" />;
    }
  };

  // Helper to get status badge styles
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Available': return 'bg-success-50 text-success-700 border-success-200';
      case 'Active': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Processing': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Expired': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">Medical Records</h1>
          <p className="text-gray-600">Securely view, download, and manage your health history.</p>
        </div>
        <Button variant="primary" className="shadow-md shrink-0">
          Request New Record
        </Button>
      </div>

      {/* Controls Bar (Search & Tabs) */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col lg:flex-row justify-between gap-4">
        
        {/* Tabs */}
        <div className="flex overflow-x-auto custom-scrollbar pb-2 lg:pb-0 gap-2">
          {['All', 'Lab Result', 'Imaging', 'Prescription'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-primary-50 text-primary-700 border border-primary-200 shadow-sm' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-50 border border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search records or doctors..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse" ref={tableRef}>
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                <th className="p-4 pl-6 w-16">Icon</th>
                <th className="p-4">Document Details</th>
                <th className="p-4 hidden sm:table-cell">Ordered By</th>
                <th className="p-4 hidden md:table-cell">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRecords.length > 0 ? filteredRecords.map((record) => (
                <tr key={record.id} className="record-row hover:bg-gray-50/50 transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                      {getCategoryIcon(record.category)}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-heading font-bold text-gray-900 text-sm mb-1">{record.title}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <span className="font-medium text-gray-700">{record.category}</span> • {record.size}
                    </p>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <p className="text-sm font-medium text-gray-900">{record.doctor}</p>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <p className="text-sm text-gray-600 flex items-center gap-1.5">
                      <Calendar size={14} className="text-gray-400" /> {record.date}
                    </p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusBadge(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={record.status === 'Processing'}
                        title="View Record"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={record.status === 'Processing'}
                        title="Download PDF"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-gray-900 mb-1">No records found</h3>
                    <p className="text-gray-500 text-sm">We couldn't find any medical records matching your current filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;