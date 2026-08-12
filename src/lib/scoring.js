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

  // ✅ 中心是 0，范围 -50 ~ +50
  return {
    x: counts.x ? (sums.x / counts.x) * 100 - 50 : 0,
    y: counts.y ? (sums.y / counts.y) * 100 - 50 : 0,
    z: counts.z ? (sums.z / counts.z) * 100 - 50 : 0
  };
}

function dist(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

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