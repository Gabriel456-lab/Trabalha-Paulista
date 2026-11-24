import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Importando componentes
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Esqueci from './pages/Esqueci';
import Logoff from './pages/Logoff';

function App() {
  return (
    <BrowserRouter>
      <AppConteudo />
    </BrowserRouter>
  );
}

function AppConteudo() {
  const location = useLocation();
  const paginaLogin = location.pathname === '/login';

  return (
    <>
      {!paginaLogin && <Navbar />}

      <div className={paginaLogin ? '' : 'p-5'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/esqueci-senha" element={<Esqueci />} />
          <Route path="/logoff" element={<Logoff />} />
        </Routes>
      </div>
    </>
  );
}

export default App;