import { ReactNode } from "react";

export function Paper({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`paper ${className}`}>{children}</section>;
}
