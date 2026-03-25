import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const formRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.fromTo(formRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/dashboard'); 
      }, 1500);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (errors[e.target.id]) setErrors({ ...errors, [e.target.id]: null });
  };

  return (
    <div ref={formRef} className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">Create an account</h1>
        <p className="text-gray-500">Start your journey to better health today.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          id="name"
          label="Full Name"
          type="text"
          placeholder="John Doe"
          icon={User}
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <Input 
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <div className="relative">
          <Input 
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            icon={Lock}
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <button
            type="button"
            className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <Input 
          id="confirmPassword"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          placeholder="Repeat password"
          icon={Lock}
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <Button type="submit" variant="primary" className="w-full mt-4" isLoading={isLoading}>
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/auth/login" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
          Sign in here
        </Link>
      </p>
    </div>
  );
};

export default Signup;