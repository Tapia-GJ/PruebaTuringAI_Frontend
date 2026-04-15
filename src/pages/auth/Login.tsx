import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';

export const Login = () => {
  const { login, isLoading, error: authError, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; submit?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login(email, password);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setErrors({});
  }, []);
  if (user) {
    return <Navigate to={user.roleId === 2 ? '/admin' : '/catalog'} replace />;
  }

  const submitError = errors.submit || authError;
  const isButtonDisabled = isSubmitting || isLoading;

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center mb-2">
        <Link to="/">
          <h2 className="text-2xl font-bold text-white mb-2">Iniciar Sesión</h2>
        </Link>
        <p className="text-slate-400 text-sm">Ingresa a tu cuenta para continuar explorando la biblioteca.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {submitError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
            <p className="text-sm text-red-400">{submitError}</p>
          </div>
        )}

        <Input
          label="Correo Electrónico"
          type="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          disabled={isSubmitting || isLoading}
        />

        <div className="flex flex-col gap-1">
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            disabled={isSubmitting || isLoading}
          />
          <div className="flex justify-end">
            <Link to="#" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>

        <Button
          variant="primary"
          className="w-full mt-2 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isButtonDisabled}
        >
          {isSubmitting || isLoading ? 'Iniciando sesión...' : 'iniciar sesión'}
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
