# Biostatistics — Interactive Tutorial

**🌐 Live demo / 線上瀏覽**: <https://charlene717.github.io/biostats-interactive-tutorial/>

## 中文簡介

生物統計互動式教學。13 章涵蓋描述統計、機率分布、抽樣與 CLT、假設檢定、t/卡方/ANOVA、線性 / 邏輯斯迴歸、存活分析、樣本數與檢定力、多重檢定 (FDR)、混合效應模型。

- 每章內建 Chart.js 互動 slider，調整參數即時看分布 / p-value / power / KM 曲線變化
- R + Python 雙程式碼範例（base R / dplyr / lme4 / survival ↔ scipy / statsmodels / lifelines）
- 完整 references 頁含 Rosner / Altman / Kleinbaum / Hosmer 經典教科書 + ASA p-value 聲明 + CONSORT/STROBE/TRIPOD/ARRIVE 報告規範 + 50+ 篇關鍵方法論文
- 7 條教學註記涵蓋 ASA p-value 警告、Welch 為預設、Fisher exact 小樣本規則、post-hoc power 禁忌、BH vs BY 假設、Cox PH 違反處置、Hurlbert 1984 pseudo-replication

繁體中文 / English 雙語，瀏覽器直接開啟 `index.html` 即可使用。

## English Description

A bilingual (繁體中文 / English) interactive biostatistics tutorial in 13 chapters covering descriptive statistics, probability distributions, sampling & CLT, hypothesis testing, t / chi-square / ANOVA, linear / logistic regression, survival analysis, power & sample size, multiple testing (FDR), and mixed-effects models.

- Each chapter has Chart.js interactive sliders — adjust parameters and watch distributions / p-values / power / KM curves update in real time
- Code examples in both R and Python (base R / dplyr / lme4 / survival ↔ scipy / statsmodels / lifelines)
- Complete references page covering Rosner / Altman / Kleinbaum / Hosmer textbooks, ASA p-value statements, CONSORT / STROBE / TRIPOD / ARRIVE reporting guidelines, plus 50+ key methodological papers
- 7 tutorial notes covering ASA p-value cautions, Welch as default, Fisher's exact small-sample rule, post-hoc power taboo, BH vs BY assumptions, Cox PH violation handling, and Hurlbert 1984 pseudo-replication

Open `index.html` in any modern browser. No backend, no build step.

## Quick start

Open `index.html` in Chrome / Edge / Firefox / Safari.

## Chapter map

### Block 1 · Descriptive Foundations
- `descriptive.html` — Mean / median / SD / IQR, skew effect on mean vs median
- `distributions.html` — Normal / binomial / Poisson / t / F / chi-square
- `sampling.html` — Sampling distributions and the Central Limit Theorem

### Block 2 · Statistical Inference
- `hypothesis.html` — H₀ / H₁ / p-value / type I/II errors / α & β
- `t-tests.html` — One / two-sample / paired; Welch as default
- `chi-square.html` — Independence / GoF / homogeneity, Fisher's exact, OR vs RR
- `anova.html` — One-way / two-way ANOVA, F statistic, post-hoc

### Block 3 · Models & Study Design
- `regression.html` — OLS, residual diagnostics, VIF, confounders
- `logistic.html` — Logit link, OR interpretation, EPV ≥ 10 rule
- `survival.html` — Kaplan-Meier, log-rank, Cox PH, censoring
- `power.html` — α / β / effect size / n; no post-hoc power
- `fdr.html` — FWER vs FDR, BH / BY / Storey q-value
- `mixed-models.html` — Fixed vs random effects, lme4 / statsmodels, GEE

### Extras
- `references/index.html` — Textbooks, papers, official statements, tools, tutorial notes
- `biostats-quiz/index.html` — Interactive quiz (under construction)
