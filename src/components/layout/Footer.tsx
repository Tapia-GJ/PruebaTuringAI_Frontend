
export const Footer = () => {
  return (
    <footer className="w-full bg-black/40 text-slate-400 pt-16 pb-8 border-t border-slate-800/50">
      <div className="flex max-w-7xl mx-auto justify-between mb-12 px-8">
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="text-cyan-400 font-bold text-xl uppercase tracking-widest font-mono">
            COMICS
          </h3>
          <p className="text-sm leading-relaxed max-w-xs">
            Redefiniendo la narrativa secuencial a través de la síntesis de arte algorítmico y genio creativo.
          </p>
        </div>

        {/* Links: Legal */}
        <div className="">
          <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6">Legal</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Términos de Uso</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacidad</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Copyright AI</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-slate-800/50 flex items-center justify-between text-xs font-mono">
        <p>© 2026 COMICS.</p>
      </div>
    </footer>
  );
};
