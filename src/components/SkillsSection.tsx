import { Project } from '../data/projects';

interface SkillsSectionProps {
  projects: Project[];
  activeTech: string | null;
  onSelectTech: (tech: string) => void;
}

const SKILL_GROUPS = [
  {
    title: 'Front-end',
    items: ['TypeScript', 'React', 'JavaScript', 'Next.js', 'Tailwind CSS', 'Vite', 'Three.js', 'Canvas 2D'],
  },
  {
    title: 'Back-end e cloud',
    items: ['Cloudflare Workers', 'Durable Objects', 'Cloudflare Pages', 'Laravel / PHP', 'WebSockets', 'Socket.io', 'WebAssembly'],
  },
  {
    title: 'Bancos de dados',
    items: ['Neon PostgreSQL', 'PostgreSQL', 'Supabase', 'Cloudflare D1', 'SQLite'],
  },
  {
    title: 'Mobile e testes',
    items: ['React Native', 'Expo', 'Playwright', 'Vitest', 'CI/CD'],
  },
];

export function SkillsSection({ projects, activeTech, onSelectTech }: SkillsSectionProps) {
  function countProjects(tech: string): number {
    return projects.filter((p) => p.allTech.includes(tech)).length;
  }

  return (
    <section id="tecnologias" className="border-b border-stone-200 py-14 dark:border-stone-800">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
            Tecnologias usadas nos projetos
          </h2>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            Clique em qualquer tecnologia para filtrar o catálogo acima.
          </p>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="border-b border-stone-200 pb-2 text-sm font-semibold text-stone-900 dark:border-stone-800 dark:text-stone-100">
                {group.title}
              </h3>
              <ul className="mt-3 space-y-1.5">
                {group.items.map((tech) => {
                  const count = countProjects(tech);
                  if (count === 0) return null;
                  const isActive = activeTech === tech;
                  return (
                    <li key={tech}>
                      <button
                        type="button"
                        onClick={() => onSelectTech(tech)}
                        className={`flex w-full items-center justify-between rounded px-2 py-1 text-left text-sm transition-colors ${
                          isActive
                            ? 'bg-blue-50 font-medium text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                            : 'text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800/70'
                        }`}
                      >
                        <span>{tech}</span>
                        <span className="font-mono text-xs text-stone-400 dark:text-stone-500">
                          {count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
