import { Outlet, useLocation, Link } from 'react-router-dom';
import { BookOpen, Users, Tag, Home, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

export const AdminLayout = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems: NavItem[] = [
    { icon: <BookOpen size={20} />, label: 'Obras', path: '/admin/works' },
    { icon: <Users size={20} />, label: 'Autores', path: '/admin/authors' },
    { icon: <Tag size={20} />, label: 'Géneros', path: '/admin/genres' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col lg:flex-row">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-60 bg-slate-950 border-r border-slate-800/50 flex flex-col z-50 transform transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-800/50">
          <h1 className="text-cyan-400 font-bold text-lg uppercase tracking-widest font-mono">
            Admin Panel
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive(item.path)
                ? 'bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="border-t border-slate-800/50 p-4 space-y-2">
          <Link
            to="/catalog"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 transition-all duration-200"
          >
            <Home size={20} />
            <span className="text-sm font-medium">Volver al Catálogo</span>
          </Link>
          <button
            onClick={() => {
              closeSidebar();
              handleLogout();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full">
        <div className="lg:hidden flex items-center justify-between bg-slate-950 border-b border-slate-800/50 px-4 py-4">
          <h2 className="text-slate-100 font-semibold">Panel de Administración</h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-900 rounded-lg transition-colors duration-200"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <X size={24} className="text-cyan-400" />
            ) : (
              <Menu size={24} className="text-slate-400" />
            )}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
