import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.svg';

function Navbar() {
  return (
    <nav className='bg-white flex gap-2 justify-between items-center px-10 '>
      <Link to="/">
        <img src={logo} className='w-40' />
      </Link>

      <div className='flex gap-10'>
          <Link to="/#">
            Encontrar vagas
          </Link>

          <Link to="/#">
            Como funciona
          </Link>

          <Link to="/#">
            Para empresas
          </Link>
      </div>

      <div className='flex gap-10 items-center'>
          <Link to="/login">
            Entrar
          </Link>

          <Link to="/cadastro">
            <button className='bg-green-800 px-3 py-2 rounded-md text-white'>Criar minha conta</button>
          </Link>

          <Link to="/logoff">
            Sair
          </Link>
      </div>

    </nav>
  );
}

export default Navbar;