import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Esqueci from './pages/Esqueci';
import Logoff from './pages/Logoff';
import AreaUsuario from './pages/AreaUsuario';

function ScrollToAnchor() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return undefined;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

function AppRoutes() {
  const { storageError } = useAuth();

  return (
    <>
      <ScrollToAnchor />
      <Navbar />
      {storageError && (
        <p role="alert" className="fixed left-0 right-0 top-16 z-[90] bg-red-50 px-4 py-3 text-center text-sm text-red-800">
          {storageError}
        </p>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/esqueci-senha" element={<Esqueci />} />
        <Route path="/logoff" element={<Logoff />} />
        <Route
          path="/vagas"
          element={(
            <ProtectedRoute role="candidato">
              <AreaUsuario />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/empresa"
          element={(
            <ProtectedRoute role="empresa">
              <AreaUsuario />
            </ProtectedRoute>
          )}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
