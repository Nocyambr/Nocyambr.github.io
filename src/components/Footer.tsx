import { PROFILE } from '../data/profile';

export function Footer() {
  return (
    <footer className="border-t border-stone-200 py-6 dark:border-stone-800">
      <div className="mx-auto flex max-w-5xl flex-col justify-between gap-2 px-5 text-xs text-stone-500 sm:flex-row sm:items-center sm:px-8 dark:text-stone-400">
        <p>
          {PROFILE.name} · {PROFILE.locationTransition}
        </p>
        <p>Feito em React e TypeScript</p>
      </div>
    </footer>
  );
}
