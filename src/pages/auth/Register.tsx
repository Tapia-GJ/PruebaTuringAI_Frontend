import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';

export const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading, error: authError } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    submit?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
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
      await register(email, name, password);
      navigate('/login');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrarse';
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setErrors({});
  }, []);

  const submitError = errors.submit || authError;
  const isButtonDisabled = isSubmitting || isLoading;

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center mb-2">
        <Link to="/">
          <h2 className="text-2xl font-bold text-white mb-2">Crear Cuenta</h2>
        </Link>
        <p className="text-slate-400 text-sm">Únete a la primera biblioteca de cómics impulsada por IA.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {submitError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
            <p className="text-sm text-red-400">{submitError}</p>
          </div>
        )}

        <Input
          label="Nombre Completo"
          type="text"
          placeholder="Juan Pérez"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          disabled={isSubmitting || isLoading}
        />

        <Input
          label="Correo Electrónico"
          type="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          disabled={isSubmitting || isLoading}
        />

        <div className="flex flex-col gap-5 sm:flex-row">
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            disabled={isSubmitting || isLoading}
            className="flex-1"
          />
          <Input
            label="Confirmar"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            disabled={isSubmitting || isLoading}
            className="flex-1"
          />
        </div>

        <Button
          variant="primary"
          className="w-full mt-3 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isButtonDisabled}
        >
          {isSubmitting || isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
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
