import React from 'react';
import SecaoPrin from '../components/SecaoPrin';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  return (
    <>
      {location.state?.accountDeleted && (
        <p role="status" className="fixed left-4 right-4 top-20 z-[90] mx-auto max-w-xl rounded-lg bg-green-50 px-4 py-3 text-center text-sm text-green-800 shadow-sm">
          Sua conta foi excluída deste navegador.
        </p>
      )}
      <SecaoPrin />
    </>
  );
}

export default Home;
