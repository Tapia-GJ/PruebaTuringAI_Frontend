import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
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
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-8 transition-all duration-300 ${isScrolled
        ? 'py-4 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50'
        : 'py-6 bg-transparent border-b border-transparent'
        }`}
    >
      <Link to="/" className="text-cyan-400 font-bold text-xl uppercase tracking-widest font-mono drop-shadow-md">
        COMICS
      </Link>

      <div className="hidden md:flex gap-6 items-center text-sm font-medium">
        {user ? (
          <>
            <Link to="/catalog" className="text-slate-300 hover:text-white transition-colors">
              Catálogo
            </Link>
            {/* <Link to="/favorites" className="text-slate-300 hover:text-white transition-colors">
              Favoritos
            </Link> */}
            {user.roleId === 2 && (
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
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-slate-300 hover:text-white transition-colors"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/50 md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6 text-sm font-medium">
            {user ? (
              <>
                <Link
                  to="/catalog"
                  className="text-slate-300 hover:text-white transition-colors"
                  onClick={handleLinkClick}
                >
                  Catálogo
                </Link>
                {user.roleId === 2 && (
                  <Link
                    to="/admin"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    onClick={handleLinkClick}
                  >
                    Panel Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 transition-colors font-semibold text-left"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white transition-colors"
                  onClick={handleLinkClick}
                >
                  Iniciar sesión
                </Link>
                <Button
                  to="/register"
                  variant="primary"
                  className='font-semibold w-full'
                  onClick={handleLinkClick}
                >
                  Registrarse
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
