import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  User, Lock, Bell, Palette, Camera, Save, 
  Shield, Smartphone, Mail, AlertCircle, CheckCircle2
} from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

// --- MOCK USER DATA ---
const initialProfile = {
  firstName: 'Alex',
  lastName: 'Johnson',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 019-8273',
  dob: '1990-05-15',
  bloodGroup: 'O+',
  emergencyContact: 'Sarah Johnson (Spouse) - +1 (555) 019-1111'
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState(initialProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Toggles State
  const [toggles, setToggles] = useState({
    twoFactor: true,
    emailNotif: true,
    smsNotif: false,
    marketing: false,
    darkMode: false,
  });

  const contentRef = useRef(null);
  const { contextSafe } = useGSAP();

  // Handle Input Changes
  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.id]: e.target.value });
  };

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Animate tab content changes
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', clearProps: 'all' }
      );
    }
  }, [activeTab]);

  // Mock Save Functionality
  const handleSave = contextSafe((e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      
      // Toast animation
      gsap.fromTo('.toast-message',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' }
      );

      setTimeout(() => {
        gsap.to('.toast-message', { opacity: 0, y: 20, duration: 0.3, onComplete: () => setShowSuccess(false) });
      }, 3000);
    }, 1200);
  });

  // Reusable Toggle Component
  const ToggleSwitch = ({ label, desc, isChecked, onToggle }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
      <div className="pr-4">
        <h4 className="text-sm font-bold text-gray-900">{label}</h4>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
      <button 
        type="button"
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${isChecked ? 'bg-primary-600' : 'bg-gray-200'}`}
      >
        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isChecked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-12 relative">
      
      {/* Toast Notification */}
      {showSuccess && (
        <div className="toast-message fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50">
          <CheckCircle2 size={20} className="text-success-400" />
          <span className="font-medium">Settings saved successfully</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600">Manage your personal information, security preferences, and notifications.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* --- SETTINGS SIDEBAR --- */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <nav className="flex flex-row lg:flex-col overflow-x-auto custom-scrollbar p-2 gap-1">
              {[
                { id: 'profile', label: 'Personal Info', icon: User },
                { id: 'security', label: 'Password & Security', icon: Lock },
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'appearance', label: 'Appearance', icon: Palette },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === item.id 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon size={18} className={activeTab === item.id ? 'text-primary-600' : 'text-gray-400'} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* --- SETTINGS CONTENT AREA --- */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8" ref={contentRef}>
            
            {/* TAB: PROFILE */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSave} className="space-y-8">
                <div>
                  <h2 className="text-xl font-heading font-bold text-gray-900 mb-1">Personal Information</h2>
                  <p className="text-sm text-gray-500 mb-6">Update your photo and personal details here.</p>
                  
                  {/* Avatar Upload */}
                  <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                    <div className="relative group cursor-pointer">
                      <img src="https://i.pravatar.cc/150?u=patient" alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shadow-sm" />
                      <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="text-white" size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Profile Photo</h3>
                      <p className="text-xs text-gray-500 mb-3">JPG, GIF or PNG. Max size of 800K</p>
                      <div className="flex gap-3">
                        <Button type="button" variant="outline" size="sm">Upload New</Button>
                        <Button type="button" variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">Remove</Button>
                      </div>
                    </div>
                  </div>

                  {/* Form Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input id="firstName" label="First Name" value={profileData.firstName} onChange={handleChange} />
                    <Input id="lastName" label="Last Name" value={profileData.lastName} onChange={handleChange} />
                    <Input id="email" label="Email Address" type="email" value={profileData.email} onChange={handleChange} />
                    <Input id="phone" label="Phone Number" type="tel" value={profileData.phone} onChange={handleChange} />
                    <Input id="dob" label="Date of Birth" type="date" value={profileData.dob} onChange={handleChange} />
                    <Input id="bloodGroup" label="Blood Group" value={profileData.bloodGroup} onChange={handleChange} />
                    <div className="sm:col-span-2">
                      <Input id="emergencyContact" label="Emergency Contact" value={profileData.emergencyContact} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-100">
                  <Button type="submit" variant="primary" isLoading={isSaving} className="shadow-md">
                    <Save size={18} className="mr-2" /> Save Changes
                  </Button>
                </div>
              </form>
            )}

            {/* TAB: SECURITY */}
            {activeTab === 'security' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-heading font-bold text-gray-900 mb-1">Password & Security</h2>
                  <p className="text-sm text-gray-500 mb-6">Manage your password and secure your account.</p>
                  
                  <form onSubmit={handleSave} className="space-y-5 max-w-md mb-8">
                    <Input id="currentPass" label="Current Password" type="password" placeholder="••••••••" />
                    <Input id="newPass" label="New Password" type="password" placeholder="••••••••" />
                    <Input id="confirmPass" label="Confirm New Password" type="password" placeholder="••••••••" />
                    <Button type="submit" variant="primary" isLoading={isSaving} className="mt-2">Update Password</Button>
                  </form>
                </div>

                <div className="pt-8 border-t border-gray-100">
                  <h3 className="text-lg font-heading font-bold text-gray-900 mb-4 flex items-center gap-2"><Shield className="text-primary-500" size={20}/> Advanced Security</h3>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <ToggleSwitch 
                      label="Two-Factor Authentication (2FA)" 
                      desc="Add an extra layer of security to your account using an authenticator app."
                      isChecked={toggles.twoFactor}
                      onToggle={() => handleToggle('twoFactor')}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-heading font-bold text-gray-900 mb-1">Notification Preferences</h2>
                <p className="text-sm text-gray-500 mb-8">Choose what updates you want to receive and how.</p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2"><Mail size={16} className="text-gray-400"/> Email Notifications</h3>
                    <div className="bg-white rounded-xl border border-gray-200 px-4">
                      <ToggleSwitch 
                        label="Appointment Reminders" 
                        desc="Receive emails 24 hours before your scheduled visit."
                        isChecked={toggles.emailNotif}
                        onToggle={() => handleToggle('emailNotif')}
                      />
                      <ToggleSwitch 
                        label="News & Marketing" 
                        desc="Receive updates about new doctors and features."
                        isChecked={toggles.marketing}
                        onToggle={() => handleToggle('marketing')}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2"><Smartphone size={16} className="text-gray-400"/> SMS Notifications</h3>
                    <div className="bg-white rounded-xl border border-gray-200 px-4">
                      <ToggleSwitch 
                        label="Urgent Alerts" 
                        desc="Receive text messages for immediate appointment changes."
                        isChecked={toggles.smsNotif}
                        onToggle={() => handleToggle('smsNotif')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: APPEARANCE */}
            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-xl font-heading font-bold text-gray-900 mb-1">Appearance</h2>
                <p className="text-sm text-gray-500 mb-8">Customize how CareSync looks on your device.</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {/* Light Theme */}
                  <button 
                    onClick={() => handleToggle('darkMode')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${!toggles.darkMode ? 'border-primary-600 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
                  >
                    <div className="w-full h-24 bg-gray-100 rounded-lg mb-3 border border-gray-200 overflow-hidden flex flex-col">
                      <div className="h-6 bg-white border-b border-gray-200"></div>
                      <div className="flex-1 flex p-2 gap-2">
                        <div className="w-1/3 h-full bg-white rounded border border-gray-200"></div>
                        <div className="w-2/3 h-full bg-white rounded border border-gray-200"></div>
                      </div>
                    </div>
                    <p className={`font-bold text-center ${!toggles.darkMode ? 'text-primary-900' : 'text-gray-700'}`}>Light Mode</p>
                  </button>

                  {/* Dark Theme */}
                  <button 
                    onClick={() => handleToggle('darkMode')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${toggles.darkMode ? 'border-primary-600 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
                  >
                    <div className="w-full h-24 bg-gray-900 rounded-lg mb-3 border border-gray-700 overflow-hidden flex flex-col">
                      <div className="h-6 bg-gray-800 border-b border-gray-700"></div>
                      <div className="flex-1 flex p-2 gap-2">
                        <div className="w-1/3 h-full bg-gray-800 rounded border border-gray-700"></div>
                        <div className="w-2/3 h-full bg-gray-800 rounded border border-gray-700"></div>
                      </div>
                    </div>
                    <p className={`font-bold text-center ${toggles.darkMode ? 'text-primary-900' : 'text-gray-700'}`}>Dark Mode</p>
                  </button>
                </div>

                <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex gap-3 items-start border border-blue-100">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm">Dark mode implementation is currently in beta. You may experience slight visual inconsistencies across certain pages.</p>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;