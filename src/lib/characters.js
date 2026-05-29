// ============================================================
// 角色数据 —— 坐标范围 0~100
//   x: 0=极I(内向) ~ 100=极E(外向)
//   y: 0=极NT(理性抽象) ~ 100=极SF(感性实用)
//   z: 0=极P(随性) ~ 100=极J(计划)
// ============================================================

export const characters = [
  {
    id: 'chocola',
    name: '巧克力',
    nameEn: 'Chocola',
    emoji: '🍫',
    source: '《猫娘乐园》',
    mbti: 'ESFP',
    x: 90, y: 85, z: 30,
    quote: '喵~主人主人！今天也要元气满满哦！',
    description: '开朗活泼的双胞胎姐姐，对世界充满好奇，永远精力充沛、粘人可爱',
    traits: ['元气满满', '好奇心旺盛', '超级粘人', '乐观积极']
  },
  {
    id: 'vanilla',
    name: '香子兰',
    nameEn: 'Vanilla',
    emoji: '🍦',
    source: '《猫娘乐园》',
    mbti: 'ISTJ',
    x: 20, y: 50, z: 80,
    quote: '……才不是因为担心你才在这里等的',
    description: '冷静沉着的双胞胎妹妹，毒舌但温柔，外冷内热的可靠存在',
    traits: ['冷静毒舌', '外冷内热', '超级可靠', '默默关心']
  },
  {
    id: 'azuki',
    name: '小红豆',
    nameEn: 'Azuki',
    emoji: '🫘',
    source: '《猫娘乐园》',
    mbti: 'ESTP',
    x: 75, y: 35, z: 25,
    quote: '哼！才不是在帮你，只是顺手而已！',
    description: '傲娇好强的大姐头，最小只但最凶，嘴硬心软的行动派',
    traits: ['傲娇担当', '嘴硬心软', '行动力强', '假小子']
  },
  {
    id: 'okayu',
    name: '猫又おかゆ',
    nameEn: 'Okayu',
    emoji: '🍙',
    source: 'Hololive',
    mbti: 'ISFP',
    x: 25, y: 75, z: 30,
    quote: '嗯……再睡五分钟就好……大概……',
    description: '慵懒随和的饭团猫娘，温柔治愈系，热爱美食和赖床',
    traits: ['慵懒治愈', '温柔随和', '吃货属性', '慢悠悠']
  },
  {
    id: 'hinata',
    name: '猫宫ひなた',
    nameEn: 'Hinata',
    emoji: '☀️',
    source: 'Hololive',
    mbti: 'ENFP',
    x: 70, y: 55, z: 45,
    quote: '大家一起唱歌吧！我来起头！',
    description: '元气满满的歌姬猫娘，梦想远大，感染力超强的小太阳',
    traits: ['元气歌姬', '梦想家', '感染力强', '热情洋溢']
  },
  {
    id: 'lynette',
    name: '琳妮特',
    nameEn: 'Lynette',
    emoji: '🫖',
    source: '《原神》',
    mbti: 'INTP',
    x: 20, y: 15, z: 55,
    quote: '……嗯。',
    description: '安静理性的小女仆，面瘫外表下藏着惊人的洞察力，用最少的字说最多的事',
    traits: ['面瘫担当', '理性冷静', '洞察力强', '惜字如金']
  },
  {
    id: 'diona',
    name: '迪奥娜',
    nameEn: 'Diona',
    emoji: '🍸',
    source: '《原神》',
    mbti: 'ESTJ',
    x: 60, y: 50, z: 75,
    quote: '我调的酒才不好喝！……你那什么表情！',
    description: '倔强傲娇的调酒师猫娘，立志毁掉酒行业但天赋点满的矛盾体',
    traits: ['倔强傲娇', '天赋调酒', '有主见', '口是心非']
  }
];