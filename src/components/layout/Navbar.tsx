import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      // Si el usuario bajó más de 20px, activamos el fondo
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 transition-all duration-300 ${isScrolled
        ? 'py-4 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50'
        : 'py-6 bg-transparent border-b border-transparent'
        }`}
    >
      <Link to="/" className="text-cyan-400 font-bold text-xl uppercase tracking-widest font-mono drop-shadow-md">
        COMICS
      </Link>

      <div className="flex gap-6 items-center text-sm font-medium">
        {user ? (
          <>
            <Link to="/catalog" className="text-slate-300 hover:text-white transition-colors">
              Catálogo
            </Link>
            <Link to="/favorites" className="text-slate-300 hover:text-white transition-colors">
              Favoritos
            </Link>
            {user.role === 'ADMIN' && (
              <Link to="/admin" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Panel Admin
              </Link>
            )}
            <button onClick={handleLogout} className="text-red-400 hover:text-red-300 transition-colors font-semibold">
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-slate-300 hover:text-white transition-colors">
              Iniciar sesión
            </Link>
            <Button to="/register" variant="primary" className='font-semibold'>
              Registrarse
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};
