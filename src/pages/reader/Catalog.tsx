import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { ComicCard } from '../../components/ui/ComicCard';
import { getWorks } from '../../api/works.api';
import type { Work } from '../../types/work.types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const Catalog = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const data = await getWorks();
        setWorks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar el catálogo');
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorks();
  }, []);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  // Extraer géneros dinámicos basados en la BD
  const availableGenres = Array.from(new Set(works.flatMap(w => w.workGenres.map(wg => wg.genre.name))));
  
  const FILTER_CATEGORIES = [
    {
      name: 'Géneros',
      options: availableGenres.length > 0 ? availableGenres : ['Sci-Fi', 'Cyberpunk', 'Fantasía', 'Acción'] // fallback
    }
  ];

  const filteredComics = works.filter(work => {
    const matchesSearch = work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.author.name.toLowerCase().includes(searchQuery.toLowerCase());

    const workGenreNames = work.workGenres.map(wg => wg.genre.name);
    const matchesFilters = activeFilters.length === 0 ||
      activeFilters.some(filter => workGenreNames.includes(filter));

    return matchesSearch && matchesFilters;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 relative flex flex-col w-full items-center justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="absolute left-1/2 top-[-10%] h-250 w-250 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,rgba(34,211,238,0.12),transparent)]"></div>
        </div>
        <div className="relative z-10">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-12 relative flex flex-col w-full items-center justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="absolute left-1/2 top-[-10%] h-250 w-250 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,rgba(34,211,238,0.12),transparent)]"></div>
        </div>
        <div className="relative z-10 text-center">
          <p className="text-red-500 font-bold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 relative flex flex-col w-full">

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute left-1/2 top-[-10%] h-250 w-250 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,rgba(34,211,238,0.12),transparent)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">

        {/* Header Section */}
        <div className="flex flex-col gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tight mb-2">Catálogo</h1>
            <p className="text-slate-400">Explora todas las obras disponibles en nuestra colección.</p>
          </div>

          {/* Search and Filter Toggle Bar */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por título, autor o género..."
                className="block w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
              />
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl border transition-all font-semibold ${isFilterOpen || activeFilters.length > 0
                ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'
                : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filtros</span>
              {activeFilters.length > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-md bg-cyan-400 text-[#060b13] text-[10px] font-black ml-1">
                  {activeFilters.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Filter Section */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isFilterOpen ? 'max-h-200 opacity-100 mb-10' : 'max-h-0 opacity-0 mb-0'
            }`}
        >
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
                Filtros Avanzados
              </h3>
              {activeFilters.length > 0 && (
                <button
                  onClick={() => setActiveFilters([])}
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1 font-medium"
                >
                  <X className="w-4 h-4" /> Limpiar filtros
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {FILTER_CATEGORIES.map(category => (
                <div key={category.name}>
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    {category.name}
                    <div className="h-px flex-1 bg-slate-800/50"></div>
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {category.options.map(option => {
                      const isSelected = activeFilters.includes(option);
                      return (
                        <button
                          key={option}
                          onClick={() => toggleFilter(option)}
                          className={`border rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1.5 transition-all duration-200 ${isSelected
                            ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                            : 'border-slate-700/50 bg-slate-800/30 text-slate-400 hover:border-cyan-400/50 hover:text-cyan-300 hover:bg-slate-800'
                            }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comic Grid */}
        {filteredComics.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredComics.map(comic => (
              <ComicCard
                key={comic.id}
                id={comic.id}
                title={comic.title}
                author={comic.author.name}
                coverUrl={comic.coverUrl || ''}
                genres={comic.workGenres.map(wg => wg.genre.name)}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center flex flex-col items-center justify-center border border-slate-800/50 rounded-2xl bg-slate-900/20">
            <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No se encontraron resultados</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              Intenta buscar con otros términos o elimina algunos filtros para ver más resultados.
            </p>
            {activeFilters.length > 0 && (
              <button
                onClick={() => setActiveFilters([])}
                className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium text-sm"
              >
                Limpiar todos los filtros
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
