import { Link } from 'react-router-dom';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const Login = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center mb-2">
        <Link to="/">
          <h2 className="text-2xl font-bold text-white mb-2">Iniciar Sesión</h2>
        </Link>
        <p className="text-slate-400 text-sm">Ingresa a tu cuenta para continuar explorando la biblioteca.</p>
      </div>

      <form className="flex flex-col gap-5">
        <Input
          label="Correo Electrónico"
          type="email"
          placeholder="tu@correo.com"
          required
        />

        <div className="flex flex-col gap-1">
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            required
          />
          <div className="flex justify-end">
            <Link to="#" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>

        <Button variant="primary" className="w-full mt-2 py-3.5">
          iniciar sesión
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-slate-400">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors underline-offset-2 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};
