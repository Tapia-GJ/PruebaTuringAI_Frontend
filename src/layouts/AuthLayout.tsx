import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full bg-[#060b13] flex items-center justify-center relative overflow-hidden selection:bg-cyan-400/30 selection:text-cyan-50">
      {/* Background Decorativo */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-125 w-125 rounded-full bg-[radial-gradient(circle_400px_at_50%_50%,rgba(34,211,238,0.08),transparent)] blur-3xl"></div>
      </div>

      {/* Tarjeta de Contenido */}
      <div className="relative z-10 w-full max-w-md p-6 sm:p-10 mx-4 bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 shadow-2xl rounded-2xl">

        <Outlet />
      </div>
    </div>
  );
};
