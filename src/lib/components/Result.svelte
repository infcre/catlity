<script>
  import Plot3D from './Plot3D.svelte';
  import { calculateScores, findClosest } from '$lib/scoring.js';

  let { answers, questions, characters, onRestart } = $props();

  const scores = $derived(calculateScores(answers, questions));
  const result = $derived(findClosest(scores, characters));
  let ready = $state(false);

  $effect(() => {
    const t = setTimeout(() => (ready = true), 900);
    return () => clearTimeout(t);
  });
</script>

<div class="result">
  {#if !ready}
    <div class="analyzing">
      <div class="pulse">🔮</div>
      <p>正在分析你的猫娘属性……</p>
    </div>
  {:else}
    <div class="reveal">
      <!-- 头部 -->
      <div class="head">
        <span class="sparkle">✨ 经过鉴定 ✨</span>
        <h2>你最像的猫娘是——</h2>
      </div>

      <!-- 角色卡片 -->
      <div class="card">
        <div class="emoji">{result.closest.emoji}</div>
        <h1 class="name">{result.closest.name}</h1>
        <p class="name-en">{result.closest.nameEn}</p>
        <p class="source">
          {result.closest.source}
          <span class="mbti">{result.closest.mbti}</span>
        </p>
        <p class="quote">"{result.closest.quote}"</p>
        <p class="desc">{result.closest.description}</p>
        <div class="traits">
          {#each result.closest.traits as t}
            <span class="tag">{t}</span>
          {/each}
        </div>
      </div>

      <!-- 3D 坐标图 -->
      <div class="section">
        <h3>你的性格坐标</h3>
        <div class="plot-wrap">
          <Plot3D user={scores} character={result.closest} />
        </div>
        <div class="plot-legend">
          <span><i class="dot" style="background:#FF9D76"></i>X: E外向 — I内向</span>
          <span><i class="dot" style="background:#FFB5C2"></i>Y: SF感性 — NT理性</span>
          <span><i class="dot" style="background:#A8D8EA"></i>Z: J计划 — P随性</span>
        </div>
      </div>

      <!-- 排行 -->
      <div class="section">
        <h3>最接近排行</h3>
        {#each result.rankings as r, i}
          <div class="rank" class:first={i === 0}>
            <span class="rnum">#{i + 1}</span>
            <span class="remoji">{r.emoji}</span>
            <span class="rname">{r.name}</span>
            <span class="rsrc">{r.source}</span>
            <span class="rdist">{r.distance.toFixed(1)}</span>
          </div>
        {/each}
      </div>

      <button class="restart" onclick={onRestart}>再来一次 🔄</button>
    </div>
  {/if}
</div>

<style>
  .result { width: 100%; }

  /* 分析 */
  .analyzing { text-align: center; animation: fadeIn 0.6s ease both; }
  .pulse { font-size: 4rem; animation: scale 1s ease-in-out infinite; }
  .analyzing p { margin-top: 1rem; color: var(--color-text-secondary); }

  /* 揭晓 */
  .reveal { animation: fadeUp 0.7s ease both; }

  .head { text-align: center; margin-bottom: 1.5rem; }
  .sparkle { font-size: 0.85rem; letter-spacing: 0.1em; color: var(--color-primary-dark); }
  .head h2 { font-size: 1.5rem; margin-top: 0.3rem; }

  /* 角色卡 */
  .card {
    background: var(--color-bg-card);
    border-radius: 20px;
    padding: 2rem 1.5rem;
    text-align: center;
    box-shadow: 0 4px 24px var(--color-shadow);
    margin-bottom: 1.5rem;
  }
  .emoji { font-size: 5rem; margin-bottom: 0.3rem; }
  .name  { font-size: 2rem; color: var(--color-primary-dark); }
  .name-en { font-size: 0.95rem; color: var(--color-text-secondary); margin-bottom: 0.5rem; }
  .source { font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: 0.75rem; }
  .mbti {
    display: inline-block; padding: 0.15rem 0.6rem;
    background: var(--color-primary-lighter); color: var(--color-primary-dark);
    border-radius: 20px; font-size: 0.8rem; font-weight: 600; margin-left: 0.35rem;
  }
  .quote { font-style: italic; color: var(--color-text-secondary); margin: 0.75rem 0; font-size: 0.95rem; }
  .desc  { font-size: 0.95rem; line-height: 1.6; margin-bottom: 0.75rem; }
  .traits { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
  .tag {
    padding: 0.2rem 0.7rem; background: var(--color-pink);
    border-radius: 20px; font-size: 0.82rem; color: var(--color-text);
  }

  /* 通用 section */
  .section {
    background: var(--color-bg-card); border-radius: 16px;
    padding: 1.25rem 1.25rem 1rem; box-shadow: 0 2px 12px var(--color-shadow);
    margin-bottom: 1.25rem;
  }
  .section h3 { font-size: 1rem; margin-bottom: 0.75rem; text-align: center; color: var(--color-primary-dark); }

  /* 3D 图 */
  .plot-wrap { display: flex; justify-content: center; padding: 0.25rem 0 0.75rem; }
  .plot-legend {
    display: flex; flex-wrap: wrap; gap: 0.6rem 1.2rem; justify-content: center;
    font-size: 0.78rem; color: var(--color-text-secondary);
  }
  .dot {
    display: inline-block; width: 10px; height: 10px; border-radius: 50%;
    vertical-align: middle; margin-right: 3px;
  }

  /* 排行 */
  .rank {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.6rem 0; border-bottom: 1px solid var(--color-bg-bar); font-size: 0.92rem;
  }
  .rank:last-child { border-bottom: none; }
  .rank.first { font-weight: 600; }
  .rnum  { width: 28px; color: var(--color-text-secondary); }
  .remoji { font-size: 1.3rem; }
  .rname  { flex: 1; }
  .rsrc   { color: var(--color-text-secondary); font-size: 0.82rem; }
  .rdist  { color: var(--color-text-secondary); font-size: 0.82rem; min-width: 40px; text-align: right; }

  /* 按钮 */
  .restart {
    display: block; margin: 1.5rem auto 0; padding: 0.75rem 2.25rem;
    font-size: 1rem; font-weight: 600; color: var(--color-primary-dark);
    background: var(--color-primary-lighter); border: 2px solid var(--color-primary-light);
    border-radius: 50px; transition: background 0.2s, transform 0.2s;
  }
  .restart:hover { background: var(--color-primary-light); transform: translateY(-1px); }

  /* 动画 */
  @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
  @keyframes scale  { 0%,100% { transform:scale(1) } 50% { transform:scale(1.2) } }
</style>