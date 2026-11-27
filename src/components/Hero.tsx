import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { PROFILE } from '../data/profile';

interface HeroProps {
  totalProjects: number;
  liveCount: number;
  publicCount: number;
}

export function Hero({ totalProjects, liveCount, publicCount }: HeroProps) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PROFILE.links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.links.email}`;
    }
  }

  return (
    <section className="border-b border-stone-200 py-14 sm:py-20 dark:border-stone-800">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-5">
          <img
            src="/avatar.jpg"
            alt={PROFILE.name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full border border-stone-200 object-cover dark:border-stone-800"
          />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl dark:text-stone-50">
              {PROFILE.name}
            </h1>
            <p className="mt-1 text-sm font-medium text-stone-600 dark:text-stone-400">
              {PROFILE.subtitle}
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-700 dark:text-stone-300">
          {PROFILE.intro}
        </p>

        <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
          {PROFILE.availability} · {totalProjects} projetos listados ({liveCount} com link funcionando no ar, {publicCount} com código aberto no GitHub).
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href="#projetos"
            className="inline-flex items-center rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-200"
          >
            Ver todos os {totalProjects} projetos
          </a>
          <a
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-stone-300 bg-white px-3.5 py-2 text-sm font-medium text-stone-800 transition-colors hover:border-stone-400 hover:bg-stone-50 dark:border-stone-700 dark:bg-[#191918] dark:text-stone-200 dark:hover:border-stone-600"
          >
            LinkedIn
            <ArrowUpRight className="h-3.5 w-3.5 text-stone-400" />
          </a>
          <a
            href={PROFILE.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-stone-300 bg-white px-3.5 py-2 text-sm font-medium text-stone-800 transition-colors hover:border-stone-400 hover:bg-stone-50 dark:border-stone-700 dark:bg-[#191918] dark:text-stone-200 dark:hover:border-stone-600"
          >
            GitHub
            <ArrowUpRight className="h-3.5 w-3.5 text-stone-400" />
          </a>
          <a
            href={PROFILE.links.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-stone-300 bg-white px-3.5 py-2 text-sm font-medium text-stone-800 transition-colors hover:border-stone-400 hover:bg-stone-50 dark:border-stone-700 dark:bg-[#191918] dark:text-stone-200 dark:hover:border-stone-600"
          >
            WhatsApp
            <ArrowUpRight className="h-3.5 w-3.5 text-stone-400" />
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-1.5 rounded-md border border-stone-300 bg-white px-3.5 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-50 dark:border-stone-700 dark:bg-[#191918] dark:text-stone-300 dark:hover:border-stone-600"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-stone-400" />}
            {copied ? 'E-mail copiado' : PROFILE.links.email}
          </button>
        </div>
      </div>
    </section>
  );
}
