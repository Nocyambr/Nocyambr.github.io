import { ArrowUpRight, Lock } from 'lucide-react';
import { Project } from '../data/projects';

interface FeaturedSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export function FeaturedSection({ projects, onSelectProject }: FeaturedSectionProps) {
  return (
    <section id="destaques" className="border-b border-stone-200 py-14 dark:border-stone-800">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
              Em destaque
            </h2>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              Projetos principais para avaliar arquitetura, back-end e publicação em produção.
            </p>
          </div>
          <a
            href="#projetos"
            className="text-sm font-medium text-blue-700 hover:underline dark:text-blue-400"
          >
            Ir para o catálogo completo →
          </a>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-colors hover:border-stone-300 dark:border-stone-800 dark:bg-[#181816] dark:hover:border-stone-700"
            >
              {project.cover ? (
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="aspect-[16/9] w-full overflow-hidden border-b border-stone-200 bg-stone-100 text-left dark:border-stone-800 dark:bg-stone-900"
                >
                  <img
                    src={project.cover}
                    alt={`Imagem do projeto ${project.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="flex aspect-[16/9] w-full flex-col justify-between border-b border-stone-200 bg-stone-100 p-5 text-left dark:border-stone-800 dark:bg-stone-900/70"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-stone-500 dark:text-stone-400">
                      /{project.repoName}
                    </span>
                    <span className="font-mono text-xs text-stone-400 dark:text-stone-500">
                      {project.updatedAt}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                    <p>
                      <span className="font-medium text-stone-900 dark:text-stone-100">Back-end: </span>
                      {project.architecture.backend}
                    </p>
                    <p>
                      <span className="font-medium text-stone-900 dark:text-stone-100">Banco: </span>
                      {project.architecture.database}
                    </p>
                  </div>
                </button>
              )}

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
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
                  </div>
                </div>

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
