import { ArrowUpRight, Lock } from 'lucide-react';
import { Project } from '../data/projects';

interface FeaturedSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export function FeaturedSection({ projects, onSelectProject }: FeaturedSectionProps) {
  const [flagship, ...rest] = projects;

  return (
    <section id="destaques" className="border-b border-stone-200 py-14 dark:border-stone-800">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
              Em destaque — Projetos SENAI
            </h2>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              Projetos de Web Full-Stack, Front-End e Mobile desenvolvidos no SENAI.
            </p>
          </div>
          <a
            href="#projetos"
            className="text-sm font-medium text-blue-700 hover:underline dark:text-blue-400"
          >
            Ver todos os 17 projetos →
          </a>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {flagship && (
            <article className="overflow-hidden rounded-lg border border-stone-200 bg-white transition-colors hover:border-stone-300 md:col-span-2 md:grid md:grid-cols-2 dark:border-stone-800 dark:bg-[#181816] dark:hover:border-stone-700">
              {flagship.cover && (
                <button
                  type="button"
                  onClick={() => onSelectProject(flagship)}
                  className="aspect-[16/10] w-full overflow-hidden border-b border-stone-200 bg-stone-100 text-left md:aspect-auto md:h-full md:border-r md:border-b-0 dark:border-stone-800 dark:bg-stone-900"
                >
                  <img
                    src={flagship.cover}
                    alt={`Imagem do projeto ${flagship.title}`}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  />
                </button>
              )}

              <div className="flex flex-col p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-stone-500 dark:text-stone-400">
                    {flagship.repoName}
                  </span>
                  {flagship.isSenai && (
                    <span className="rounded bg-stone-100 px-1.5 py-0.5 text-[11px] font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                      SENAI
                    </span>
                  )}
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">
                    Repositório público
                  </span>
                </div>

                <h3 className="mt-2 text-xl font-semibold text-stone-950 dark:text-stone-50">
                  {flagship.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {flagship.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {flagship.primaryStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-stone-200 px-2 py-0.5 text-xs text-stone-600 dark:border-stone-700 dark:text-stone-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-stone-100 pt-4 text-sm dark:border-stone-800/80">
                  {flagship.liveUrl && (
                    <a
                      href={flagship.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-blue-700 hover:underline dark:text-blue-400"
                    >
                      Abrir no ar
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {flagship.githubUrl && (
                    <a
                      href={flagship.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-stone-700 hover:underline dark:text-stone-300"
                    >
                      Código no GitHub
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => onSelectProject(flagship)}
                    className="ml-auto text-sm font-medium text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100"
                  >
                    Ver arquitetura
                  </button>
                </div>
              </div>
            </article>
          )}

          {rest.map((project) => (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-colors hover:border-stone-300 dark:border-stone-800 dark:bg-[#181816] dark:hover:border-stone-700"
            >
              {project.cover && (
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="aspect-[16/9] w-full overflow-hidden border-b border-stone-200 bg-stone-100 text-left dark:border-stone-800 dark:bg-stone-900"
                >
                  <img
                    src={project.cover}
                    alt={`Imagem do projeto ${project.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-[1.02]"
                  />
                </button>
              )}

              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-stone-500 dark:text-stone-400">
                    {project.repoName}
                  </span>
                  {project.isSenai && (
                    <span className="rounded bg-stone-100 px-1.5 py-0.5 text-[11px] font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                      SENAI
                    </span>
                  )}
                  {project.isPrivate && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-stone-500 dark:text-stone-400">
                      <Lock className="h-3 w-3" />
                      Código privado
                    </span>
                  )}
                </div>

                <h3 className="mt-1.5 text-lg font-semibold text-stone-950 dark:text-stone-50">
                  {project.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {project.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.primaryStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-stone-200 px-2 py-0.5 text-xs text-stone-600 dark:border-stone-700 dark:text-stone-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-stone-100 pt-4 text-sm dark:border-stone-800/80">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-blue-700 hover:underline dark:text-blue-400"
                    >
                      Abrir no ar
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-stone-700 hover:underline dark:text-stone-300"
                    >
                      Código no GitHub
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="ml-auto text-sm font-medium text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100"
                  >
                    Ver arquitetura
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
