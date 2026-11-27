# Portfólio — Maycon dos Santos Tavares

Site publicado em: **https://nocyambr.github.io/**

Reúne 17 projetos do meu GitHub (incluindo trabalhos do **SENAI — Desenvolvimento de Sistemas**, aplicativos em **React Native**, sistemas em **Cloudflare Workers**, **Neon PostgreSQL**, **Supabase** e **Laravel**), com filtros por categoria, busca por tecnologia e detalhes de arquitetura.

## Stack do portfólio

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Lucide React

## Como rodar localmente

```bash
npm install
npm run dev
```

Para gerar o build de produção:

```bash
npm run build
```

## Onde editar os dados

- [`src/data/profile.ts`](src/data/profile.ts) — nome, formação (SENAI e UFSCar São Carlos 2027) e links de contato
- [`src/data/projects.ts`](src/data/projects.ts) — lista dos projetos, categorias, stacks, links e arquitetura

## Deploy

O deploy para o GitHub Pages é feito automaticamente a cada push na branch `main` pelo workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
