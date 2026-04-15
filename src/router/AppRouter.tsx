import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { AdminLayout } from '../layouts/AdminLayout';

import { LandingPage } from '../pages/public/LandingPage';
import { WorkDetail } from '../pages/reader/WorkDetail';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { Catalog } from '../pages/reader/Catalog';
import { Favorites } from '../pages/reader/Favorites';

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

        {/* Rutas Protegidas de Lector (USER o ADMIN) */}
        <Route path="/catalog" element={
          <PrivateRoute role="USER">
            <Catalog />
          </PrivateRoute>
        } />
        <Route path="/works/:id" element={
          <PrivateRoute role="USER">
            <WorkDetail />
          </PrivateRoute>
        } />
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
        <Route index element={<Navigate to="works" replace />} />
        <Route path="works" element={<WorksList />} />
        <Route path="authors" element={<AuthorsList />} />
        <Route path="genres" element={<GenresList />} />
      </Route>

      {/* 404 Catch-all */}
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};
