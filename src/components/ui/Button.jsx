import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false, 
  disabled = false, 
  ...props 
}, ref) => {
  
  // Base structural classes applied to EVERY button
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl shrink-0";
  
  // Strict color mappings for different variants
  const variants = {
    primary: "bg-primary-600 text-white border border-transparent hover:bg-primary-700 shadow-sm",
    
    outline: "bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50",
    
    ghost: "bg-transparent text-gray-600 border-2 border-transparent hover:text-primary-700 hover:bg-primary-50",
  };

  // Consistent sizing
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      // The order here matters. className is placed last so any specific overrides you 
      // passed in the page files will successfully override the base variants.
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;