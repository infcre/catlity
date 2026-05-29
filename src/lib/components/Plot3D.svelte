<script>
  import { onMount } from 'svelte';

  let { user, character } = $props();

  let canvas;
  let ready = false;
  const W = 340, H = 280, DPR = 2;
  const RY = 0.6, RX = -0.5;

  function proj(px, py, pz) {
    const x = (px - 50) / 50;
    const y = (py - 50) / 50;
    const z = (pz - 50) / 50;

    const x1 = x * Math.cos(RY) + z * Math.sin(RY);
    const z1 = -x * Math.sin(RY) + z * Math.cos(RY);
    const y1 = y * Math.cos(RX) - z1 * Math.sin(RX);
    const z2 = y * Math.sin(RX) + z1 * Math.cos(RX);

    const S = Math.min(W, H) * 0.33;
    return { x: W / 2 + x1 * S, y: H / 2 - y1 * S, z: z2 };
  }

  // 正方体 8 个角
  const V = [
    [0,0,0],     [100,0,0],   [0,100,0],   [0,0,100],
    [100,100,0], [100,0,100], [0,100,100], [100,100,100]
  ];

  // 正方体 12 条棱
  const CUBE_EDGES = [
    [0,1],[0,2],[0,3],
    [1,4],[1,5],[2,4],[2,6],[3,5],[3,6],
    [4,7],[5,7],[6,7]
  ];

  // ✅ 三条主轴：穿过中心 (50,50,50)，从一面中心到对面中心
  const AXES = [
    { from: [0,50,50],   to: [100,50,50],  color:'#FF9D76', la:'I 内向',  lb:'E 外向' },
    { from: [50,0,50],   to: [50,100,50],  color:'#FFB5C2', la:'NT 理性', lb:'SF 感性' },
    { from: [50,50,0],   to: [50,50,100],  color:'#A8D8EA', la:'P 随性',  lb:'J 计划'  }
  ];

  function draw() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = 'round';

    // 投影所有角
    const pv = V.map(v => proj(v[0], v[1], v[2]));

    // ── 正方体棱线（浅色参考框架）──
    for (const [i, j] of CUBE_EDGES) {
      const a = pv[i], b = pv[j];
      const avgZ = (a.z + b.z) / 2;
      const t = (avgZ + 1) / 2;
      ctx.strokeStyle = `rgba(180,170,160,${0.08 + t * 0.2})`;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }

    // ── 三条主轴（穿过中心）──
    const center = proj(50, 50, 50);
    for (const ax of AXES) {
      const pa = proj(...ax.from);
      const pb = proj(...ax.to);

      ctx.strokeStyle = ax.color;
      ctx.lineWidth = 2.5;
      ctx.globalAlpha = 0.85;
      ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke();
      ctx.globalAlpha = 1;

      // 端点圆
      for (const p of [pa, pb]) {
        ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = ax.color; ctx.fill();
      }

      // 标签（沿轴方向外推）
      ctx.font = 'bold 11px -apple-system, sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = ax.color;
      const off = 20;
      for (const [p, txt] of [[pa, ax.la], [pb, ax.lb]]) {
        const dx = p.x - center.x, dy = p.y - center.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        ctx.fillText(txt, p.x + (dx / len) * off, p.y + (dy / len) * off);
      }
    }

    // ── 中心点 ──
    ctx.beginPath(); ctx.arc(center.x, center.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ccc'; ctx.fill();

    // ── 数据点 ──
    const u = proj(user.x, user.y, user.z);
    const c = proj(character.x, character.y, character.z);

    ctx.setLineDash([5, 5]); ctx.lineWidth = 1.2;
    ctx.strokeStyle = 'rgba(255,157,118,0.4)';
    ctx.beginPath(); ctx.moveTo(center.x, center.y); ctx.lineTo(u.x, u.y); ctx.stroke();
    ctx.strokeStyle = 'rgba(220,170,180,0.45)';
    ctx.beginPath(); ctx.moveTo(center.x, center.y); ctx.lineTo(c.x, c.y); ctx.stroke();
    ctx.setLineDash([]);

    // 用户点
    ctx.beginPath(); ctx.arc(u.x, u.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#FF9D76'; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5; ctx.stroke();

    // 角色点
    ctx.beginPath(); ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD6E0'; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5; ctx.stroke();

    // 点标签
    ctx.font = 'bold 12px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#D4734E'; ctx.fillText('你', u.x, u.y - 16);
    ctx.fillStyle = '#B87080'; ctx.fillText(character.name, c.x, c.y - 16);
  }

  onMount(() => {
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ready = true;
    draw();
  });

  $effect(() => {
    user; character;
    if (ready) draw();
  });
</script>

<canvas bind:this={canvas}></canvas>