import { Link } from 'react-router-dom';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const Register = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center mb-2">
        <Link to="/">
          <h2 className="text-2xl font-bold text-white mb-2">Crear Cuenta</h2>
        </Link>
        <p className="text-slate-400 text-sm">Únete a la primera biblioteca de cómics impulsada por IA.</p>
      </div>

      <form className="flex flex-col gap-5">
        <Input
          label="Nombre Completo"
          type="text"
          placeholder="Juan Pérez"
          required
        />

        <Input
          label="Correo Electrónico"
          type="email"
          placeholder="tu@correo.com"
          required
        />

        <div className="flex flex-col gap-5 sm:flex-row">
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            required
            className="flex-1"
          />
          <Input
            label="Confirmar"
            type="password"
            placeholder="••••••••"
            required
            className="flex-1"
          />
        </div>

        <Button variant="primary" className="w-full mt-3 py-3.5">
          Crear Cuenta
        </Button>
      </form>

      <div className="mt-4 text-center border-t border-slate-800/50 pt-6">
        <p className="text-sm text-slate-400">
          ¿Ya eres parte de la biblioteca?{' '}
          <Link to="/login" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors underline-offset-2 hover:underline">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
};
