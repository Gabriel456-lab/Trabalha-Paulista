import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextAlignJustify, X } from 'lucide-react';
import logo from '../img/logo.svg';
import { useAuth } from '../auth/AuthContext';

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { user } = useAuth();
  const fecharMenu = () => setMenuAberto(false);
  const linkClass = 'transition-colors hover:text-green-800';

  const links = (
    <>
      <Link to="/#vagas" onClick={fecharMenu} className={linkClass}>Encontrar vagas</Link>
      <Link to="/#como-funciona" onClick={fecharMenu} className={linkClass}>Como funciona</Link>
      <Link to="/#para-empresas" onClick={fecharMenu} className={linkClass}>Para empresas</Link>
    </>
  );

  return (
    <nav className="fixed top-0 z-[100] flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white px-5 shadow-sm md:px-10">
      <Link to="/" onClick={fecharMenu} aria-label="Trabalha Paulista - início">
        <img src={logo} className="w-36 md:w-40" alt="Trabalha Paulista" />
      </Link>

      <div className="hidden items-center gap-8 text-sm text-gray-700 lg:flex">{links}</div>

      <div className="hidden items-center gap-3 lg:flex">
        {user ? (
          <>
            <span className="max-w-40 truncate text-sm text-gray-600">{user.nome}</span>
            <Link to="/logoff" className="rounded-md border-2 border-red-600 bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-800">
              Sair
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="rounded-md border-2 border-green-800 px-4 py-2 text-sm transition-colors hover:bg-gray-100">
              Entrar
            </Link>
            <Link to="/cadastro" className="rounded-md bg-green-800 px-4 py-2 text-sm text-white transition-colors hover:bg-green-900">
              Criar minha conta
            </Link>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={() => setMenuAberto(!menuAberto)}
        className="flex rounded-md border-2 border-green-800 p-1 shadow-sm lg:hidden"
        aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={menuAberto}
      >
        {menuAberto ? <X /> : <TextAlignJustify />}
      </button>

      {menuAberto && (
        <div className="absolute left-0 top-full flex w-full flex-col gap-4 border-t bg-white px-6 py-6 shadow-lg lg:hidden">
          {links}
          <hr className="border-gray-200" />
          {user ? (
            <>
              <span className="text-sm text-gray-600">{user.nome}</span>
              <Link to="/logoff" onClick={fecharMenu} className="rounded-md bg-red-600 px-4 py-2 text-center text-white">
                Sair
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={fecharMenu} className="rounded-md border-2 border-green-800 px-4 py-2 text-center">
                Entrar
              </Link>
              <Link to="/cadastro" onClick={fecharMenu} className="rounded-md bg-green-800 px-4 py-2 text-center text-white">
                Criar minha conta
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
