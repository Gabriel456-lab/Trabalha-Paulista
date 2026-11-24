import { MapPin, ArrowUpRight, CircleCheck, Sprout } from "lucide-react";
import Button from "./Button";
import profissional from "../img/Profissional-no-comercio-local.png";

export default function Hero() {
  return (
    <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
      <div className="flex w-full flex-col items-start gap-6 lg:w-[624px]">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
          <MapPin size={16} aria-hidden="true" />
          <span>GENTE DE PAULISTA. TALENTO DAQUI.</span>
        </div>

        <h1 className="text-5xl font-semibold leading-[1.07] text-ink lg:text-[62px]">
          Seu talento tem <br className="hidden lg:block" />
          lugar por aqui.
        </h1>

        <p className="max-w-[540px] text-lg leading-[1.6] text-muted">
          Conectamos quem quer trabalhar a quem precisa contratar. Encontre o seu
          próximo emprego em Paulista e dê um novo passo na sua história.
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <Button icon={ArrowUpRight}>Encontrar oportunidades</Button>
          <a href="#" className="text-sm font-semibold text-accent">
            Quero contratar →
          </a>
        </div>

        <div className="flex items-center gap-2 text-[13px] text-muted">
          <CircleCheck size={16} className="text-primary" aria-hidden="true" />
          <span>Gratuito para você. Perto da sua realidade.</span>
        </div>
      </div>

      <figure className="relative h-[494px] w-full overflow-hidden rounded-bl-[20px] rounded-br-[80px] rounded-tl-[80px] rounded-tr-[20px] lg:w-[592px]">
        <img
          src={profissional}
          alt="Profissional sorrindo em um comércio local"
          className="absolute inset-0 size-full object-cover"
        />
        <figcaption className="absolute bottom-6 left-6 flex w-[350px] max-w-[calc(100%-48px)] items-center gap-3.5 rounded-2xl bg-white p-[18px] shadow-card">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-mint">
            <Sprout size={23} className="text-primary" aria-hidden="true" />
          </span>
          <span className="flex flex-col gap-[5px]">
            <span className="text-sm font-semibold text-ink">O futuro também é daqui.</span>
            <span className="text-xs text-muted">Novas conexões, novos caminhos.</span>
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
