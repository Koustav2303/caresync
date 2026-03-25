import { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  id, 
  icon: Icon, 
  className = '', 
  ...props 
}, ref) => {
  // Auto-generate an ID for accessibility if one isn't provided
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {/* Render icon if passed via props */}
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full rounded-lg border bg-white px-4 py-2.5 text-sm transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
            disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500
            ${Icon ? 'pl-10' : ''} 
            ${error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 hover:border-gray-300'}
            ${className}
          `}
          {...props}
        />
      </div>
      {/* Display error message securely below the input */}
      {error && <span className="text-xs font-medium text-red-500 mt-0.5">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;