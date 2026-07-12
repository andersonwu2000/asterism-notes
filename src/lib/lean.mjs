/*
 * Lean display highlighting — ported from the Asterism console's
 * single shared tokenizer (web/src/lib/lean.tsx in the product repo;
 * keep the two in step when the grammar grows). One pass, display
 * only. The six low-saturation inks live in styles/global.css as
 * --syn-* variables.
 */

const KEYWORDS = new Set([
  'theorem', 'lemma', 'def', 'abbrev', 'example', 'instance', 'inductive',
  'structure', 'class', 'noncomputable', 'private', 'protected', 'partial',
  'unsafe', 'mutual', 'where', 'deriving', 'extends', 'import', 'open',
  'namespace', 'end', 'section', 'variable', 'variables', 'universe',
  'axiom', 'by', 'exact', 'intro', 'intros', 'apply', 'refine', 'obtain',
  'rcases', 'rintro', 'simp', 'rw', 'rfl', 'calc', 'have', 'show', 'from',
  'let', 'fun', 'match', 'with', 'do', 'if', 'then', 'else', 'at', 'sorry',
  'scoped', 'local', 'attribute', 'set_option', 'in',
])
const SORTS = new Set(['Type', 'Prop', 'Sort'])
const DECL_KEYWORDS = new Set([
  'theorem', 'lemma', 'def', 'abbrev', 'example', 'instance', 'inductive',
  'structure', 'class', 'axiom', 'namespace',
])

const WORD_RE = /[A-Za-z_][A-Za-z0-9_'!?]*/y
const QUALIFIED_RE = /[A-Za-z_][A-Za-z0-9_'!?]*(?:\.[A-Za-z_][A-Za-z0-9_'!?]*)*/y
const NUM_RE = /\d[\d.]*/y
const MATH_ALPHA_RE = /[ℂ-ℸ\u{1D400}-\u{1D7FF}]+/uy

/** @returns {{t: string, s: string}[]} */
export function tokenizeLean(src, declHead = false) {
  const toks = []
  let plain = ''
  let expectDecl = declHead
  const flush = () => {
    if (plain !== '') {
      toks.push({ t: 'plain', s: plain })
      plain = ''
    }
  }
  let i = 0
  while (i < src.length) {
    const two = src.slice(i, i + 2)
    if (two === '/-') {
      flush()
      let depth = 1
      let j = i + 2
      while (j < src.length && depth > 0) {
        if (src.startsWith('/-', j)) {
          depth++
          j += 2
        } else if (src.startsWith('-/', j)) {
          depth--
          j += 2
        } else {
          j++
        }
      }
      toks.push({ t: 'cmt', s: src.slice(i, j) })
      i = j
      continue
    }
    if (two === '--') {
      flush()
      let j = src.indexOf('\n', i)
      if (j === -1) j = src.length
      toks.push({ t: 'cmt', s: src.slice(i, j) })
      i = j
      continue
    }
    if (src[i] === '"') {
      flush()
      let j = i + 1
      while (j < src.length && src[j] !== '"') {
        j += src[j] === '\\' ? 2 : 1
      }
      toks.push({ t: 'str', s: src.slice(i, Math.min(j + 1, src.length)) })
      i = Math.min(j + 1, src.length)
      continue
    }
    if (two === '@[') {
      flush()
      let j = src.indexOf(']', i)
      if (j === -1) j = src.length - 1
      toks.push({ t: 'attr', s: src.slice(i, j + 1) })
      i = j + 1
      continue
    }
    WORD_RE.lastIndex = i
    const w = WORD_RE.exec(src)
    if (w && w.index === i) {
      flush()
      const word = w[0]
      if (expectDecl && !KEYWORDS.has(word)) {
        QUALIFIED_RE.lastIndex = i
        const q = QUALIFIED_RE.exec(src)
        const name = q && q.index === i ? q[0] : word
        toks.push({ t: 'decl', s: name })
        i += name.length
        expectDecl = false
        continue
      }
      toks.push({
        t: KEYWORDS.has(word) ? 'kw' : SORTS.has(word) ? 'sort' : 'plain',
        s: word,
      })
      if (KEYWORDS.has(word)) expectDecl = DECL_KEYWORDS.has(word)
      i += word.length
      continue
    }
    NUM_RE.lastIndex = i
    const n = NUM_RE.exec(src)
    if (n && n.index === i) {
      flush()
      toks.push({ t: 'num', s: n[0] })
      i += n[0].length
      continue
    }
    MATH_ALPHA_RE.lastIndex = i
    const m = MATH_ALPHA_RE.exec(src)
    if (m && m.index === i) {
      flush()
      toks.push({ t: expectDecl ? 'decl' : 'sort', s: m[0] })
      expectDecl = false
      i += m[0].length
      continue
    }
    if (expectDecl && !/\s/.test(src[i])) expectDecl = false
    plain += src[i]
    i++
  }
  flush()
  const merged = []
  for (const t of toks) {
    const last = merged[merged.length - 1]
    if (last && last.t === 'plain' && t.t === 'plain') last.s += t.s
    else merged.push({ ...t })
  }
  return merged
}
