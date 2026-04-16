import React, { useState, useRef, useEffect } from 'react';

interface Option {
  label: string;
  value: number | string;
}

interface MultiSelectProps {
  options: Option[];
  value: (number | string)[];
  onChange: (value: (number | string)[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MultiSelect({ options, value, onChange, placeholder = "Seleccionar...", disabled = false }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cerrar el dropdown si se hace click afuera
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const toggleOption = (optionValue: number | string) => {
    if (disabled) return;
    
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue) // Si ya estaba, lo sacamos
      : [...value, optionValue];             // Si no estaba, lo agregamos
      
    onChange(newValue);
  };

  const removeOption = (e: React.MouseEvent, optionValue: number | string) => {
    e.stopPropagation(); // Evitar que se abra el dropdown al hacer click en la cruz
    if (disabled) return;
    onChange(value.filter(v => v !== optionValue));
  };

  // Obtener los labels de las opciones seleccionadas
  const selectedOptions = options.filter(opt => value.includes(opt.value));

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Caja principal del input */}
      <div 
        className={`min-h-[42px] w-full bg-slate-900/50 border ${isOpen ? 'border-cyan-400 ring-1 ring-cyan-400/50' : 'border-slate-700/50'} rounded-lg px-3 py-2 flex flex-wrap gap-2 items-center cursor-pointer transition-colors duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {selectedOptions.length === 0 ? (
          <span className="text-slate-500 text-sm ml-1">{placeholder}</span>
        ) : (
          selectedOptions.map(opt => (
            <span 
              key={opt.value} 
              className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded text-sm flex items-center gap-1.5"
            >
              {opt.label}
              <button 
                type="button"
                className="hover:text-cyan-100 hover:bg-cyan-500/40 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
                onClick={(e) => removeOption(e, opt.value)}
              >
                ×
              </button>
            </span>
          ))
        )}
        
        {/* Flechita del dropdown */}
        <div className="ml-auto text-slate-400">
          <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Lista desplegable */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-400 text-center">No hay opciones disponibles</div>
          ) : (
            <ul className="py-1">
              {options.map(opt => {
                const isSelected = value.includes(opt.value);
                return (
                  <li 
                    key={opt.value}
                    className={`px-4 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-slate-700 transition-colors ${isSelected ? 'text-cyan-400 bg-slate-700/50 font-medium' : 'text-slate-200'}`}
                    onClick={() => toggleOption(opt.value)}
                  >
                    {opt.label}
                    {isSelected && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
