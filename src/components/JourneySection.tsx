import { PROFILE } from '../data/profile';

export function JourneySection() {
  return (
    <section id="sobre" className="border-b border-stone-200 py-14 dark:border-stone-800">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <h2 className="text-xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
          Sobre e formação
        </h2>

        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div className="space-y-4 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
            <p>
              Comecei no curso Técnico em Desenvolvimento de Sistemas do SENAI aprendendo a base de
              front-end, back-end, mobile e bancos de dados. Lá desenvolvi projetos como o sistema
              de viagens do SESI Cerquilho (React, Cloudflare Workers e Laravel) e aplicativos em
              React Native com Expo.
            </p>
            <p>
              Além das entregas do curso, passei a construir e colocar projetos próprios no ar para
              aprender na prática sobre autenticação SSO, bancos relacionais em produção (Neon
              PostgreSQL, Supabase e Cloudflare D1), WebSockets, testes automatizados e publicação.
              Em 2027 vou morar em São Carlos para cursar Engenharia Elétrica na UFSCar e procuro uma
              oportunidade de estágio ou dev júnior para contribuir com o time enquanto sigo estudando.
            </p>
          </div>

          <div className="space-y-4">
            {PROFILE.education.map((edu) => (
              <div
                key={edu.institution}
                className="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-[#181816]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-stone-950 dark:text-stone-50">
                    {edu.course}
                  </h3>
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
