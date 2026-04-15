import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { AdminLayout } from '../layouts/AdminLayout';

import { LandingPage } from '../pages/public/LandingPage';
import { WorkDetail } from '../pages/public/WorkDetail';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { Catalog } from '../pages/reader/Catalog';
import { Favorites } from '../pages/reader/Favorites';

import { Dashboard } from '../pages/admin/Dashboard';
import { WorksList } from '../pages/admin/works/WorksList';
import { AuthorsList } from '../pages/admin/authors/AuthorsList';
import { GenresList } from '../pages/admin/genres/GenresList';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas Públicas - Main Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/works/:id" element={<WorkDetail />} />
        
        {/* Rutas Protegidas de Lector (Ej. Favoritos) */}
        <Route path="/favorites" element={
          <PrivateRoute role="USER">
            <Favorites />
          </PrivateRoute>
        } />
      </Route>

      {/* Rutas de Autenticación - Auth Layout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Rutas de Administrador - Admin Layout */}
      <Route path="/admin" element={
        <PrivateRoute role="ADMIN">
          <AdminLayout />
        </PrivateRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="works" element={<WorksList />} />
        <Route path="authors" element={<AuthorsList />} />
        <Route path="genres" element={<GenresList />} />
      </Route>
      
      {/* 404 Catch-all */}
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};
