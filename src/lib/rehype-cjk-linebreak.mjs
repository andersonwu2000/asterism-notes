import { visit } from 'unist-util-visit'

/*
 * Markdown soft breaks render as spaces — right for English, wrong
 * for Chinese (a wrapped 中文 paragraph grows a phantom space at
 * every source line break). Between two CJK characters (or CJK
 * punctuation) the break disappears instead.
 */

const CJK =
  '[\\u3000-\\u303f\\u3040-\\u30ff\\u4e00-\\u9fff\\uf900-\\ufaff\\uff00-\\uffef]'
const BREAK_RE = new RegExp(`(?<=${CJK})\\n(?=${CJK})`, 'g')

export function rehypeCjkLinebreak() {
  return (tree) => {
    visit(tree, 'text', (node, _i, parent) => {
      if (parent?.tagName === 'pre' || parent?.tagName === 'code') return
      if (node.value.includes('\n')) node.value = node.value.replace(BREAK_RE, '')
    })
  }
}
