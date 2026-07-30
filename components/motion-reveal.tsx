import { ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <div className={`gsap-reveal ${className}`} data-delay={delay}>
      {children}
    </div>
  );
}
