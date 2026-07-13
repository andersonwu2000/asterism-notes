import { visit } from 'unist-util-visit'

/*
 * Hover-revealed § anchors on article headings: the ids already
 * exist; this makes them reachable — readers arriving from links
 * want to point colleagues at a SECTION of a long argument
 * (design round, 2026-07-13).
 */
export function rehypeAnchors() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (!['h2', 'h3'].includes(node.tagName)) return
      const id = node.properties?.id
      if (!id) return
      node.children.push({
        type: 'element',
        tagName: 'a',
        properties: {
          className: ['hanchor'],
          href: `#${id}`,
          'aria-label': 'link to this section',
        },
        children: [{ type: 'text', value: '§' }],
      })
    })
  }
}
