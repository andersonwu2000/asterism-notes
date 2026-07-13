import { defineConfig } from 'astro/config'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { rehypeLean } from './src/lib/rehype-lean.mjs'
import { rehypeCjkLinebreak } from './src/lib/rehype-cjk-linebreak.mjs'
import { rehypeAnchors } from './src/lib/rehype-anchors.mjs'

// GitHub project page: served under /asterism-notes/ — every internal
// link goes through import.meta.env.BASE_URL. (Plain "asterism" is
// the product repo's name — GitHub repo names collide case-
// insensitively.)
export default defineConfig({
  site: 'https://andersonwu2000.github.io',
  base: '/asterism-notes',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeLean, rehypeCjkLinebreak, rehypeAnchors],
    syntaxHighlight: false, // lean blocks are ours; no shiki double-pass
  },
})
