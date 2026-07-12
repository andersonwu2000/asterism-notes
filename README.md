# Asterism — design notes

The independent site for Asterism's design notes: static, bilingual,
math-rendered, Lean-highlighted. Built with Astro, deployed to GitHub
Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Writing a post

1. Copy `src/content/posts/en/post-zero-format-sample.md` (or the
   `zh/` one) — it demonstrates every supported device.
2. Name the file — the name is the URL and the pairing key.
3. The Chinese original goes in `src/content/posts/zh/<name>.md`, the
   English translation in `src/content/posts/en/<name>.md`. Either may
   exist alone; pages cross-link when both do. English is the default
   surface, so the index links the English page when it exists.
4. `draft: true` keeps a post out of the built site (still visible in
   `npm run dev`).
5. Push. The Action builds and deploys.

## Local preview

```
npm install
npm run dev        # live-reload at localhost:4321/asterism/
npm run build      # what CI does
```

## One-time wiring (owner checklist)

- **Comments (giscus)**: repo Settings → enable Discussions; install
  the giscus app (github.com/apps/giscus) on this repo; open
  giscus.app, pick this repo + mapping "pathname" + a category, and
  copy the four ids into `src/site.config.mjs`. Until then the email
  line (if set) stands in.
- **Email**: set `email` in `src/site.config.mjs` to show it in the
  footer and under posts.
- **Custom domain** (later): repo Settings → Pages → custom domain,
  then change `site`/`base` in `astro.config.mjs`.

## Where things live

- Site chrome copy + config: `src/site.config.mjs`
- Visual language: `src/styles/global.css` (palette and type mirror
  the Asterism console; the Lean inks are the console's `--color-syn-*`)
- Lean tokenizer: `src/lib/lean.mjs` — a port of the console's
  `web/src/lib/lean.tsx`; keep them in step when the grammar grows.
