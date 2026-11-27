import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, ChevronDown } from "lucide-react";
import Button from "./Button";
import { useAuth } from "../auth/AuthContext";

export default function SearchBar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [consulta, setConsulta] = useState('');
  const [bairro, setBairro] = useState('');

  const buscar = (evento) => {
    evento.preventDefault();
    const query = new URLSearchParams();
    if (consulta.trim()) query.set('q', consulta.trim());
    if (bairro) query.set('bairro', bairro);
    const busca = query.toString();
    const destino = `/vagas${busca ? `?${busca}` : ''}`;

    if (user?.tipoCadastro === 'empresa') {
      navigate('/empresa');
    } else if (user) {
      navigate(destino);
    } else {
      navigate('/login', { state: { from: { pathname: '/vagas', search: busca ? `?${busca}` : '' } } });
    }
  };

  return (
    <form
      role="search"
      onSubmit={buscar}
      className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-3 shadow-card md:flex-row md:items-center"
    >
      <label className="flex items-center gap-3.5 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-primary/30 md:w-[500px]">
        <Search size={20} className="shrink-0 text-muted" aria-hidden="true" />
        <span className="flex flex-1 flex-col gap-[5px]">
          <span className="text-xs font-semibold text-body">O que você procura?</span>
          <input
            type="text"
            name="q"
            placeholder="Cargo, empresa ou palavra-chave"
            value={consulta}
            onChange={(evento) => setConsulta(evento.target.value)}
            className="w-full bg-transparent text-sm text-body placeholder:text-muted focus:outline-none"
          />
        </span>
      </label>

      <div className="hidden h-10 w-px bg-line md:block" aria-hidden="true" />

      <label className="flex flex-1 items-center gap-3.5 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-primary/30">
        <MapPin size={20} className="shrink-0 text-muted" aria-hidden="true" />
        <span className="flex flex-1 flex-col gap-[5px]">
          <span className="text-xs font-semibold text-body">Onde?</span>
          <select
            name="bairro"
            value={bairro}
            onChange={(evento) => setBairro(evento.target.value)}
            className="w-full appearance-none bg-transparent text-sm text-muted focus:outline-none"
          >
            <option value="">Todos os bairros de Paulista</option>
            <option value="Centro">Centro</option>
            <option value="Janga">Janga</option>
            <option value="Paratibe">Paratibe</option>
            <option value="Maranguape I">Maranguape I</option>
            <option value="Jardim Paulista">Jardim Paulista</option>
          </select>
        </span>
        <ChevronDown size={16} className="shrink-0 text-primary" aria-hidden="true" />
      </label>

      <Button type="submit">Buscar vagas</Button>
    </form>
  );
}