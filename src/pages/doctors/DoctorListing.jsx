import { useState, useRef, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  Search, MapPin, Star, Filter, Calendar, Video, ArrowRight, 
  LayoutGrid, List, ChevronLeft, ChevronRight, Globe, DollarSign, 
  User, CheckCircle2, Clock, ShieldCheck 
} from 'lucide-react';
import Button from '../../components/ui/Button';

// --- MASSIVE EXTENDED MOCK DATABASE ---
const mockDoctors = [
  { id: 1, name: 'Dr. Sarah Jenkins', specialty: 'Cardiologist', experience: 15, rating: 4.9, reviews: 128, image: 'https://i.pravatar.cc/150?u=sarah', location: 'New York, NY', fee: 150, nextAvailable: 'Today', type: 'Both', gender: 'Female', languages: ['English', 'Spanish'], hospital: 'Mount Sinai Hospital' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurologist', experience: 12, rating: 4.8, reviews: 95, image: 'https://i.pravatar.cc/150?u=michael', location: 'San Francisco, CA', fee: 200, nextAvailable: 'Tomorrow', type: 'In-Person', gender: 'Male', languages: ['English', 'Mandarin'], hospital: 'UCSF Medical Center' },
  { id: 3, name: 'Dr. Emily Carter', specialty: 'Pediatrician', experience: 8, rating: 5.0, reviews: 210, image: 'https://i.pravatar.cc/150?u=emily', location: 'Chicago, IL', fee: 100, nextAvailable: 'Today', type: 'Video', gender: 'Female', languages: ['English'], hospital: 'Lurie Children\'s' },
  { id: 4, name: 'Dr. James Wilson', specialty: 'Dermatologist', experience: 20, rating: 4.7, reviews: 84, image: 'https://i.pravatar.cc/150?u=james', location: 'Austin, TX', fee: 180, nextAvailable: 'Mon, Oct 12', type: 'Both', gender: 'Male', languages: ['English', 'German'], hospital: 'Austin Skin Clinic' },
  { id: 5, name: 'Dr. Anita Patel', specialty: 'Psychiatrist', experience: 10, rating: 4.9, reviews: 156, image: 'https://i.pravatar.cc/150?u=anita', location: 'Seattle, WA', fee: 160, nextAvailable: 'Today', type: 'Video', gender: 'Female', languages: ['English', 'Hindi', 'Gujarati'], hospital: 'Mindful Health' },
  { id: 6, name: 'Dr. Robert Fox', specialty: 'Orthopedist', experience: 18, rating: 4.6, reviews: 72, image: 'https://i.pravatar.cc/150?u=robert', location: 'Boston, MA', fee: 220, nextAvailable: 'Wed, Oct 14', type: 'In-Person', gender: 'Male', languages: ['English'], hospital: 'Mass General' },
  { id: 7, name: 'Dr. Lisa Thompson', specialty: 'Gynecologist', experience: 14, rating: 4.9, reviews: 302, image: 'https://i.pravatar.cc/150?u=lisa', location: 'Miami, FL', fee: 140, nextAvailable: 'Tomorrow', type: 'Both', gender: 'Female', languages: ['English', 'Spanish'], hospital: 'Baptist Health' },
  { id: 8, name: 'Dr. David Kim', specialty: 'Cardiologist', experience: 9, rating: 4.5, reviews: 45, image: 'https://i.pravatar.cc/150?u=david', location: 'New York, NY', fee: 130, nextAvailable: 'Thu, Oct 15', type: 'Video', gender: 'Male', languages: ['English', 'Korean'], hospital: 'NYU Langone' },
  { id: 9, name: 'Dr. Maria Garcia', specialty: 'Dermatologist', experience: 6, rating: 4.8, reviews: 112, image: 'https://i.pravatar.cc/150?u=maria', location: 'Los Angeles, CA', fee: 150, nextAvailable: 'Today', type: 'Both', gender: 'Female', languages: ['English', 'Spanish'], hospital: 'LA Skin Care' },
  { id: 10, name: 'Dr. William Wright', specialty: 'Orthopedist', experience: 25, rating: 4.4, reviews: 89, image: 'https://i.pravatar.cc/150?u=william', location: 'Denver, CO', fee: 250, nextAvailable: 'Next Week', type: 'In-Person', gender: 'Male', languages: ['English'], hospital: 'Denver Sports Medicine' },
  { id: 11, name: 'Dr. Chloe Adams', specialty: 'Pediatrician', experience: 5, rating: 4.9, reviews: 67, image: 'https://i.pravatar.cc/150?u=chloe', location: 'Portland, OR', fee: 90, nextAvailable: 'Today', type: 'Video', gender: 'Female', languages: ['English', 'French'], hospital: 'Rose City Kids' },
  { id: 12, name: 'Dr. Omar Farooq', specialty: 'Neurologist', experience: 16, rating: 4.7, reviews: 140, image: 'https://i.pravatar.cc/150?u=omar', location: 'Houston, TX', fee: 190, nextAvailable: 'Tomorrow', type: 'Both', gender: 'Male', languages: ['English', 'Arabic', 'Urdu'], hospital: 'Texas Medical Center' },
];

const specialties = ['All Specialties', 'Cardiologist', 'Neurologist', 'Pediatrician', 'Dermatologist', 'Psychiatrist', 'Orthopedist', 'Gynecologist'];
const languagesList = ['English', 'Spanish', 'Mandarin', 'Hindi', 'Arabic', 'French', 'Korean'];

const DoctorListing = () => {
  // --- STATE MANAGEMENT ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    specialty: 'All Specialties',
    consultType: 'All',
    gender: 'All',
    maxFee: 250,
    languages: [],
  });
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  const itemsPerPage = 6;
  const gridRef = useRef(null);
  const { contextSafe } = useGSAP();

  // Simulate network request on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // --- FILTER & SORT LOGIC (useMemo for performance) ---
  const filteredAndSortedDoctors = useMemo(() => {
    let result = mockDoctors.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doc.hospital.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = filters.specialty === 'All Specialties' || doc.specialty === filters.specialty;
      const matchesType = filters.consultType === 'All' || doc.type === 'Both' || doc.type === filters.consultType;
      const matchesGender = filters.gender === 'All' || doc.gender === filters.gender;
      const matchesFee = doc.fee <= filters.maxFee;
      const matchesLanguage = filters.languages.length === 0 || filters.languages.some(lang => doc.languages.includes(lang));
      
      return matchesSearch && matchesSpecialty && matchesType && matchesGender && matchesFee && matchesLanguage;
    });

    switch (sortBy) {
      case 'rating': return result.sort((a, b) => b.rating - a.rating);
      case 'experience': return result.sort((a, b) => b.experience - a.experience);
      case 'priceLowHigh': return result.sort((a, b) => a.fee - b.fee);
      case 'priceHighLow': return result.sort((a, b) => b.fee - a.fee);
      default: return result; // 'recommended' - keep mock array order
    }
  }, [searchTerm, filters, sortBy]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredAndSortedDoctors.length / itemsPerPage);
  const currentDoctors = filteredAndSortedDoctors.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // --- GSAP ANIMATIONS ---
  useGSAP(() => {
    if (!isLoading && currentDoctors.length > 0) {
      gsap.fromTo('.doctor-card',
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', clearProps: 'all' }
      );
    }
  }, [currentDoctors, viewMode, isLoading]);

  // Reset to page 1 when filters change
  useEffect(() => { setCurrentPage(1); }, [searchTerm, filters, sortBy]);

  // --- HANDLERS ---
  const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
  
  const handleLanguageToggle = (lang) => {
    setFilters(prev => {
      const updatedLangs = prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang];
      return { ...prev, languages: updatedLangs };
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ specialty: 'All Specialties', consultType: 'All', gender: 'All', maxFee: 250, languages: [] });
    setSortBy('recommended');
  };

  // --- RENDER HELPERS ---
  const LoadingSkeleton = () => (
    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm animate-pulse">
          <div className="flex gap-4 mb-4">
            <div className="w-24 h-24 bg-gray-200 rounded-xl"></div>
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-8 border-t border-gray-100 font-sans">
      
      {/* --- HERO SEARCH SECTION --- */}
      <div className="bg-primary-900 text-white py-12 mb-8 -mt-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6">Find your specialist</h1>
          
          <div className="bg-white p-2 md:p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-5xl">
            <div className="flex-1 flex items-center px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200 group">
              <Search className="text-gray-400 group-focus-within:text-primary-600 transition-colors mr-3" size={22} />
              <input 
                type="text" 
                placeholder="Search doctors, specialties, or hospitals..." 
                className="w-full focus:outline-none text-gray-900 bg-transparent placeholder-gray-500 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200 group hidden md:flex">
              <MapPin className="text-gray-400 group-focus-within:text-primary-600 transition-colors mr-3" size={22} />
              <input type="text" placeholder="Location" className="w-full focus:outline-none text-gray-900 bg-transparent font-medium" defaultValue="New York, NY" />
            </div>
            <Button variant="primary" size="lg" className="md:px-10 rounded-xl text-lg shadow-lg">Search</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- LEFT SIDEBAR: ADVANCED FILTERS --- */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto custom-scrollbar">
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Filter size={20} className="text-primary-600" />
                  <h2 className="font-heading font-semibold text-gray-900 text-lg">Filters</h2>
                </div>
                {(searchTerm || filters.specialty !== 'All Specialties' || filters.consultType !== 'All' || filters.gender !== 'All' || filters.maxFee !== 250 || filters.languages.length > 0) && (
                  <button onClick={clearFilters} className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors">Clear all</button>
                )}
              </div>

              {/* Specialty Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Specialty</h3>
                <div className="space-y-2">
                  {specialties.map(spec => (
                    <label key={spec} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="specialty" 
                        checked={filters.specialty === spec}
                        onChange={() => handleFilterChange('specialty', spec)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300" 
                      />
                      <span className="text-gray-700 group-hover:text-primary-600 transition-colors text-sm">{spec}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Consultation Type Filter */}
              <div className="mb-6 pt-5 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider flex items-center gap-2"><Video size={16}/> Visit Type</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['All', 'Video', 'In-Person'].map(type => (
                    <button
                      key={type}
                      onClick={() => handleFilterChange('consultType', type)}
                      className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${filters.consultType === type ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="mb-6 pt-5 border-t border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2"><DollarSign size={16}/> Max Fee</h3>
                  <span className="text-primary-600 font-bold text-sm">${filters.maxFee}</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="300" 
                  step="10" 
                  value={filters.maxFee}
                  onChange={(e) => handleFilterChange('maxFee', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>$50</span>
                  <span>$300+</span>
                </div>
              </div>

              {/* Gender Filter */}
              <div className="mb-6 pt-5 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider flex items-center gap-2"><User size={16}/> Provider Gender</h3>
                <div className="flex gap-3">
                  {['All', 'Female', 'Male'].map(gender => (
                    <label key={gender} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="gender" 
                        checked={filters.gender === gender}
                        onChange={() => handleFilterChange('gender', gender)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300" 
                      />
                      <span className="text-gray-700 text-sm">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Languages Filter */}
              <div className="pt-5 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider flex items-center gap-2"><Globe size={16}/> Languages Spoken</h3>
                <div className="space-y-2">
                  {languagesList.map(lang => (
                    <label key={lang} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={filters.languages.includes(lang)}
                        onChange={() => handleLanguageToggle(lang)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" 
                      />
                      <span className="text-gray-700 text-sm group-hover:text-primary-600 transition-colors">{lang}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* --- RIGHT CONTENT: DOCTOR GRID & CONTROLS --- */}
          <div className="flex-1" ref={gridRef}>
            
            {/* Top Results Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 font-medium">
                Showing <span className="text-gray-900 font-bold">{filteredAndSortedDoctors.length}</span> providers
              </p>
              
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block py-1.5 px-3 outline-none cursor-pointer"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="rating">Highest Rating</option>
                    <option value="experience">Most Experience</option>
                    <option value="priceLowHigh">Fee: Low to High</option>
                    <option value="priceHighLow">Fee: High to Low</option>
                  </select>
                </div>

                {/* View Toggles */}
                <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Doctor Cards Container */}
            {isLoading ? (
              <LoadingSkeleton />
            ) : currentDoctors.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
                {currentDoctors.map((doc) => (
                  <div key={doc.id} className={`doctor-card bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 group flex ${viewMode === 'list' ? 'flex-col sm:flex-row gap-6' : 'flex-col'}`}>
                    
                    {/* Card Header/Image Block */}
                    <div className={`flex gap-4 ${viewMode === 'list' ? 'sm:w-1/3 sm:flex-col sm:items-center sm:text-center' : 'mb-4'}`}>
                      <div className="relative">
                        <img src={doc.image} alt={doc.name} className={`object-cover rounded-xl border border-gray-100 ${viewMode === 'list' ? 'w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-md' : 'w-24 h-24'}`} />
                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                          <CheckCircle2 size={18} className="text-success-500 fill-success-100" />
                        </div>
                      </div>
                      <div className={`flex-1 ${viewMode === 'list' ? 'sm:mt-2' : ''}`}>
                        <p className="text-primary-600 text-sm font-bold tracking-wide uppercase mb-1">{doc.specialty}</p>
                        <h3 className="font-heading font-bold text-lg text-gray-900 leading-tight">{doc.name}</h3>
                        <div className={`flex items-center gap-1 mt-2 font-bold text-sm ${viewMode === 'list' ? 'sm:justify-center' : ''}`}>
                          <Star size={16} className="text-yellow-500 fill-yellow-500" /> 
                          <span className="text-gray-900">{doc.rating}</span> 
                          <span className="text-gray-500 font-normal">({doc.reviews})</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Card Body/Info Block */}
                    <div className={`flex-1 flex flex-col justify-center ${viewMode === 'list' ? 'border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6' : ''}`}>
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <p className="flex items-center gap-2"><MapPin size={16} className="text-gray-400"/> <span className="font-medium text-gray-900">{doc.hospital}</span> • {doc.location}</p>
                        <p className="flex items-center gap-2"><ShieldCheck size={16} className="text-gray-400"/> {doc.experience} Years Experience</p>
                        <p className="flex items-center gap-2"><Globe size={16} className="text-gray-400"/> {doc.languages.join(', ')}</p>
                        <div className="flex gap-2 mt-2">
                          {(doc.type === 'Video' || doc.type === 'Both') && <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-medium flex items-center gap-1"><Video size={12}/> Video</span>}
                          {(doc.type === 'In-Person' || doc.type === 'Both') && <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded font-medium flex items-center gap-1"><User size={12}/> In-Person</span>}
                        </div>
                      </div>
                      
                      {/* Action Footer inside Card */}
                      <div className={`mt-auto pt-4 border-t border-gray-100 flex items-center justify-between ${viewMode === 'list' ? 'sm:mt-4' : ''}`}>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Consultation Fee</p>
                          <p className="font-heading font-bold text-lg text-primary-600">${doc.fee}</p>
                        </div>
                        <Link to={`/doctors/${doc.id}`}>
                          <Button variant="primary" className="group shadow-md hover:shadow-lg">
                            Book <span className="hidden sm:inline ml-1">Visit</span> <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                      <div className="mt-3 bg-gray-50 rounded-lg p-2 text-xs text-gray-600 flex items-center gap-2">
                        <Clock size={14} className="text-primary-500" /> Next available: <span className="font-semibold text-gray-900">{doc.nextAvailable}</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">No providers found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">We couldn't find any doctors matching your current filters. Try adjusting your search criteria or clearing filters.</p>
                <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
              </div>
            )}

            {/* Pagination Controls */}
            {!isLoading && totalPages > 1 && (
              <div className="mt-10 flex justify-center items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${currentPage === i + 1 ? 'bg-primary-600 text-white shadow-md' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorListing;