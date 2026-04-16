import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../../components/common/Button';
import { getLatestWorks } from '../../api/works.api';
import type { Work } from '../../types/work.types';

// Registrar el plugin para React y ScrollTrigger
gsap.registerPlugin(useGSAP, ScrollTrigger);

// Fallback image if cover is not available
const FALLBACK_IMAGE = 'https://marmota.me/wp-content/uploads/2022/06/Nightwing-078-001.jpg';

export const LandingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const [accordionWorks, setAccordionWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestWorks = async () => {
      try {
        setIsLoading(true);
        const works = await getLatestWorks();
        setAccordionWorks(works);
      } catch (error) {
        console.error('Error fetching latest works:', error);
        // Keep the loading state hidden on error - don't show accordion
        setAccordionWorks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestWorks();
  }, []);

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

    // --- ANIMACIONES ON SCROLL ---

    // Animación de letras subiendo para Novedades
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".novedades-section",
        start: "top 60%", // Cuando el top de la sección llega al 80% de la ventana
        toggleActions: "play none none none",
        once: true
      }
    });

    scrollTl.from(".novedades-char", {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.01, // Stagger entre cada letra
      ease: "back.out(1.5)"
    }).from(".novedades-heading", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.3").fromTo(".accordion-item",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out", clearProps: "transform" },
      "-=0.5"
    );

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

    // --- ACCORDION HOVER INTERACTIONS ---

    const accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach((item: Element) => {
      item.addEventListener("mouseenter", () => {
        // Animar la sombra cyan al hacer hover
        gsap.to(item, {
          filter: "drop-shadow(0 0 30px rgba(34, 211, 238, 0.6))",
          duration: 0.3,
          ease: "power2.out"
        });
      });

      item.addEventListener("mouseleave", () => {
        // Revertir la sombra
        gsap.to(item, {
          filter: "drop-shadow(0 0 0px rgba(34, 211, 238, 0))",
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    return () => {
      if (posterEl) {
        posterEl.removeEventListener("mousemove", handleMouseMove);
        posterEl.removeEventListener("mouseleave", handleMouseLeave);
      }

      accordionItems.forEach((item: Element) => {
        item.removeEventListener("mouseenter", () => { });
        item.removeEventListener("mouseleave", () => { });
      });
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
      <section className="novedades-section relative w-full py-24 border-t border-slate-800/30 z-10 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">

          <div className="flex flex-col items-center justify-center mb-16 gap-6 text-center">
            <span className="text-xs font-medium uppercase text-cyan-400 flex flex-wrap justify-center" style={{ gap: '0.35rem' }}>
              {"Últimos cómics agregados".split(' ').map((word, wIdx) => (
                <span key={wIdx} className="inline-flex overflow-hidden">
                  {word.split('').map((char, cIdx) => (
                    <span key={cIdx} className="novedades-char inline-block">{char}</span>
                  ))}
                </span>
              ))}
            </span>
            <h2 className="novedades-heading text-3xl sm:text-5xl font-black leading-tight tracking-tight text-white">
              Descubre las últimas <br />novedades en nuestro <span className="text-cyan-400">catálogo de cómics</span>
            </h2>
          </div>

          {/* 3D Accordion Container */}
          <div className="flex items-center justify-center w-full px-4">
            <div className="flex w-3/4 max-w-5xl h-150 gap-3" style={{ perspective: '1200px' }}>
              {!isLoading && accordionWorks.length > 0 ? (
                accordionWorks.map((work) => (
                  <div
                    key={work.id}
                    className="accordion-item group relative flex-1 min-w-0 h-full rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:flex-2"
                  >
                    {/* Background Image - Visible base layer */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('${work.coverUrl || FALLBACK_IMAGE}')`,
                        filter: 'brightness(0.8)'
                      }}
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Content - Only visible on hover or expanded */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-lg font-bold mb-1 line-clamp-2">{work.title}</h3>
                      <p className="text-sm text-cyan-300 font-medium">{work.author.name}</p>
                    </div>

                    {/* Border with glow effect */}
                    <div className="absolute inset-0 border border-cyan-400/20 group-hover:border-cyan-400/60 rounded-lg transition-colors duration-300" />
                  </div>
                ))
              ) : isLoading ? (
                // Skeleton loading placeholders
                <div className="flex w-full max-w-5xl h-150 gap-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex-1 min-w-0 h-full rounded-lg bg-slate-800/50 animate-pulse"
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
