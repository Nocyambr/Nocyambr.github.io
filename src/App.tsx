import { useEffect, useState } from 'react';
import { CatalogSection } from './components/CatalogSection';
import { ContactSection } from './components/ContactSection';
import { FeaturedSection } from './components/FeaturedSection';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { JourneySection } from './components/JourneySection';
import { Navbar } from './components/Navbar';
import { ProjectModal } from './components/ProjectModal';
import { SkillsSection } from './components/SkillsSection';
import { PROJECTS, Project, ProjectCategory } from './data/projects';

export function App() {
  const [dark, setDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved === 'dark';
  });

  const [category, setCategory] = useState<'all' | ProjectCategory>('all');
  const [search, setSearch] = useState('');
  const [onlyLive, setOnlyLive] = useState(false);
  const [techFilter, setTechFilter] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    }
  }, [dark]);

  function handleSelectTech(tech: string) {
    setTechFilter((current) => (current === tech ? null : tech));
    setCategory('all');
    document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' });
  }

  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const liveCount = PROJECTS.filter((p) => Boolean(p.liveUrl)).length;
  const publicCount = PROJECTS.filter((p) => !p.isPrivate).length;

  return (
    <div className="min-h-screen">
      <Navbar
        dark={dark}
        onToggleTheme={() => setDark((d) => !d)}
        totalProjects={PROJECTS.length}
      />

      <main>
        <Hero
          totalProjects={PROJECTS.length}
          liveCount={liveCount}
          publicCount={publicCount}
        />

        <FeaturedSection
          projects={featuredProjects}
          onSelectProject={setSelectedProject}
        />

        <CatalogSection
          projects={PROJECTS}
          category={category}
          onCategoryChange={setCategory}
          search={search}
          onSearchChange={setSearch}
          onlyLive={onlyLive}
          onOnlyLiveChange={setOnlyLive}
          techFilter={techFilter}
          onTechFilterChange={setTechFilter}
          onSelectProject={setSelectedProject}
        />

        <SkillsSection
          projects={PROJECTS}
          activeTech={techFilter}
          onSelectTech={handleSelectTech}
        />

        <JourneySection />

        <ContactSection />
      </main>

      <Footer />

      <ProjectModal
        project={selectedProject}
        allProjects={PROJECTS}
        onSelectProject={setSelectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;
