/**
 * 计算用户三维坐标
 * 答 A 计 1 分，答 B 计 0 分，最终 / 题数 × 100
 */
export function calculateScores(answers, questions) {
  const sums = { x: 0, y: 0, z: 0 };
  const counts = { x: 0, y: 0, z: 0 };

  questions.forEach((q, i) => {
    if (q.type !== 'scored') return;
    const ans = answers[i];
    if (!ans) return;
    sums[q.dimension] += ans === 'A' ? 1 : 0;
    counts[q.dimension]++;
  });

  return {
    x: counts.x ? (sums.x / counts.x) * 100 : 50,
    y: counts.y ? (sums.y / counts.y) * 100 : 50,
    z: counts.z ? (sums.z / counts.z) * 100 : 50
  };
}

/**
 * 欧氏距离
 */
function dist(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

/**
 * 找到最接近的 N 个角色
 */
export function findClosest(scores, characters, topN = 3) {
  const ranked = characters
    .map(c => ({ ...c, distance: dist(scores, c) }))
    .sort((a, b) => a.distance - b.distance);

  return {
    closest: ranked[0],
    secondClosest: ranked[1],
    rankings: ranked.slice(0, topN)
  };
}