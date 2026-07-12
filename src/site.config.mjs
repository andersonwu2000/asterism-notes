/*
 * The one file to edit when wiring the site up. Everything here is
 * optional except title/description — empty strings simply hide the
 * corresponding surface.
 */
export const SITE = {
  title: 'Asterism',
  description:
    'Design notes on having LLM agents write machine-checked mathematics',
  /** shown in the footer and under every post when set */
  email: '',
  /** the public repo — footer link + where discussions live */
  github: 'https://github.com/andersonwu2000/asterism',
  /**
   * giscus comments (GitHub Discussions under each post).
   * To enable: 1) repo Settings → enable Discussions,
   * 2) install https://github.com/apps/giscus on the repo,
   * 3) fill the four ids from https://giscus.app (pick the repo,
   *    mapping "pathname", a category like "Announcements").
   * Empty repo = comments off, the email line (if set) stands in.
   */
  giscus: {
    repo: '',
    repoId: '',
    category: '',
    categoryId: '',
  },
}
