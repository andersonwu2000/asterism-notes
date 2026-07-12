import { defineCollection, z } from 'astro:content'

/*
 * One collection, two language folders: posts/en/<slug>.md and
 * posts/zh/<slug>.md. The SLUG is the pairing key — same filename in
 * both folders = one bilingual post. Either side may exist alone
 * (the Chinese original usually lands first, the translation later).
 */
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    /** one line under the title in the index */
    description: z.string().default(''),
    draft: z.boolean().default(false),
  }),
})

export const collections = { posts }
