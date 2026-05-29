// ============================================================
// 题目数据 —— 修改这里即可调整题目
// ============================================================
// type: 'scored' = 计分题, 'flavor' = 猫娘体验题（不计分）
// dimension: 'x' = E/I外向性, 'y' = SF/NT认知风格, 'z' = J/P生活方式
// scored 题中，选项 A 始终代表该维度的"高分"方向：
//   x: A=E(高) B=I(低)
//   y: A=SF(高) B=NT(低)
//   z: A=J(高)  B=P(低)

export const questions = [

  // ──── E/I × 2 ────
  {
    id: 'Q1', type: 'scored', dimension: 'x',
    text: '周末的社交活动结束后，你通常——',
    options: [
      { key: 'A', text: '感觉更兴奋了，回家路上还在回味刚才的聊天' },
      { key: 'B', text: '虽然开心但感觉被消耗了，想一个人待一会儿' }
    ]
  },
  {
    id: 'Q2', type: 'scored', dimension: 'x',
    text: '到了全是陌生人的场合，你更倾向于——',
    options: [
      { key: 'A', text: '主动找人搭话，聊起来就不紧张了' },
      { key: 'B', text: '先在边上观察，等有人来找你再说' }
    ]
  },

  // ──── 体验 ────
  {
    id: 'F1', type: 'flavor',
    text: '假如有一天你醒来发现自己变成了猫娘，你首先会？',
    options: [
      { key: 'A', text: '照镜子，好好欣赏自己的猫耳和尾巴' },
      { key: 'B', text: '认真研究——猫娘到底有几对耳朵？原来的耳朵还在吗？' }
    ]
  },

  // ──── E/I × 1 ────
  {
    id: 'Q3', type: 'scored', dimension: 'x',
    text: '很久没见的朋友突然约你出来，你的反应是——',
    options: [
      { key: 'A', text: '超开心，恨不得把最近发生的事全说一遍' },
      { key: 'B', text: '心里挺高兴，但见面后不太会主动倾诉，慢慢聊就好' }
    ]
  },

  // ──── SF/NT × 2 ────
  {
    id: 'Q4', type: 'scored', dimension: 'y',
    text: '你更享受哪类内容？',
    options: [
      { key: 'A', text: '美食探店、旅行vlog、生活记录、实用教程' },
      { key: 'B', text: '科幻/推理作品、深度解析、抽象概念讨论' }
    ]
  },

  // ──── 体验 ────
  {
    id: 'F2', type: 'flavor',
    text: '变成猫娘后，你发现你的尾巴会——',
    options: [
      { key: 'A', text: '诚实暴露你的情绪——开心时疯狂摇摆，社死时直接炸毛' },
      { key: 'B', text: '总在你发呆时偷偷卷住旁边人的手臂' }
    ]
  },

  {
    id: 'Q5', type: 'scored', dimension: 'y',
    text: '朋友向你倾诉烦恼时，你更倾向于——',
    options: [
      { key: 'A', text: '先关心他的感受，陪伴他，帮他做一些实际的事' },
      { key: 'B', text: '帮他分析问题出在哪里，一起想想怎么解决' }
    ]
  },
  {
    id: 'Q6', type: 'scored', dimension: 'y',
    text: '以下两种能力，你更想拥有哪个？',
    options: [
      { key: 'A', text: '敏锐感受到别人的情绪，让身边的人都觉得被理解' },
      { key: 'B', text: '快速看透复杂事物的底层逻辑和规律' }
    ]
  },

  // ──── 体验 ────
  {
    id: 'F3', type: 'flavor',
    text: '作为猫娘，你最不能忍的是——',
    options: [
      { key: 'A', text: '路过鱼摊根本走不动道，太丢人了但控制不住' },
      { key: 'B', text: '看到光斑就想伸手去抓，不管场合合不合适' }
    ]
  },

  // ──── J/P × 2 ────
  {
    id: 'Q7', type: 'scored', dimension: 'z',
    text: '出门旅行前，你通常——',
    options: [
      { key: 'A', text: '提前做好攻略，订好住宿，规划好每天的路线' },
      { key: 'B', text: '大概看看有哪些好玩的，到了再随机应变' }
    ]
  },
  {
    id: 'Q8', type: 'scored', dimension: 'z',
    text: '你的桌面/房间通常——',
    options: [
      { key: 'A', text: '比较整洁有序，东西都有固定位置' },
      { key: 'B', text: '比较随意，可能有点乱但你自己能找到' }
    ]
  },

  // ──── 体验 ────
  {
    id: 'F4', type: 'flavor',
    text: '猫娘的你面前放了一杯牛奶和一杯咖啡，你会——',
    options: [
      { key: 'A', text: '毫不犹豫拿起牛奶——这是本能，不接受反驳' },
      { key: 'B', text: '伸手想拿咖啡，但身体不受控制地转向了牛奶' }
    ]
  },

  {
    id: 'Q9', type: 'scored', dimension: 'z',
    text: '面对一个下周截止的任务，你通常——',
    options: [
      { key: 'A', text: '现在就开始做，提前几天完成才安心' },
      { key: 'B', text: '先放着，等到最后几天压力上来了再冲刺' }
    ]
  },

  // ──── E/I × 3 ────
  {
    id: 'Q10', type: 'scored', dimension: 'x',
    text: '发朋友圈/社交媒体，你通常——',
    options: [
      { key: 'A', text: '经常发，和朋友互评点赞本身就很快乐' },
      { key: 'B', text: '很少发，发之前要想半天措辞，有时编辑完又删了' }
    ]
  },

  // ──── 体验 ────
  {
    id: 'F5', type: 'flavor',
    text: '猫娘的你发现自己有个隐藏技能：',
    options: [
      { key: 'A', text: '能在任何奇怪的地方秒睡——纸箱里、键盘上、鞋盒里都行' },
      { key: 'B', text: '能精准目测一个容器能不能把自己塞进去' }
    ]
  },

  {
    id: 'Q11', type: 'scored', dimension: 'x',
    text: '一群人出去玩，你更倾向于当——',
    options: [
      { key: 'A', text: '组织者或气氛担当，喜欢带节奏' },
      { key: 'B', text: '安静的参与者，听大家聊，适时附和几句' }
    ]
  },
  {
    id: 'Q12', type: 'scored', dimension: 'x',
    text: '你觉得理想的周末是——',
    options: [
      { key: 'A', text: '约几个朋友出去逛逛吃吃，有人一起才开心' },
      { key: 'B', text: '在家看书/打游戏/追剧，一整天不社交也很好' }
    ]
  },

  // ──── 体验 ────
  {
    id: 'F6', type: 'flavor',
    text: '你的猫耳突然在公共场合竖起来了，你——',
    options: [
      { key: 'A', text: '赶紧用手捂住，假装头疼' },
      { key: 'B', text: '假装什么都没发生，但耳朵完全不受控地跟着声源转' }
    ]
  },

  // ──── SF/NT × 3 ────
  {
    id: 'Q13', type: 'scored', dimension: 'y',
    text: '看一部电影时，你更容易注意到——',
    options: [
      { key: 'A', text: '演员的微表情、场景氛围、配乐带来的情绪' },
      { key: 'B', text: '剧情的逻辑结构、隐喻符号、导演想表达的主题' }
    ]
  },
  {
    id: 'Q14', type: 'scored', dimension: 'y',
    text: '做一个重要决定时，你更依赖——',
    options: [
      { key: 'A', text: '直觉和当时的感觉——"就是觉得该这样"' },
      { key: 'B', text: '列出利弊清单，理性分析完再拍板' }
    ]
  },

  // ──── 体验 ────
  {
    id: 'F7', type: 'flavor',
    text: '看到一个纸箱，你会——',
    options: [
      { key: 'A', text: '二话不说钻进去，不管箱子有多小' },
      { key: 'B', text: '先绕着箱子转一圈闻一闻，确认安全再钻' }
    ]
  },

  {
    id: 'Q15', type: 'scored', dimension: 'y',
    text: '什么话题可以让你越聊越起劲？',
    options: [
      { key: 'A', text: '身边发生的事、认识的人、最近的生活体验' },
      { key: 'B', text: '一个有趣的理论、脑洞假设、某个领域的深度问题' }
    ]
  },

  // ──── J/P × 3 ────
  {
    id: 'Q16', type: 'scored', dimension: 'z',
    text: '突然多出一个完全空闲的下午，你会——',
    options: [
      { key: 'A', text: '列一个"想做的事"清单，挑一件开始执行' },
      { key: 'B', text: '什么都不规划，当下想干嘛就干嘛' }
    ]
  },
  {
    id: 'Q17', type: 'scored', dimension: 'z',
    text: '去超市买东西，你通常——',
    options: [
      { key: 'A', text: '提前列好购物清单，照着清单买' },
      { key: 'B', text: '随便逛逛，看到什么想买的就丢进购物车' }
    ]
  },

  // ──── 体验 ────
  {
    id: 'F8', type: 'flavor',
    text: '作为猫娘，你最想对人类说——',
    options: [
      { key: 'A', text: '"摸头可以，但要先经过我同意！……不过这次就算了"' },
      { key: 'B', text: '"凌晨三点跑酷是我的基本权利，请尊重猫娘的文化传统"' }
    ]
  },

  {
    id: 'Q18', type: 'scored', dimension: 'z',
    text: '你的手机相册/文件——',
    options: [
      { key: 'A', text: '有分类有相册，定期整理' },
      { key: 'B', text: '从来不整理，要找东西就靠搜索' }
    ]
  }
];