//Componente de butão reutilizável com suporte para ícones e estilos personalizados.
export default function Button({ children, icon: Icon, className = "", type = "button", ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex h-[50px] items-center justify-center gap-3 rounded-lg bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon size={18} aria-hidden="true" />}
    </button>
  );
}