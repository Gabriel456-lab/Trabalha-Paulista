import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
      {/* O Navbar fica fora das Routes para aparecer em todas as páginas, PRESTEM ATENÇÃO!!!*/}
      <Navbar />

      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/esqueci-senha" element={<Esqueci />} />
          <Route path="/logoff" element={<Logoff />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;