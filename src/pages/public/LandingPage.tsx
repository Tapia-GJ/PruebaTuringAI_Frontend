import { Link } from 'react-router-dom';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ComicCard } from '../../components/ui/ComicCard';
import { Button } from '../../components/common/Button';

// Registrar el plugin para React (buena práctica recomendada por tu skill)
gsap.registerPlugin(useGSAP);

// Dummy data basado en tu mockup
const NOVEDADES = [
  { id: 1, title: 'Cyber City Chronicles', author: 'Aris Thorne', genres: ['Sci-Fi', 'Noir'], isNew: true, coverUrl: 'https://marmota.me/wp-content/uploads/2024/12/Justice-League-Unlimited-001digital-Marika-Empire-000-scaled.jpg' },
  { id: 2, title: 'The Neon Soul', author: 'Elena Vance', genres: ['Drama', 'Tech'], coverUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=400&auto=format&fit=crop' },
  { id: 3, title: 'Void Runners', author: 'Marcus Jin', genres: ['Space Opera', 'Acción'], coverUrl: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=400&auto=format&fit=crop' },
  { id: 4, title: 'Silicon Dreams', author: 'Lora K.', genres: ['Cyberpunk', 'Filosofía'], coverUrl: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=400&auto=format&fit=crop' },
];

export const LandingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  useGSAP((_context, contextSafe) => {
    // Definimos el timeline para encadenar animaciones limpiamente
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Pre-seteamos el H1 para ocultarlo al inicio con un wipe
    gsap.set(".hero-title-line", { clipPath: "inset(0 100% 0 0)" });

    // Set inicial para la tarjeta interactiva
    gsap.set(".hero-poster-inner", { rotationY: -15, rotationX: 5, rotationZ: -2 });

    // 1. Badge flotando desde abajo
    tl.from(".hero-badge", {
      y: 20,
      opacity: 0,
      duration: 0.6
    });

    // 2. Efecto escritura (revelado izquierda a derecha) del título
    tl.to(".hero-title-line", {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.2,
      stagger: 0.2, // Una línea tras otra
      ease: "power2.inOut"
    }, "-=0.2");

    // 3. Animamos párrafo entrando desde la izquierda
    tl.from(".hero-desc", {
      opacity: 0,
      x: -30,
      duration: 0.8
    }, "-=0.6");

    // 4. Botones
    tl.from(".hero-cta", {
      opacity: 0,
      y: 10,
      duration: 0.5,
      stagger: 0.1
    }, "-=0.4");

    // 5. El póster en 3D que aparece
    tl.from(".hero-poster", {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: "power4.out"
    }, "-=1.5");

    // --- INTERACCIÓN CON EL MOUSE ---

    // Usamos gsap.quickTo para un rendimiento superior al seguir el mouse
    if (!contextSafe) return; // Verificación de seguridad

    const xTo = gsap.quickTo(".hero-poster-inner", "rotationY", { ease: "power3", duration: 0.6 });
    const yTo = gsap.quickTo(".hero-poster-inner", "rotationX", { ease: "power3", duration: 0.6 });

    const handleMouseMove = contextSafe((e: MouseEvent) => {
      if (!posterRef.current) return;

      // Sacamos las medidas y posición específica de la imagen
      const rect = posterRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalizamos la posición de -1 a 1 pero SOLO respecto al centro de la imagen
      const normalizedX = (e.clientX - centerX) / (rect.width / 2);
      const normalizedY = (e.clientY - centerY) / (rect.height / 2);

      // El efecto debe ser más fuerte ahora que el área es más pequeña
      xTo(-15 + (normalizedX * 15));
      yTo(5 - (normalizedY * 15));
    });

    const handleMouseLeave = contextSafe(() => {
      xTo(-15);
      yTo(5);
    });

    // En vez de window, atamos los eventos SOLO a la tarjeta
    const posterEl = posterRef.current;
    if (posterEl) {
      posterEl.addEventListener("mousemove", handleMouseMove);
      posterEl.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (posterEl) {
        posterEl.removeEventListener("mousemove", handleMouseMove);
        posterEl.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

  }, { scope: containerRef }); // Muy importante encapsular para evitar errores de render

  return (
    <div ref={containerRef} className="w-full flex flex-col relative">
      {/* FONDO GLOBAL DE LA LANDING */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Grilla con máscara para que se desvanezca suavemente */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        {/* Resplandor Cyan centrado arriba */}
        <div className="absolute left-1/2 top-[-10%] h-250 w-250 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,rgba(34,211,238,0.12),transparent)]"></div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center z-10">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 pt-32">

          {/* Left: Copy & CTAs */}
          <div className="flex flex-col items-start gap-6">
            <span className="hero-badge border border-cyan-400/50 rounded-lg bg-cyan-400/10 text-cyan-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1">
              PIONEROS DEL ARTE DIGITAL
            </span>

            {/* Separamos el H1 en contenedores para que el clipPath anime línea por línea sin cortar descensos de letras */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              <div className="hero-title-line inline-block w-full pb-2">Descubre el</div>
              <div className="hero-title-line inline-block w-full pb-2">Futuro del</div>
              <div className="hero-title-line inline-block w-full text-cyan-400 pb-2">Noveno Arte</div>
            </h1>

            <p className="hero-desc text-lg text-slate-300 max-w-md leading-relaxed">
              Explora una biblioteca de narrativas visuales impulsadas por creatividad humana sin límites.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Button to="/catalog" variant="primary" className="hero-cta font-semibold">
                Explorar cómics
              </Button>
              <Button to="/register" variant="secondary" className="hero-cta">
                Registrate
              </Button>
            </div>
          </div>

          {/* Right: Featured Hero Image / Card */}
          <div ref={posterRef} className="hero-poster hidden lg:flex justify-center items-center" style={{ perspective: '1000px' }}>
            <div className="hero-poster-inner relative w-full max-w-sm aspect-2/3 rounded-sm shadow-[0_0_80px_rgba(0,240,255,0.08)]">
              <div
                className="absolute inset-0 bg-cover bg-center rounded-sm border-2 border-slate-800/50"
                style={{ backgroundImage: "url('https://marmota.me/wp-content/uploads/2022/06/Nightwing-078-001.jpg')" }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#060b13]/90 via-[#060b13]/20 to-transparent rounded-sm" />

            </div>
          </div>
        </div>
      </section>

      {/* 2. NOVEDADES SECTION */}
      <section className="relative w-full py-24 border-t border-slate-800/30 z-10 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-16 gap-6">
            <div className="relative pb-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">NOVEDADES</h2>
              <div className="absolute bottom-0 left-0 w-16 h-1 bg-cyan-400" />
            </div>

            <Link to="/catalog" className="text-cyan-400 font-bold text-xs sm:text-sm tracking-[0.15em] uppercase hover:text-cyan-300 transition-colors">
              VER TODO EL CATÁLOGO
            </Link>
          </div>

          {/* Grid de Novedades */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {NOVEDADES.map(comic => (
              <ComicCard key={comic.id} {...comic} />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};
