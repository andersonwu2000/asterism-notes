import { getCollection } from 'astro:content'

/*
 * The bilingual pairing: entries live at en/<slug> and zh/<slug>;
 * group by slug, prefer the English side for default surfaces, keep
 * the Chinese original reachable everywhere it exists.
 */

/** @returns [{slug, en, zh, date, title, description}] newest first */
export async function pairedPosts() {
  const all = await getCollection(
    'posts',
    ({ data }) => import.meta.env.DEV || !data.draft,
  )
  const by = new Map()
  for (const e of all) {
    const [lang, ...rest] = e.slug.split('/')
    if (lang !== 'en' && lang !== 'zh') continue
    const slug = rest.join('/')
    const cur = by.get(slug) ?? { slug }
    cur[lang] = e
    by.set(slug, cur)
  }
  const out = [...by.values()].map((p) => {
    const head = p.en ?? p.zh
    return {
      ...p,
      date: head.data.date,
      title: head.data.title,
      description: head.data.description,
    }
  })
  // № by publication order (date ascending, slug as tiebreak): a
  // numbered series reads as a deliberate corpus, and "see № 4" is
  // how this audience talks (design round, 2026-07-13)
  out.sort(
    (a, b) => a.date.getTime() - b.date.getTime() || a.slug.localeCompare(b.slug),
  )
  out.forEach((p, i) => {
    p.no = i
  })
  out.reverse() // newest first for every listing surface
  return out
}
