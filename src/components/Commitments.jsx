import { Map as MapIcon, UserRound, Handshake } from "lucide-react";

const items = [
  { icon: MapIcon, title: "Oportunidades locais", text: "Paulista e seus bairros" },
  { icon: UserRound, title: "Seu perfil, sua história", text: "Mais que um currículo" },
  { icon: Handshake, title: "Conexões que aproximam", text: "Pessoas e negócios da cidade" },
];

export default function Commitments() {
  return (
    <ul className="flex flex-col gap-6 py-3.5 md:flex-row md:justify-between">
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex items-center gap-3.5">
          <Icon size={26} className="text-primary" aria-hidden="true" />
          <div className="flex flex-col gap-[5px]">
            <p className="text-sm font-semibold text-body">{title}</p>
            <p className="text-xs text-muted">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
