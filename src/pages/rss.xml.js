import rss from '@astrojs/rss'
import { pairedPosts } from '../lib/posts.mjs'
import { SITE } from '../site.config.mjs'

// One feed, union of languages: the English page when it exists, the
// Chinese original otherwise (readers following the work should hear
// about a post when it FIRST lands, not when its translation does).
export async function GET(context) {
  const posts = await pairedPosts()
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((p) => ({
      title: p.en ? p.title : `${p.title}（中文）`,
      pubDate: p.date,
      description: p.description,
      link: p.en
        ? `${import.meta.env.BASE_URL}posts/${p.slug}/`
        : `${import.meta.env.BASE_URL}zh/posts/${p.slug}/`,
    })),
  })
}
