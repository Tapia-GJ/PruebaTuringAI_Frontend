import { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
    Heart,
    Play,
    ChevronRight,
    Info
} from 'lucide-react';

const WORK_DATA = {
    id: 1,
    title: 'Cyber City Chronicles',
    author: 'Aris Thorne',
    artist: 'Elena Vance',
    status: 'En Emisión',
    rating: 4.8,
    views: '125K',
    genres: ['Sci-Fi', 'Noir', 'Cyberpunk'],
    coverUrl: 'https://marmota.me/wp-content/uploads/2024/12/Justice-League-Unlimited-001digital-Marika-Empire-000-scaled.jpg',
    synopsis: 'En el año 2145, la ciudad de Neo-Edén es un faro de progreso tecnológico, pero bajo sus luces de neón se esconden oscuros secretos. Sigue a la detective Kaelen mientras desentraña una conspiración que amenaza con destruir la frágil paz entre humanos e inteligencias artificiales.',
    chapters: [
        { id: 101, number: 1, title: 'Sombras de Neón', date: 'Hace 2 meses', isRead: true },
        { id: 102, number: 2, title: 'Ecos del Pasado', date: 'Hace 1 mes', isRead: true },
        { id: 103, number: 3, title: 'Código Roto', date: 'Hace 3 semanas', isRead: false },
        { id: 104, number: 4, title: 'Fuego Artificial', date: 'Hace 1 semana', isRead: false },
        { id: 105, number: 5, title: 'El Despertar', date: 'Hace 2 días', isRead: false, isNew: true },
    ]
};

gsap.registerPlugin(useGSAP);

export const WorkDetail = () => {
    const { id } = useParams<{ id: string }>();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.hero-bg', { opacity: 0, duration: 1.5 });

        tl.from('.work-poster', {
            y: 40,
            opacity: 0,
            rotationY: 15,
            transformPerspective: 1000,
            duration: 1
        }, '-=1');

        tl.from('.work-meta-item', {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8
        }, '-=0.6');

        tl.from('.work-details', {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, '-=0.4');

        tl.from('.work-cta', {
            scale: 0.95,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5
        }, '-=0.4');

        tl.from('.chapter-item', {
            x: -20,
            opacity: 0,
            stagger: 0.05,
            duration: 0.6
        }, '-=0.2');

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen pb-20 relative flex flex-col w-full">

            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                <div className="absolute left-1/2 top-[-10%] h-250 w-250 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,rgba(34,211,238,0.12),transparent)]"></div>
            </div>

            <div className="absolute top-0 left-0 w-full h-[60vh] overflow-hidden pointer-events-none z-[1]">
                <div
                    className="hero-bg absolute inset-0 bg-cover bg-center blur-2xl opacity-30 scale-110"
                    style={{ backgroundImage: `url(${WORK_DATA.coverUrl})` }}
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/80 to-black" />

                <div className="absolute left-1/2 top-1/4 -translate-x-1/2 w-200 h-100 bg-cyan-500/10 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-32 lg:pt-40">

                <nav className="work-meta-item flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-slate-500 mb-8">
                    <Link to="/" className="hover:text-cyan-400 transition-colors">Inicio</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link to="/catalog" className="hover:text-cyan-400 transition-colors">Catálogo</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-cyan-400 truncate">{WORK_DATA.title}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                    <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
                        <div className="work-poster relative aspect-2/3 rounded-xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] ring-1 ring-white/10 group">
                            <img
                                src={WORK_DATA.coverUrl}
                                alt={WORK_DATA.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="flex flex-col gap-3">
                            <button className="work-cta w-full bg-cyan-400 hover:bg-cyan-300 text-[#060b13] font-black text-sm uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                                <Play className="w-5 h-5 fill-current" />
                                Leer Primer Capítulo
                            </button>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className={`work-cta flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 font-semibold text-sm transition-all ${isFavorite
                                        ? 'border-red-500/50 bg-red-500/10 text-red-400'
                                        : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-white'
                                        }`}
                                >
                                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                                    {isFavorite ? 'Guardado' : 'Favorito'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col min-w-0 w-full">

                        <div className="mb-10">

                            <div className="flex flex-wrap gap-2">
                                {WORK_DATA.genres.map(genre => (
                                    <span
                                        key={genre}
                                        className="px-3 py-1.5 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors border border-cyan-400/50 rounded-lg bg-cyan-400/10 text-cyan-400 text-[10px] sm:text-xs font-bold "
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>
                            <h1 className="work-meta-item text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-4">
                                {WORK_DATA.title}
                            </h1>

                            <div className="work-meta-item flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-300 text-sm sm:text-base">
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-500 font-medium">Guión:</span>
                                    <span className="font-bold text-white hover:text-cyan-400 cursor-pointer transition-colors">{WORK_DATA.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-500 font-medium">Arte:</span>
                                    <span className="font-bold text-white hover:text-cyan-400 cursor-pointer transition-colors">{WORK_DATA.artist}</span>
                                </div>
                            </div>
                        </div>

                        <div className="work-details bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 lg:p-8 mb-12 backdrop-blur-sm shadow-xl">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                                <Info className="w-5 h-5 text-cyan-400" />
                                Sinopsis
                            </h3>
                            <p className="text-slate-300 leading-relaxed text-base mb-8">
                                {WORK_DATA.synopsis}
                            </p>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
