import { ArrowUpRight, Lock, Search, X } from 'lucide-react';
import { CATEGORY_LABELS, Project, ProjectCategory } from '../data/projects';

interface CatalogSectionProps {
  projects: Project[];
  category: 'all' | ProjectCategory;
  onCategoryChange: (cat: 'all' | ProjectCategory) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onlyLive: boolean;
  onOnlyLiveChange: (value: boolean) => void;
  techFilter: string | null;
  onTechFilterChange: (tech: string | null) => void;
  onSelectProject: (project: Project) => void;
}

const CATEGORIES: Array<'all' | ProjectCategory> = [
  'all',
  'senai-web',
  'mobile',
  'cloud-realtime',
  'games',
];

export function CatalogSection({
  projects,
  category,
  onCategoryChange,
  search,
  onSearchChange,
  onlyLive,
  onOnlyLiveChange,
  techFilter,
  onTechFilterChange,
  onSelectProject,
}: CatalogSectionProps) {
  const counts: Record<'all' | ProjectCategory, number> = {
    all: projects.length,
    'senai-web': projects.filter((p) => p.category === 'senai-web').length,
    mobile: projects.filter((p) => p.category === 'mobile').length,
    'cloud-realtime': projects.filter((p) => p.category === 'cloud-realtime').length,
    games: projects.filter((p) => p.category === 'games').length,
  };

  const filtered = projects.filter((project) => {
    if (category !== 'all' && project.category !== category) return false;
    if (onlyLive && !project.liveUrl) return false;
    if (techFilter && !project.allTech.includes(techFilter)) return false;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const haystack = [
        project.title,
        project.repoName,
        project.tagline,
        project.summary,
        ...project.primaryStack,
        ...project.allTech,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });

  function clearFilters() {
    onCategoryChange('all');
    onSearchChange('');
    onOnlyLiveChange(false);
    onTechFilterChange(null);
  }

  return (
    <section id="projetos" className="border-b border-stone-200 py-14 dark:border-stone-800">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
              Todos os projetos ({projects.length})
            </h2>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              Repositórios públicos do GitHub e projetos privados com link online ou detalhes técnicos.
            </p>
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            Exibindo {filtered.length} de {projects.length}
          </span>
        </div>

        {/* Filtros */}
        <div className="mt-6 flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onCategoryChange(cat)}
                  className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                    active
                      ? 'border-stone-900 bg-stone-900 font-medium text-stone-50 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-950'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300 dark:border-stone-800 dark:bg-[#181816] dark:text-stone-300 dark:hover:border-stone-700'
                  }`}
                >
                  {CATEGORY_LABELS[cat]} ({counts[cat]})
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar por nome, repositório ou tecnologia (ex: Laravel, Neon, React Native)..."
                aria-label="Buscar projetos"
                className="w-full rounded-md border border-stone-200 bg-white py-2 pr-3 pl-9 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none dark:border-stone-800 dark:bg-[#181816] dark:text-stone-100 dark:focus:border-stone-600"
              />
            </div>

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 select-none dark:border-stone-800 dark:bg-[#181816] dark:text-stone-300">
              <input
                type="checkbox"
                checked={onlyLive}
                onChange={(e) => onOnlyLiveChange(e.target.checked)}
                className="h-4 w-4 rounded border-stone-300 accent-stone-900 dark:accent-stone-100"
              />
              Apenas com link no ar ({projects.filter((p) => p.liveUrl).length})
            </label>
          </div>

          {techFilter && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-stone-500 dark:text-stone-400">Filtro por tecnologia:</span>
              <button
                type="button"
                onClick={() => onTechFilterChange(null)}
                className="inline-flex items-center gap-1 rounded border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-800 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-300"
              >
                {techFilter}
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        {/* Grade */}
        {filtered.length === 0 ? (
          <div className="mt-8 rounded-lg border border-stone-200 bg-white p-8 text-center dark:border-stone-800 dark:bg-[#181816]">
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Nenhum projeto encontrado com os filtros atuais.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-3 text-sm font-medium text-blue-700 hover:underline dark:text-blue-400"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <article
                key={project.id}
                className="flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-colors hover:border-stone-300 dark:border-stone-800 dark:bg-[#181816] dark:hover:border-stone-700"
              >
                {project.cover && (
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="aspect-[16/10] w-full overflow-hidden border-b border-stone-200 bg-stone-100 text-left dark:border-stone-800 dark:bg-stone-900"
                  >
                    <img
                      src={project.cover}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                    />
                  </button>
                )}

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center justify-between gap-2 text-xs text-stone-500 dark:text-stone-400">
                    <span className="truncate font-mono">{project.repoName}</span>
                    <span className="shrink-0">{project.updatedAt}</span>
                  </div>

                  <div className="mt-1.5 flex items-center gap-2">
                    <h3 className="text-base font-semibold text-stone-950 dark:text-stone-50">
                      {project.title}
                    </h3>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]">
                    {project.isSenai && (
                      <span className="rounded bg-stone-100 px-1.5 py-0.5 font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                        SENAI
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-stone-500 dark:text-stone-400">
                      {project.isPrivate ? (
                        <>
                          <Lock className="h-3 w-3" />
                          Privado
                        </>
                      ) : (
                        'Repositório público'
                      )}
                    </span>
                  </div>

                  <p className="mt-2.5 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                    {project.tagline}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.primaryStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-stone-200 px-2 py-0.5 text-[11px] text-stone-600 dark:border-stone-700 dark:text-stone-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-4 text-xs font-medium">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-0.5 text-blue-700 hover:underline dark:text-blue-400"
                      >
                        Abrir
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-0.5 text-stone-700 hover:underline dark:text-stone-300"
                      >
                        GitHub
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="ml-auto text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100"
                    >
                      Detalhes
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
