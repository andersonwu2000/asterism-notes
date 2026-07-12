import { visit } from 'unist-util-visit'
import { tokenizeLean } from './lean.mjs'

/*
 * Build-time Lean highlighting: ```lean fences become span-wrapped
 * hast nodes — static HTML, zero client JS. Comment tokens get their
 * `backticked refs` sub-highlighted (a docstring's cross-references
 * are its most load-bearing words), same as the console.
 */

const CMT_CODE_RE = /(`[^`\n]+`)/

const span = (cls, children) => ({
  type: 'element',
  tagName: 'span',
  properties: { className: [cls] },
  children,
})
const text = (value) => ({ type: 'text', value })

function tokToNodes(t) {
  if (t.t === 'plain') return [text(t.s)]
  if (t.t === 'cmt') {
    const parts = t.s.split(CMT_CODE_RE).filter((p) => p !== '')
    return [
      span(
        'syn-cmt',
        parts.map((p) =>
          p.startsWith('`') && p.endsWith('`') && p.length > 2
            ? span('syn-cmt-ref', [text(p)])
            : text(p),
        ),
      ),
    ]
  }
  return [span(`syn-${t.t}`, [text(t.s)])]
}

export function rehypeLean() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'pre') return
      const code = node.children?.[0]
      if (
        !code ||
        code.tagName !== 'code' ||
        !(code.properties?.className ?? []).includes('language-lean')
      )
        return
      const src = code.children
        .filter((c) => c.type === 'text')
        .map((c) => c.value)
        .join('')
      code.children = tokenizeLean(src).flatMap(tokToNodes)
      node.properties = { ...node.properties, className: ['lean-block'] }
    })
  }
}
