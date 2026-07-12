---
title: "第零篇：格式樣張"
date: 2026-07-13
description: "佔位樣張——這站支援的每種寫作元件各出現一次，第一篇真文章落地時請直接取代它。"
draft: false
---

這不是一篇文章，是文章的形狀。這個站支援的每種元件在下面各出現一
次；寫真文章時，複製本檔的 frontmatter、刪掉正文即可。

## 文字與強調

一般段落承載論證。*斜體*、**粗體**照常，
[連結](https://leanprover-community.github.io/)、行內 `code` 也是。
安靜的引用：

> 引用塊放別人的話，或你自己正在重新審視的舊話。

## 數學

行內數學嵌在句子裡，$\pi_1(S^1) \cong \mathbb{Z}$，展示數學自成一行：

$$
\oint_{\partial \Omega} \omega \;=\; \int_{\Omega} d\omega
$$

## Lean

標記為 `lean` 的代碼塊由 Asterism 主控台同一顆 tokenizer 著色——六
種低飽和墨色，僅此而已：

```lean
import Mathlib

/-- 圓的恆等迴圈不是零倫的——承重的一步見
`circle_not_simply_connected`。 -/
theorem circle_id_essential :
    ¬ Nullhomotopic (ContinuousMap.id : C(S¹, S¹)) := by
  intro h
  exact circle_not_simply_connected (h.trans rfl)
```

## 家務事

Frontmatter 欄位：`title`、`date`（YYYY-MM-DD）、`description`（首頁
標題下那一行）、可選的 `draft: true`（`npm run dev` 可見、正式建置不
出現）。檔名就是文章的 URL、也是配對鍵——`posts/en/<同名>.md` 是英
文版，兩邊都存在時頁面互相連結。
