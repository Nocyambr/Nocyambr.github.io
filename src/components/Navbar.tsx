import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { PROFILE } from '../data/profile';

interface NavbarProps {
  dark: boolean;
  onToggleTheme: () => void;
  totalProjects: number;
}

export function Navbar({ dark, onToggleTheme, totalProjects }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: '#destaques', label: 'Destaques' },
    { href: '#projetos', label: `Projetos (${totalProjects})` },
    { href: '#tecnologias', label: 'Tecnologias' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#contato', label: 'Contato' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/90 backdrop-blur-sm dark:border-stone-800 dark:bg-[#111110]/90">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-8">
        <a
          href="#"
          className="text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-100"
        >
          {PROFILE.shortName}
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-stone-600 transition-colors hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={dark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-stone-200 text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:border-stone-800 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
            aria-expanded={open}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-stone-200 text-stone-600 md:hidden dark:border-stone-800 dark:text-stone-400"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-stone-200 bg-stone-50 px-5 py-3 md:hidden dark:border-stone-800 dark:bg-[#111110]">
          <nav className="flex flex-col gap-2" aria-label="Menu mobile">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-1.5 text-sm text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-stone-100"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
