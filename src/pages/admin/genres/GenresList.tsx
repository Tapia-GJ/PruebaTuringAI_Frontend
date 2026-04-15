export const GenresList = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Gestión de Géneros</h1>
        <p className="text-slate-400">Administra los géneros disponibles</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8">
        <div className="bg-slate-950 border border-slate-800/50 rounded-lg p-8 text-center">
          <p className="text-slate-500 text-lg">
            Aquí irá la tabla de géneros con opciones para crear, editar y eliminar.
          </p>
        </div>
      </div>
    </div>
  );
};
