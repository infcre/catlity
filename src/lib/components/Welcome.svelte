<script>
  let { onStart } = $props();
</script>

<div class="welcome">
  <div class="logo">🐱</div>
  <h1>猫娘性格测试</h1>
  <p class="sub">回答一些小问题，测测你最像哪只猫娘</p>
  <div class="meta">
    <span>📝 26 道题</span>
    <span>⏱ 约 3 分钟</span>
  </div>
  <button class="start-btn" onclick={onStart}>开始测试</button>
</div>

<style>
  .welcome {
    text-align: center;
    animation: fadeUp 0.8s ease both;
  }
  .logo {
    font-size: 4.5rem;
    margin-bottom: 0.75rem;
    animation: bounce 2s ease-in-out infinite;
  }
  h1 {
    font-size: 2rem;
    color: var(--color-primary-dark);
    margin-bottom: 0.5rem;
  }
  .sub {
    color: var(--color-text-secondary);
    margin-bottom: 1.5rem;
  }
  .meta {
    display: flex;
    gap: 2rem;
    justify-content: center;
    margin-bottom: 2.5rem;
    font-size: 0.9rem;
    color: var(--color-text-secondary);
  }
  .start-btn {
    padding: 1rem 3rem;
    font-size: 1.15rem;
    font-weight: 700;
    color: #fff;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
    border-radius: 50px;
    box-shadow: 0 4px 18px var(--color-shadow);
    transition: transform 0.25s, box-shadow 0.25s;
  }
  .start-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px var(--color-shadow);
  }
  .start-btn:active {
    transform: translateY(0);
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>