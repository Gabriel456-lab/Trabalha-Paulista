import { Search, MapPin, ChevronDown } from "lucide-react";
import Button from "./Button";

export default function SearchBar() {
  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
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
            className="w-full appearance-none bg-transparent text-sm text-muted focus:outline-none"
          >
            <option value="">Todos os bairros de Paulista</option>
            {/* TODO: listar os bairros */}
          </select>
        </span>
        <ChevronDown size={16} className="shrink-0 text-primary" aria-hidden="true" />
      </label>

      <Button type="submit">Buscar vagas</Button>
    </form>
  );
}