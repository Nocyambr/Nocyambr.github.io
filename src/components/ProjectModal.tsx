import { ArrowUpRight, Lock, X } from 'lucide-react';
import { useEffect } from 'react';
import { PROFILE } from '../data/profile';
import { CATEGORY_LABELS, Project } from '../data/projects';

interface ProjectModalProps {
  project: Project | null;
  allProjects: Project[];
  onSelectProject: (project: Project) => void;
  onClose: () => void;
}

export function ProjectModal({
  project,
  allProjects,
  onSelectProject,
  onClose,
}: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const gameHubParent = allProjects.find((p) => p.id === 'game-hub');
  const attachedGames =
    project.id === 'game-hub' ? allProjects.filter((p) => p.inGameHub) : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-stone-200 bg-white shadow-xl dark:border-stone-800 dark:bg-[#181816]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-white px-5 py-3.5 dark:border-stone-800 dark:bg-[#181816]">
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-mono">{project.repoName}</span>
            <span>·</span>
            <span>{CATEGORY_LABELS[project.category]}</span>
            {project.isSenai && (
              <>
                <span>·</span>
                <span className="font-medium text-stone-700 dark:text-stone-300">SENAI</span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela"
            className="inline-flex h-7 w-7 items-center justify-center rounded text-stone-500 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {project.cover && (
          <div className="aspect-[16/9] w-full overflow-hidden border-b border-stone-200 bg-stone-100 dark:border-stone-800 dark:bg-stone-900">
            <img
              src={project.cover}
              alt={project.title}
              className="h-full w-full object-cover object-top"
            />
          </div>
        )}

        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="modal-title" className="text-xl font-bold text-stone-950 dark:text-stone-50">
              {project.title}
            </h2>
            <span className="inline-flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
              {project.isPrivate ? (
                <>
                  <Lock className="h-3.5 w-3.5" />
                  Repositório privado (código sob consulta)
                </>
              ) : (
                'Repositório público no GitHub'
              )}
            </span>
          </div>

          {project.inGameHub && gameHubParent && (
            <div className="mt-2">
              <button
                type="button"
                onClick={() => onSelectProject(gameHubParent)}
                className="inline-flex items-center gap-1.5 rounded border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-800 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-300"
              >
                Anexado ao GameHub {project.usesGameHubSso ? '(com Login Único SSO)' : '(catálogo)'} →
              </button>
            </div>
          )}

          <p className="mt-3 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
            {project.summary}
          </p>

          <div className="mt-6">
            <h3 className="text-xs font-semibold tracking-wider text-stone-500 uppercase dark:text-stone-400">
              Arquitetura técnica
            </h3>
            <dl className="mt-2 divide-y divide-stone-200 rounded-md border border-stone-200 text-sm dark:divide-stone-800 dark:border-stone-800">
              <div className="grid gap-1 px-3.5 py-2.5 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-stone-600 dark:text-stone-400">Front-end</dt>
                <dd className="text-stone-900 sm:col-span-2 dark:text-stone-100">
                  {project.architecture.frontend}
                </dd>
              </div>
              <div className="grid gap-1 px-3.5 py-2.5 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-stone-600 dark:text-stone-400">Back-end</dt>
                <dd className="text-stone-900 sm:col-span-2 dark:text-stone-100">
                  {project.architecture.backend}
                </dd>
              </div>
              <div className="grid gap-1 px-3.5 py-2.5 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-stone-600 dark:text-stone-400">Banco de dados</dt>
                <dd className="text-stone-900 sm:col-span-2 dark:text-stone-100">
                  {project.architecture.database}
                </dd>
              </div>
              <div className="grid gap-1 px-3.5 py-2.5 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-stone-600 dark:text-stone-400">Qualidade / deploy</dt>
                <dd className="text-stone-900 sm:col-span-2 dark:text-stone-100">
                  {project.architecture.quality}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-6">
            <h3 className="text-xs font-semibold tracking-wider text-stone-500 uppercase dark:text-stone-400">
              O que foi implementado
            </h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-stone-700 dark:text-stone-300">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {attachedGames.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-semibold tracking-wider text-stone-500 uppercase dark:text-stone-400">
                Jogos anexados ao GameHub ({attachedGames.length})
              </h3>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {attachedGames.map((game) => (
                  <button
                    key={game.id}
                    type="button"
                    onClick={() => onSelectProject(game)}
                    className="flex items-center justify-between rounded-md border border-stone-200 px-3 py-2 text-left text-xs transition-colors hover:border-stone-300 hover:bg-stone-50 dark:border-stone-800 dark:hover:border-stone-700 dark:hover:bg-stone-900"
                  >
                    <span className="font-medium text-stone-900 dark:text-stone-100">
                      {game.title}
                    </span>
                    <span className="font-mono text-[11px] text-stone-500 dark:text-stone-400">
                      {game.usesGameHubSso ? 'SSO' : 'Catálogo'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.allTech.map((tech) => (
              <span
                key={tech}
                className="rounded border border-stone-200 px-2 py-0.5 text-xs text-stone-600 dark:border-stone-700 dark:text-stone-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-stone-200 pt-4 dark:border-stone-800">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-200"
              >
                Abrir aplicação no ar
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-stone-300 px-4 py-2 text-sm font-medium text-stone-800 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
              >
                Ver código no GitHub
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <a
                href={PROFILE.links.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-stone-300 px-4 py-2 text-sm font-medium text-stone-800 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
              >
                Pedir demonstração do código
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
