import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { PROFILE } from '../data/profile';

export function ContactSection() {
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
    <section id="contato" className="py-14">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <h2 className="text-xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
          Contato
        </h2>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
          Se quiser conversar sobre uma vaga de estágio, dev júnior ou ver o código de algum repositório privado:
        </p>

        <div className="mt-6 divide-y divide-stone-200 rounded-lg border border-stone-200 bg-white dark:divide-stone-800 dark:border-stone-800 dark:bg-[#181816]">
          <div className="flex flex-col justify-between gap-2 px-5 py-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-medium text-stone-500 dark:text-stone-400">WhatsApp</p>
              <p className="mt-0.5 text-sm font-medium text-stone-900 dark:text-stone-100">
                {PROFILE.links.whatsappDisplay}
              </p>
            </div>
            <a
              href={PROFILE.links.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline dark:text-blue-400"
            >
              Enviar mensagem
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="flex flex-col justify-between gap-2 px-5 py-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-medium text-stone-500 dark:text-stone-400">E-mail</p>
              <p className="mt-0.5 text-sm font-medium text-stone-900 dark:text-stone-100">
                {PROFILE.links.email}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-stone-100"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copiado' : 'Copiar'}
              </button>
              <a
                href={`mailto:${PROFILE.links.email}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline dark:text-blue-400"
              >
                Abrir e-mail
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-2 px-5 py-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-medium text-stone-500 dark:text-stone-400">LinkedIn</p>
              <p className="mt-0.5 text-sm font-medium text-stone-900 dark:text-stone-100">
                Maycon dos Santos Tavares
              </p>
            </div>
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline dark:text-blue-400"
            >
              Ver perfil
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="flex flex-col justify-between gap-2 px-5 py-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-medium text-stone-500 dark:text-stone-400">GitHub</p>
              <p className="mt-0.5 font-mono text-sm font-medium text-stone-900 dark:text-stone-100">
                @{PROFILE.githubUsername}
              </p>
            </div>
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline dark:text-blue-400"
            >
              Ver repositórios
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
