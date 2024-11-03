import React from 'react';
import { toast } from 'react-toastify';

interface CustomToastProps {
  message: string;
  variant?: 'default' | 'gray' | 'teal' | 'blue' | 'red' | 'yellow';
}

const variantClasses = {
  default: 'bg-gray-800 text-white dark:bg-neutral-900',
  gray: 'bg-gray-500 text-white dark:bg-neutral-700',
  teal: 'bg-teal-500 text-white',
  blue: 'bg-blue-500 text-white',
  red: 'bg-red-500 text-white',
  yellow: 'bg-yellow-500 text-white',
};

const CustomToast: React.FC<CustomToastProps> = ({ message, variant = 'default' }) => {
  return (
    <div className={`max-w-xs ${variantClasses[variant]} text-sm rounded-xl shadow-lg`} role="alert">
      <div className="flex p-4">
        {message}
        <div className="ms-auto">
          <button
            type="button"
            className="inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100"
            onClick={() => toast.dismiss()}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomToast;