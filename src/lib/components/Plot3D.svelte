<script>
	import { onMount } from 'svelte';

	let { user, characters } = $props();

	let canvas;
	let ready = false;
	const W = 340,
		H = 280,
		DPR = 2;

	// ✅ 交互式视角：az = 绕 Z 轴旋转，el = 仰角
	// 初始值沿用原来的 (0.6, 0.5)，之后可拖拽旋转、双击复位
	let az = $state(0.6);
	let el = $state(0.5);
	let dragging = $state(false);

	// 仰角限制在 5°~83°，避免平视退化或完全俯视
	const EL_MIN = 0.09,
		EL_MAX = 1.45;
	const DRAG_K = 0.008; // 拖拽灵敏度 rad/px

	let lastX = 0,
		lastY = 0;

	function proj(px, py, pz) {
		const CAZ = Math.cos(az),
			SAZ = Math.sin(az);
		const CEL = Math.cos(el),
			SEL = Math.sin(el);
		const x = px / 50,
			y = py / 50,
			z = pz / 50;

		// 绕 Z 轴旋转（水平转视角）
		const x1 = x * CAZ - y * SAZ;
		const y1 = x * SAZ + y * CAZ;

		// 投影：x1→屏幕X，z(上) 和 y1(纵深) 组合→屏幕Y
		const sx = x1;
		const sy = z * CEL - y1 * SEL;
		const depth = z * SEL + y1 * CEL;

		const S = Math.min(W, H) * 0.27;
		return { x: W / 2 + sx * S, y: H / 2 - sy * S, z: depth };
	}

	function seg(ctx, a, b) {
		ctx.beginPath();
		ctx.moveTo(a.x, a.y);
		ctx.lineTo(b.x, b.y);
		ctx.stroke();
	}

	// ✅ 立方体 ±50
	const V = [
		[-50, -50, -50],
		[50, -50, -50],
		[-50, 50, -50],
		[-50, -50, 50],
		[50, 50, -50],
		[50, -50, 50],
		[-50, 50, 50],
		[50, 50, 50]
	];
	const CE = [
		[0, 1],
		[0, 2],
		[0, 3],
		[1, 4],
		[1, 5],
		[2, 4],
		[2, 6],
		[3, 5],
		[3, 6],
		[4, 7],
		[5, 7],
		[6, 7]
	];

	// ✅ 主轴穿过原点 (0,0,0)
	const AXES = [
		{ from: [-50, 0, 0], to: [50, 0, 0], color: '#FF9D76', la: 'I 内向', lb: 'E 外向' },
		{ from: [0, -50, 0], to: [0, 50, 0], color: '#FFB5C2', la: 'NT 理性', lb: 'SF 感性' },
		{ from: [0, 0, -50], to: [0, 0, 50], color: '#A8D8EA', la: 'P 随性', lb: 'J 计划' }
	];

	// ✅ 只对 XY 平面 (Z=0) 作垂线
	function drawGuides(ctx, ptScreen, raw, color) {
		const [px, py] = raw;
		const o = proj(0, 0, 0);
		const foot = proj(px, py, 0);

		ctx.strokeStyle = color;
		ctx.lineWidth = 1;
		ctx.setLineDash([4, 4]);
		seg(ctx, ptScreen, foot); // 垂线：点 → XY平面
		seg(ctx, foot, o); // 垂足 → 原点
		ctx.setLineDash([]);

		ctx.beginPath();
		ctx.arc(foot.x, foot.y, 2.5, 0, Math.PI * 2);
		ctx.fillStyle = color;
		ctx.fill();
	}

	function draw() {
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
		ctx.clearRect(0, 0, W, H);
		ctx.lineCap = 'round';

		const pv = V.map((v) => proj(v[0], v[1], v[2]));
		const maxZ = Math.max(...pv.map((p) => Math.abs(p.z))) || 1;

		// 正方体棱线（近亮远淡）
		for (const [i, j] of CE) {
			const a = pv[i],
				b = pv[j];
			const t = ((a.z + b.z) / 2 / maxZ + 1) / 2;
			ctx.strokeStyle = `rgba(180,170,160,${(0.06 + t * 0.22).toFixed(2)})`;
			ctx.lineWidth = 1;
			seg(ctx, a, b);
		}

		// 主轴 + 标签
		const center = proj(0, 0, 0);
		for (const ax of AXES) {
			const pa = proj(...ax.from),
				pb = proj(...ax.to);
			ctx.strokeStyle = ax.color;
			ctx.lineWidth = 2.5;
			ctx.globalAlpha = 0.85;
			seg(ctx, pa, pb);
			ctx.globalAlpha = 1;

			for (const p of [pa, pb]) {
				ctx.beginPath();
				ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
				ctx.fillStyle = ax.color;
				ctx.fill();
			}

			ctx.font = 'bold 11px -apple-system, sans-serif';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = ax.color;
			const off = 20;
			for (const [p, txt] of [
				[pa, ax.la],
				[pb, ax.lb]
			]) {
				const dx = p.x - center.x,
					dy = p.y - center.y;
				const len = Math.sqrt(dx * dx + dy * dy) || 1;
				ctx.fillText(txt, p.x + (dx / len) * off, p.y + (dy / len) * off);
			}
		}

		// 原点
		ctx.beginPath();
		ctx.arc(center.x, center.y, 4, 0, Math.PI * 2);
		ctx.fillStyle = '#ccc';
		ctx.fill();

		// 垂线 + 垂足(只给用户和第 1 名,避免太乱)
		const u = proj(user.x, user.y, user.z);
		const pts = characters.map((ch) => ({ ...ch, p: proj(ch.x, ch.y, ch.z) }));
		drawGuides(ctx, u, [user.x, user.y, user.z], 'rgba(255,157,118,0.25)');
		if (pts[0]) {
			drawGuides(ctx, pts[0].p, [pts[0].x, pts[0].y, pts[0].z], 'rgba(220,170,180,0.28)');
		}

		// 数据点:你(橙) + 前 3 名猫娘(粉/绿/黄)
		ctx.beginPath();
		ctx.arc(u.x, u.y, 8, 0, Math.PI * 2);
		ctx.fillStyle = '#FF9D76';
		ctx.fill();
		ctx.strokeStyle = '#fff';
		ctx.lineWidth = 2.5;
		ctx.stroke();

		const POINT_STYLE = [
			{ fill: '#FFD6E0', label: '#B87080' },
			{ fill: '#B8E6B8', label: '#4E8A5E' },
			{ fill: '#FFE9A8', label: '#9C7A2E' }
		];
		pts.forEach((pt, i) => {
			const st = POINT_STYLE[i % POINT_STYLE.length];
			ctx.beginPath();
			ctx.arc(pt.p.x, pt.p.y, 8, 0, Math.PI * 2);
			ctx.fillStyle = st.fill;
			ctx.fill();
			ctx.strokeStyle = '#fff';
			ctx.lineWidth = 2.5;
			ctx.stroke();
		});

		// 点标签
		ctx.font = 'bold 12px -apple-system, sans-serif';
		ctx.textAlign = 'center';
		ctx.fillStyle = '#D4734E';
		ctx.fillText('你', u.x, u.y - 16);
		pts.forEach((pt, i) => {
			const st = POINT_STYLE[i % POINT_STYLE.length];
			ctx.fillStyle = st.label;
			ctx.fillText(pt.name, pt.p.x, pt.p.y - 16);
		});
	}

	onMount(() => {
		canvas.width = W * DPR;
		canvas.height = H * DPR;
		canvas.style.width = `${W}px`;
		canvas.style.height = `${H}px`;
		ready = true;
		draw();
	});

	// ─── 拖拽旋转 ───
	function onPointerDown(e) {
		dragging = true;
		lastX = e.clientX;
		lastY = e.clientY;
		canvas.setPointerCapture(e.pointerId);
		e.preventDefault();
	}

	function onPointerMove(e) {
		if (!dragging) return;
		const dx = e.clientX - lastX;
		const dy = e.clientY - lastY;
		lastX = e.clientX;
		lastY = e.clientY;
		az += dx * DRAG_K;
		el = Math.min(EL_MAX, Math.max(EL_MIN, el - dy * DRAG_K));
	}

	function onPointerUp() {
		dragging = false;
	}

	function onDoubleClick() {
		az = 0.6;
		el = 0.5;
	}

	$effect(() => {
		user;
		characters;
		az;
		el;
		if (ready) draw();
	});
</script>

<div class="plot-box">
	<canvas
		bind:this={canvas}
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onpointercancel={onPointerUp}
		ondblclick={onDoubleClick}
		class:dragging
	></canvas>
	<div class="hint">🖱 拖拽旋转 · 双击复位</div>
</div>

<style>
	canvas {
		display: block;
		margin: 0 auto;
		touch-action: none; /* 触屏拖拽时不触发页面滚动 */
		cursor: grab;
	}
	canvas.dragging {
		cursor: grabbing;
	}
	.hint {
		text-align: center;
		font-size: 0.72rem;
		color: var(--color-text-secondary);
		margin-top: 0.35rem;
		user-select: none;
	}
</style>
