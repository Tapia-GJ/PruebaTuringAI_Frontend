import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const MainLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-black text-slate-100 font-sans selection:bg-cyan-500/30">
      <Navbar />
      {/* Al hacer el navbar absoluto, el main ya no necesita empujar, pero sí debe ocupar el espacio */}
      <main className="flex-1 w-full relative z-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
