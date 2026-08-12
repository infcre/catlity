<script>
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	let { children } = $props();

	// 初始主题由 app.html 的内联脚本在 HTML 解析时已应用到 <html>,
	// 这里只需在挂载后同步到状态(避免闪烁和顺序问题)
	let theme = $state('light');

	onMount(() => {
		theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.dataset.theme = theme;
		try {
			localStorage.setItem('catlity-theme', theme);
		} catch (e) {}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<button class="theme-toggle" onclick={toggleTheme} aria-label="切换明暗模式" title="切换明暗模式">
	{theme === 'dark' ? '☀️' : '🌙'}
</button>

{@render children()}

<style>
	.theme-toggle {
		position: fixed;
		top: 1rem;
		right: 1rem;
		z-index: 10001; /* 在 CRT 扫描线 (10000) 之上 */
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		font-size: 1.15rem;
		background: var(--color-bg-card);
		border: 2px solid var(--color-primary-light);
		box-shadow: 0 2px 10px var(--color-shadow);
		transition: transform 0.2s;
	}
	.theme-toggle:hover {
		transform: translateY(-2px);
	}
</style>
