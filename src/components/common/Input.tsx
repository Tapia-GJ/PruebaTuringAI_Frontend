import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <label htmlFor={inputId} className="text-sm font-medium text-slate-300">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`bg-slate-900/50 border ${
            error ? 'border-red-500 focus:border-red-500' : 'border-slate-700/50 focus:border-cyan-400'
          } rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 outline-none transition-colors duration-200 focus:ring-1 focus:ring-cyan-400/50 w-full`}
          {...props}
        />
        {error && <span className="text-xs text-red-400 mt-0.5">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
