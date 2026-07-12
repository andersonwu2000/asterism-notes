---
title: "Post zero: a format sample"
date: 2026-07-13
description: "A placeholder that shows every device these pages support — replace it with the first real note."
draft: false
---

This is not an article; it is the shape of one. Every device the site
supports appears once below, so writing a real post is a matter of
copying this file's frontmatter and deleting its body.

## Prose and emphasis

Plain paragraphs carry the argument. *Emphasis* and **strong emphasis**
work as usual, as do [links](https://leanprover-community.github.io/),
inline `code`, and footnote-free quiet asides:

> Block quotes hold someone else's words, or your own past words being
> reconsidered.

## Mathematics

Inline math sits inside the sentence, $\pi_1(S^1) \cong \mathbb{Z}$,
while display math takes its own line:

$$
\oint_{\partial \Omega} \omega \;=\; \int_{\Omega} d\omega
$$

## Lean

Fenced blocks marked `lean` are highlighted by the same tokenizer the
Asterism console uses — six low-saturation inks, nothing else:

```lean
import Mathlib

/-- The circle's identity loop is not null-homotopic — see
`circle_not_simply_connected` for the load-bearing step. -/
theorem circle_id_essential :
    ¬ Nullhomotopic (ContinuousMap.id : C(S¹, S¹)) := by
  intro h
  exact circle_not_simply_connected (h.trans rfl)
```

## Housekeeping

The frontmatter fields: `title`, `date` (YYYY-MM-DD), `description`
(one line under the title on the index), and optional `draft: true`
(visible in `npm run dev`, absent from the built site). The file's
name is the post's URL and its pairing key — `posts/zh/<same-name>.md`
is the Chinese counterpart, and each page links to the other when both
exist.
