import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  Activity, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, 
  Search, Thermometer, Brain, Stethoscope, Loader2
} from 'lucide-react';
import Button from '../../components/ui/Button';

const commonSymptoms = [
  'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea', 
  'Shortness of breath', 'Sore throat', 'Body aches', 
  'Dizziness', 'Loss of taste/smell', 'Chest pain', 'Chills'
];

const SymptomChecker = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: '',
    ageGroup: '',
    symptoms: [],
    severity: 5,
    duration: '1-3 days'
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const stepContainerRef = useRef(null);
  const { contextSafe } = useGSAP();

  // Animate content when step changes
  useEffect(() => {
    if (stepContainerRef.current && step < 4) {
      gsap.fromTo(stepContainerRef.current.children,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [step]);

  const handleNext = contextSafe(() => {
    if (step === 3) {
      setStep(4);
      setIsAnalyzing(true);
      // Simulate AI processing time
      setTimeout(() => {
        setIsAnalyzing(false);
        gsap.fromTo('.results-animate', 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out' }
        );
      }, 2500);
    } else {
      gsap.to(stepContainerRef.current, {
        opacity: 0, x: -20, duration: 0.2, onComplete: () => {
          setStep(s => s + 1);
          gsap.set(stepContainerRef.current, { opacity: 1, x: 0 });
        }
      });
    }
  });

  const handleBack = contextSafe(() => {
    gsap.to(stepContainerRef.current, {
      opacity: 0, x: 20, duration: 0.2, onComplete: () => {
        setStep(s => s - 1);
        gsap.set(stepContainerRef.current, { opacity: 1, x: 0 });
      }
    });
  });

  const toggleSymptom = (symptom) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const filteredSymptoms = commonSymptoms.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

  // Progress Bar Width
  const progressPercentage = ((step - 1) / 3) * 100;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2 flex items-center gap-3">
          <Activity className="text-primary-600" size={32} /> Smart Symptom Checker
        </h1>
        <p className="text-gray-600">Answer a few quick questions to get insights into your symptoms and find the right care.</p>
      </div>

      {/* Progress Bar (Hide on results step) */}
      {step < 4 && (
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
            <span>Step {step} of 3</span>
            <span>{Math.round(progressPercentage)}% Completed</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-600 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
        
        {step < 4 ? (
          <div className="p-6 sm:p-10 flex flex-col h-full" ref={stepContainerRef}>
            
            {/* --- STEP 1: BASIC INFO --- */}
            {step === 1 && (
              <div className="flex-1">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Let's start with the basics</h2>
                
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Biological Sex</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['Male', 'Female'].map(gender => (
                      <button
                        key={gender}
                        onClick={() => setFormData({...formData, gender})}
                        className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${formData.gender === gender ? 'border-primary-600 bg-primary-50 text-primary-900 shadow-sm' : 'border-gray-200 text-gray-600 hover:border-primary-300'}`}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Age Group</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Under 18', '18-35', '36-55', '56+'].map(age => (
                      <button
                        key={age}
                        onClick={() => setFormData({...formData, ageGroup: age})}
                        className={`py-3 px-4 rounded-xl border-2 text-center font-medium transition-all ${formData.ageGroup === age ? 'border-primary-600 bg-primary-50 text-primary-900 shadow-sm' : 'border-gray-200 text-gray-600 hover:border-primary-300'}`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* --- STEP 2: SYMPTOMS --- */}
            {step === 2 && (
              <div className="flex-1">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">What are you feeling?</h2>
                <p className="text-gray-500 mb-6">Select all symptoms that apply to you right now.</p>
                
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search symptoms (e.g., headache, fever)..." 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-2 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
                  {filteredSymptoms.map(symptom => {
                    const isSelected = formData.symptoms.includes(symptom);
                    return (
                      <button
                        key={symptom}
                        onClick={() => toggleSymptom(symptom)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${isSelected ? 'bg-primary-600 text-white border-primary-600 shadow-md transform scale-105' : 'bg-white text-gray-700 border-gray-200 hover:border-primary-400 hover:bg-primary-50'}`}
                      >
                        {symptom} {isSelected && '✓'}
                      </button>
                    );
                  })}
                  {filteredSymptoms.length === 0 && <p className="text-gray-500 text-sm">No exact matches found. Try selecting from the common list.</p>}
                </div>
              </div>
            )}

            {/* --- STEP 3: DETAILS --- */}
            {step === 3 && (
              <div className="flex-1">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Just a few more details</h2>
                <p className="text-gray-500 mb-8">Help us understand the severity and duration of your symptoms.</p>

                <div className="mb-10">
                  <div className="flex justify-between items-end mb-4">
                    <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider">Overall Severity</label>
                    <span className={`text-sm font-bold px-2 py-1 rounded-md ${formData.severity < 4 ? 'bg-green-100 text-green-700' : formData.severity < 8 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {formData.severity}/10 ({formData.severity < 4 ? 'Mild' : formData.severity < 8 ? 'Moderate' : 'Severe'})
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="1" max="10" 
                    value={formData.severity}
                    onChange={(e) => setFormData({...formData, severity: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                    <span>Mild (1)</span>
                    <span>Severe (10)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">How long have you felt this way?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Less than 24 hours', '1-3 days', '1 week', 'More than a week'].map(duration => (
                      <button
                        key={duration}
                        onClick={() => setFormData({...formData, duration})}
                        className={`py-3 px-4 rounded-xl border-2 text-center text-sm font-medium transition-all ${formData.duration === duration ? 'border-primary-600 bg-primary-50 text-primary-900 shadow-sm' : 'border-gray-200 text-gray-600 hover:border-primary-300'}`}
                      >
                        {duration}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step Controls Footer */}
            <div className="mt-auto pt-8 border-t border-gray-100 flex justify-between items-center">
              <Button 
                variant="ghost" 
                onClick={handleBack} 
                disabled={step === 1}
                className={step === 1 ? 'invisible' : ''}
              >
                <ArrowLeft size={18} className="mr-2" /> Back
              </Button>
              <Button 
                variant="primary" 
                onClick={handleNext}
                disabled={
                  (step === 1 && (!formData.gender || !formData.ageGroup)) ||
                  (step === 2 && formData.symptoms.length === 0) ||
                  (step === 3 && !formData.duration)
                }
              >
                {step === 3 ? 'Analyze Symptoms' : 'Continue'} <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          
          /* --- STEP 4: AI ANALYSIS RESULTS --- */
          <div className="p-6 sm:p-10 bg-gray-50 h-full flex flex-col items-center justify-center min-h-[500px]">
            {isAnalyzing ? (
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 border-4 border-primary-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
                  <Brain className="absolute inset-0 m-auto text-primary-600 animate-pulse" size={32} />
                </div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Analyzing your symptoms...</h2>
                <p className="text-gray-500">Cross-referencing {formData.symptoms.length} symptoms with our medical database.</p>
              </div>
            ) : (
              <div className="w-full max-w-2xl text-left">
                <div className="results-animate mb-6 inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm font-bold">
                  <AlertCircle size={18} /> Possible Conditions Identified
                </div>
                <h2 className="results-animate text-3xl font-heading font-bold text-gray-900 mb-2">Assessment Complete</h2>
                <p className="results-animate text-gray-600 mb-8 border-b border-gray-200 pb-6">Based on your reported symptoms ({formData.symptoms.join(', ')}), here are the most common matches. <strong className="text-gray-900">This is not a medical diagnosis.</strong></p>

                {/* Mock Results */}
                <div className="space-y-4 mb-8">
                  <div className="results-animate bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
                    <div className="bg-red-50 p-3 rounded-xl text-red-500 mt-1">
                      <Thermometer size={24} />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-heading font-bold text-lg text-gray-900">Viral Infection (Flu/Cold)</h3>
                        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">High Match</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Your combination of fever, fatigue, and body aches strongly suggests a standard viral infection.</p>
                      <Link to="/dashboard/appointments" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center">
                        Consult a General Physician <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>

                  <div className="results-animate bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-500 mt-1">
                      <Stethoscope size={24} />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-heading font-bold text-lg text-gray-900">Seasonal Allergies</h3>
                        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">Moderate Match</span>
                      </div>
                      <p className="text-sm text-gray-600">Depending on your environment, allergies can mimic mild viral symptoms.</p>
                    </div>
                  </div>
                </div>

                <div className="results-animate flex flex-col sm:flex-row gap-4">
                  <Link to="/doctors" className="flex-1">
                    <Button variant="primary" size="lg" className="w-full shadow-lg">Find a Doctor Now</Button>
                  </Link>
                  <Button variant="outline" size="lg" className="flex-1 bg-white" onClick={() => {setStep(1); setFormData({...formData, symptoms: []});}}>Start Over</Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;