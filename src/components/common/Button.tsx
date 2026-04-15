import { Link } from 'react-router-dom';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  to?: string;
  children: ReactNode;
  className?: string;
}

export const Button = ({ variant = 'primary', to, children, className = '', ...props }: ButtonProps) => {
  // Clases base compartidas por ambos tipos de botón
  const baseStyles = " px-5 py-3 rounded-xl transition-colors flex items-center justify-center";

  // Clases específicas según el variante (tipo de botón)
  const variants = {
    primary: "bg-cyan-400 text-[#060b13] hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]",
    secondary: "border border-slate-600 text-white hover:bg-cyan-400/10 hover:text-cyan-400 hover:border-cyan-400"
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`.trim();

  // Si pasamos la prop 'to', renderizamos un Link de react-router-dom
  if (to) {
    return (
      <Link to={to} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  // Si no hay 'to', renderizamos un botón HTML normal
  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};
