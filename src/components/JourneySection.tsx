import { PROFILE } from '../data/profile';
import { Project } from '../data/projects';

interface JourneySectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

interface TimelineStage {
  period: string;
  title: string;
  summary: string;
  items: Array<{ projectId: string; date: string }>;
}

const TIMELINE_STAGES: TimelineStage[] = [
  {
    period: 'Abr 2026',
    title: 'Base de Front-End com React (SENAI)',
    summary:
      'Primeiras aplicações web em React 19 e Vite: separação em componentes, busca instantânea, carrossel, fluxo de checkout, favoritos no localStorage e modais.',
    items: [
      { projectId: 'maycon-primos', date: '02/04' },
      { projectId: 'vortex', date: '16/04' },
    ],
  },
  {
    period: 'Ago–Set 2026',
    title: 'Mobile (SENAI), TypeScript e Bancos na Nuvem',
    summary:
      'Entrada no desenvolvimento mobile com React Native + Expo (evoluindo em 16 dias de um app de 3 telas para o Swim Tracker com autenticação e 4 abas), adoção de TypeScript e primeiros sistemas com PostgreSQL/Supabase e migrations SQL.',
    items: [
      { projectId: 'mope', date: '04/08' },
      { projectId: 'android', date: '18/08' },
      { projectId: 'palavras', date: '27/08' },
      { projectId: 'android-setembro-2026', date: '03/09' },
      { projectId: 'bombparty', date: '29/09' },
    ],
  },
  {
    period: 'Out 2026',
    title: 'Full-Stack, Back-End Dual e Arquitetura SSO',
    summary:
      'Entrega do principal sistema Full-Stack do SENAI (SESI Aventura Educativa com React, Cloudflare Workers e Laravel 12/PHP), criação de um sistema próprio de Login Único (SSO) em Cloudflare D1, Neon PostgreSQL, PWA e testes automatizados (Vitest e Playwright).',
    items: [
      { projectId: 'clicker-simulator', date: '09/10' },
      { projectId: 'projeto-viagem-sae', date: '15/10' },
      { projectId: 'web-brawl', date: '20/10' },
      { projectId: 'game-hub', date: '25/10' },
      { projectId: 'manicure', date: '27/10' },
    ],
  },
  {
    period: 'Nov 2026',
    title: 'Tempo Real, WebAssembly, 3D e Next.js',
    summary:
      'Sincronização em tempo real com WebSockets e Durable Objects, física 2D autoritativa no servidor (Planck.js), execução de Stockfish em WebAssembly com PostgreSQL Serverless e gráficos 3D procedurais com Next.js e Three.js.',
    items: [
      { projectId: 'acerte-a-idade', date: '03/11' },
      { projectId: 'braains', date: '05/11' },
      { projectId: 'chess', date: '19/11' },
      { projectId: 'surviv-io', date: '19/11' },
      { projectId: 'truco', date: '26/11' },
    ],
  },
  {
    period: '2027',
    title: 'Engenharia Elétrica na UFSCar (São Carlos) e Mercado',
    summary:
      'Transição da formação técnica no SENAI para a graduação em Engenharia Elétrica na UFSCar, buscando vaga de estágio ou desenvolvedor júnior (remoto ou em São Carlos) levando 17 projetos publicados no ar.',
    items: [],
  },
];

export function JourneySection({ projects, onSelectProject }: JourneySectionProps) {
  const projectMap = new Map(projects.map((p) => [p.id, p]));

  return (
    <section id="sobre" className="border-b border-stone-200 py-14 dark:border-stone-800">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
            Trajetória e formação
          </h2>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            Evolução cronológica a partir da data de criação dos 17 repositórios no GitHub (abril a novembro de 2026). Clique em qualquer projeto para ver a arquitetura.
          </p>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          {/* Linha do tempo cronológica */}
          <div className="lg:col-span-2">
            <ol className="relative space-y-8 border-l border-stone-200 pl-6 dark:border-stone-800">
              {TIMELINE_STAGES.map((stage) => (
                <li key={stage.period} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-[29px] h-2.5 w-2.5 rounded-full border-2 border-stone-50 bg-stone-400 dark:border-[#111110] dark:bg-stone-500"
                  />

                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-mono text-xs font-medium text-blue-700 dark:text-blue-400">
                      {stage.period}
                    </span>
                    <h3 className="text-base font-semibold text-stone-950 dark:text-stone-50">
                      {stage.title}
                    </h3>
                  </div>

                  <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                    {stage.summary}
                  </p>

                  {stage.items.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {stage.items.map(({ projectId, date }) => {
                        const project = projectMap.get(projectId);
                        if (!project) return null;
                        return (
                          <button
                            key={project.id}
                            type="button"
                            onClick={() => onSelectProject(project)}
                            className="inline-flex items-center gap-1.5 rounded-md border border-stone-200 bg-white px-2.5 py-1 text-xs text-stone-700 transition-colors hover:border-stone-400 hover:text-stone-950 dark:border-stone-800 dark:bg-[#181816] dark:text-stone-300 dark:hover:border-stone-600 dark:hover:text-stone-100"
                          >
                            <span className="font-mono text-[11px] text-stone-400 dark:text-stone-500">
                              {date}
                            </span>
                            <span className="font-medium">{project.title}</span>
                            {project.isSenai && (
                              <span className="rounded bg-stone-100 px-1 py-0.5 text-[10px] font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                                SENAI
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* Formação acadêmica e técnica */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wider text-stone-500 uppercase dark:text-stone-400">
              Formação
            </h3>
            {PROFILE.education.map((edu) => (
              <div
                key={edu.institution}
                className="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-[#181816]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-stone-950 dark:text-stone-50">
                    {edu.course}
                  </h4>
                  <span className="font-mono text-xs text-stone-500 dark:text-stone-400">
                    {edu.period}
                  </span>
                </div>
                <p className="mt-0.5 text-xs font-medium text-blue-700 dark:text-blue-400">
                  {edu.institution}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
