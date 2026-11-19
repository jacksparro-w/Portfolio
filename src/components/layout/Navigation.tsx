"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Feather } from "lucide-react";
import { navigation } from "@/data/portfolio";

export function Navigation() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Brajin S J home">
        <Feather size={27} strokeWidth={1.25} />
        <span>Brajin S J</span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        {navigation.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={active ? "nav-link active" : "nav-link"} aria-current={active ? "page" : undefined}>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
