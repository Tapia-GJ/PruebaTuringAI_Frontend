import { Link } from 'react-router-dom';

interface ComicCardProps {
  id: number | string;
  title: string;
  author: string;
  coverUrl: string;
  genres: string[];
}

export const ComicCard = ({ id, title, author, coverUrl, genres }: ComicCardProps) => {
  return (
    <div className="group flex flex-col gap-3">
      <Link to={`/works/${id}`} className="relative overflow-hidden rounded-sm aspect-2/3 bg-slate-800">

        {/* Placeholder Imagen Cover (usamos degradado mientras tanto) */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${coverUrl})` }}
        />

        {/* Overlay hover */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Metadatos */}
      <div>
        <h3 className="font-bold text-white text-lg leading-tight group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm mt-1">Escrito por {author}</p>

        {/* Tags de géneros */}
        <div className="flex flex-wrap gap-2 mt-3">
          {genres.map(genre => (
            <span key={genre} className="text-xs border border-slate-700 text-slate-300 px-2 py-1 rounded-sm bg-slate-900/50">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
