import { defineConfig } from 'astro/config'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { rehypeLean } from './src/lib/rehype-lean.mjs'
import { rehypeCjkLinebreak } from './src/lib/rehype-cjk-linebreak.mjs'

// GitHub project page: served under /asterism/ — every internal link
// goes through import.meta.env.BASE_URL.
export default defineConfig({
  site: 'https://andersonwu2000.github.io',
  base: '/asterism',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeLean, rehypeCjkLinebreak],
    syntaxHighlight: false, // lean blocks are ours; no shiki double-pass
  },
})
