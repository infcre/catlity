<script>
  let { questions, onComplete } = $props();

  let idx = $state(0);
  let answers = $state([]);
  let picked = $state(null);
  let locking = $state(false);

  const total = $derived(questions.length);
  const q = $derived(questions[idx]);
  const progress = $derived((idx / total) * 100);

  function choose(key) {
    if (locking || picked) return;
    picked = key;
    locking = true;
    answers[idx] = key;

    setTimeout(() => {
      if (idx < total - 1) {
        idx++;
        picked = null;
      } else {
        onComplete([...answers]);
      }
      locking = false;
    }, 420);
  }
</script>

<div class="quiz">
  <div class="bar-wrap">
    <div class="bar-fill" style="width: {progress}%"></div>
  </div>
  <div class="count">{idx + 1} / {total}</div>

  <div class="card-area">
    {#key idx}
      <div class="card">
        <p class="q-text">{q.text}</p>
        <div class="opts">
          {#each q.options as opt}
            <button
              class="opt"
              class:active={picked === opt.key}
              class:dim={picked && picked !== opt.key}
              onclick={() => choose(opt.key)}
            >
              <span class="key">{opt.key}</span>
              <span class="txt">{opt.text}</span>
            </button>
          {/each}
        </div>
      </div>
    {/key}
  </div>
</div>

<style>
  .quiz { width: 100%; }

  .bar-wrap {
    height: 6px;
    background: var(--color-bg-bar);
    border-radius: 3px;
    overflow: hidden;
  }
  .bar-fill {
    height: 100%;
    background: var(--color-primary);
    border-radius: 3px;
    transition: width 0.35s ease;
  }
  .count {
    text-align: right;
    font-size: 0.8rem;
    color: var(--color-text-secondary);
    margin: 0.4rem 0 1.8rem;
  }

  .card-area {
    min-height: 340px;
  }

  /* ✅ 关键：只用 CSS 动画，不同时存在两个元素 */
  .card {
    animation: slideIn 0.25s ease-out;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .q-text {
    font-size: 1.15rem;
    font-weight: 600;
    line-height: 1.65;
    margin-bottom: 1.5rem;
  }

  .opts { display: flex; flex-direction: column; gap: 0.75rem; }

  .opt {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem 1.15rem;
    background: var(--color-bg-card);
    border: 2px solid transparent;
    border-radius: 14px;
    text-align: left;
    font-size: 0.98rem;
    line-height: 1.55;
    color: var(--color-text);
    transition: border-color 0.2s, transform 0.15s, opacity 0.2s, background 0.2s;
    width: 100%;
  }
  .opt:hover {
    border-color: var(--color-primary-light);
    transform: translateY(-1px);
  }
  .opt.active {
    border-color: var(--color-primary);
    background: var(--color-primary-lighter);
  }
  .opt.dim { opacity: 0.45; }

  .key {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px; height: 26px;
    border-radius: 50%;
    background: var(--color-primary-light);
    color: var(--color-primary-dark);
    font-weight: 700;
    font-size: 0.8rem;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .txt { flex: 1; }
</style>