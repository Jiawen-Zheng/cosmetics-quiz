import { Question } from '@/types/question'

// 获取本地图片路径
const getLocalImage = (id: number) => {
  return `/images/product-${id}.png`
}

export const questions: Question[] = [
  // ===== 产品类型识别题（35题）=====
  
  {
    id: 1,
    image: getLocalImage(1),
    question: '这是什么化妆品？',
    options: ['BB霜', '粉底液', 'CC霜', '素颜霜'],
    correctAnswer: 1, // B
    explanation: '粉底液是液体状的底妆产品，用于均匀肤色和遮盖瑕疵'
  },
  {
    id: 2,
    image: getLocalImage(2),
    question: '这是什么化妆品？',
    options: ['粉底膏', '高光膏', '遮瑕膏', '腮红膏'],
    correctAnswer: 2, // C
    explanation: '遮瑕膏用于遮盖面部瑕疵、黑眼圈和痘印'
  },
  {
    id: 3,
    image: getLocalImage(3),
    question: '这是什么化妆品？',
    options: ['口红', '润唇膏', '唇蜜', '唇釉'],
    correctAnswer: 3, // D
    explanation: '唇釉质地轻薄，光泽度高，介于口红和唇彩之间'
  },
  {
    id: 4,
    image: getLocalImage(4),
    question: '这是什么化妆品？',
    options: ['眼影盘', '腮红盘', '修容盘', '彩妆盘'],
    correctAnswer: 0, // A
    explanation: '眼影盘包含多个颜色，用于眼部彩妆'
  },
  {
    id: 5,
    image: getLocalImage(5),
    question: '这是什么化妆品？',
    options: ['眉笔', '眼线笔', '睫毛膏', '眉膏'],
    correctAnswer: 2, // C
    explanation: '睫毛膏用于增加睫毛的浓密度和长度'
  },
  {
    id: 6,
    image: getLocalImage(6),
    question: '这是什么化妆品？',
    options: ['眼线笔', '眉笔', '眉粉笔', '砍刀眉笔'],
    correctAnswer: 1, // B
    explanation: '眉笔用于描绘和填充眉毛，使眉形更清晰'
  },
  {
    id: 7,
    image: getLocalImage(7),
    question: '这是什么化妆品？',
    options: ['内眼线笔', '眉笔', '卧蚕笔', '眼线笔'],
    correctAnswer: 3, // D
    explanation: '眼线笔用于描绘眼线，使眼睛更有神'
  },
  {
    id: 8,
    image: getLocalImage(8),
    question: '这是什么化妆品？',
    options: ['眼线笔', '眉刷', '染眉膏', '眼线膏'],
    correctAnswer: 3, // D
    explanation: '眼线膏，用刷具描画眼线，线条流畅，妆效持久'
  },
  {
    id: 9,
    image: getLocalImage(9),
    question: '这是什么化妆品？',
    options: ['修容粉', '腮红', '眼影', '蜜粉'],
    correctAnswer: 1, // B
    explanation: '腮红用于增添面部气色，打造红润感'
  },
  {
    id: 10,
    image: getLocalImage(10),
    question: '这是什么化妆品？',
    options: ['珠光眼影', '鼻影粉', '高光', '提亮粉'],
    correctAnswer: 2, // C
    explanation: '高光用于提亮面部高点，增加立体感'
  },
  {
    id: 11,
    image: getLocalImage(11),
    question: '这是什么化妆品？',
    options: ['修容粉', '阴影粉', '轮廓粉', '散粉'],
    correctAnswer: 0, // A
    explanation: '修容粉用于打造面部阴影，增强轮廓感'
  },
  {
    id: 12,
    image: getLocalImage(12),
    question: '这是什么化妆品？',
    options: ['粉饼', '控油粉', '散粉', '修容粉'],
    correctAnswer: 2, // C
    explanation: '散粉（又称蜜粉、定妆粉）用于定妆控油，使妆容更持久'
  },
  {
    id: 13,
    image: getLocalImage(13),
    question: '这是什么化妆品？',
    options: ['气垫粉底', '粉底霜', '粉饼', '遮瑕'],
    correctAnswer: 2, // C
    explanation: '粉饼是压缩成饼状的粉底，便于携带和补妆'
  },
  {
    id: 14,
    image: getLocalImage(14),
    question: '这是什么化妆品？',
    options: ['粉饼', '气垫粉底', '散粉', '遮瑕'],
    correctAnswer: 1, // B
    explanation: '气垫粉底是海绵气垫中含有粉底液的产品，便于补妆'
  },
  {
    id: 15,
    image: getLocalImage(15),
    question: '这是什么化妆品？',
    options: ['防晒霜', '洗面奶', '妆前乳', '素颜霜'],
    correctAnswer: 2, // C
    explanation: '妆前乳在底妆前使用，帮助妆容更服帖持久'
  },
  {
    id: 16,
    image: getLocalImage(16),
    question: '这是什么化妆品？',
    options: ['防晒乳', '素颜霜', 'BB霜', '隔离霜'],
    correctAnswer: 3, // D
    explanation: '隔离霜用于隔离彩妆和外界污染，保护肌肤'
  },
  {
    id: 17,
    image: getLocalImage(17),
    question: '这是什么化妆品？',
    options: ['唇线笔', '唇刷', '眉笔', '眼线笔'],
    correctAnswer: 0, // A
    explanation: '唇线笔用于勾勒唇形，防止口红晕染'
  },
  {
    id: 18,
    image: getLocalImage(18),
    question: '这是什么化妆品？',
    options: ['液体眉笔', '眉胶', '睫毛膏', '染眉膏'],
    correctAnswer: 3, // D
    explanation: '染眉膏用于改变眉毛颜色，使眉毛更自然'
  },
  {
    id: 19,
    image: getLocalImage(19),
    question: '这是什么化妆品？',
    options: ['眼影', '眉粉', '鼻影', '阴影盘'],
    correctAnswer: 1, // B
    explanation: '眉粉用于填充眉毛，打造自然雾面眉妆'
  },
  {
    id: 20,
    image: getLocalImage(20),
    question: '这是什么化妆品？',
    options: ['卧蚕笔', '眉笔', '眼线笔', '眼影笔'],
    correctAnswer: 0, // A
    explanation: '卧蚕笔用于打造卧蚕效果，使眼睛更有神'
  },
  {
    id: 21,
    image: getLocalImage(21),
    question: '这是什么护肤品？',
    options: ['卸妆乳', '洁面乳', '按摩膏', '防晒霜'],
    correctAnswer: 1, // B
    explanation: '洁面乳是乳状质地的清洁产品，温和清洁面部'
  },
  {
    id: 22,
    image: getLocalImage(22),
    question: '这是什么护肤品？',
    options: ['眼霜', '面霜', '爽肤水', '肌底液'],
    correctAnswer: 2, // C
    explanation: '爽肤水（又称化妆水、柔肤水）在洁面后使用，二次清洁并补水'
  },
  {
    id: 23,
    image: getLocalImage(23),
    question: '这是什么护肤品？',
    options: ['洁面乳', '精华液', '卸妆油', '安瓶'],
    correctAnswer: 1, // B
    explanation: '精华液含有高浓度活性成分，针对性护理肌肤'
  },
  {
    id: 24,
    image: getLocalImage(24),
    question: '这是什么护肤品？',
    options: ['面霜', '乳液', '凝露', '卸妆油'],
    correctAnswer: 3, // D
    explanation: '卸妆油呈油状，用于卸妆'
  },
  {
    id: 25,
    image: getLocalImage(25),
    question: '这是什么护肤品？',
    options: ['眼霜', '面霜', '妆前乳', '护手霜'],
    correctAnswer: 0, // A
    explanation: '针对眼周肌肤，保湿、抗皱、淡黑眼圈、去浮肿。'
  },
  {
    id: 26,
    image: getLocalImage(26),
    question: '这是什么护肤品？',
    options: ['眼霜', '身体乳', '面霜', '精华'],
    correctAnswer: 2, // C
    explanation: '用于全脸，基础保湿、修护屏障或抗老'
  },
  {
    id: 27,
    image: getLocalImage(27),
    question: '这是什么护肤品？',
    options: ['泥膜', '涂抹面膜', '面膜', '冻膜'],
    correctAnswer: 2, // C
    explanation: '片状面膜是最常见的面膜类型，用于密集补水'
  },
  {
    id: 28,
    image: getLocalImage(28),
    question: '这是什么护肤品？',
    options: ['防晒霜', '洁面乳', '眼霜', '隔离乳'],
    correctAnswer: 0, // A
    explanation: '防晒霜用于防止紫外线伤害，是护肤的最后一步'
  },
  {
    id: 29,
    image: getLocalImage(29),
    question: '这是什么护肤品？',
    options: ['防晒喷雾', '保湿喷雾', '舒缓喷雾', '定妆喷雾'],
    correctAnswer: 3, // D
    explanation: '定妆喷雾使妆造更加长久'
  },
  {
    id: 30,
    image: getLocalImage(30),
    question: '这是什么护肤品？',
    options: ['卸妆水', '眼唇卸妆液', '洁肤水', '清洁水'],
    correctAnswer: 0, // A
    explanation: '卸妆水质地清爽，适合淡妆和敏感肌'
  },
  {
    id: 31,
    image: getLocalImage(31),
    question: '这是什么化妆工具？',
    options: ['粉扑', '美妆蛋', '气垫扑', '硅胶扑'],
    correctAnswer: 1, // B
    explanation: '美妆蛋用于上底妆，湿用效果更好'
  },
  {
    id: 32,
    image: getLocalImage(32),
    question: '这是什么化妆工具？',
    options: ['腮红刷', '眼影刷', '遮瑕刷', '粉底刷'],
    correctAnswer: 3, // D
    explanation: '粉底刷用于涂抹粉底液，使妆容更均匀'
  },
  {
    id: 33,
    image: getLocalImage(33),
    question: '这是什么化妆工具？',
    options: ['眼影刷', '腮红刷', '眼线刷', '眉刷'],
    correctAnswer: 0, // A
    explanation: '眼影刷用于涂抹眼影，有多种大小和形状'
  },
  {
    id: 34,
    image: getLocalImage(34),
    question: '这是什么化妆工具？',
    options: ['修眉刀', '眉梳', '睫毛夹', '双眼皮贴辅助夹'],
    correctAnswer: 2, // C
    explanation: '睫毛夹用于夹翘睫毛，使眼睛更有神'
  },
  {
    id: 35,
    image: getLocalImage(35),
    question: '这是什么化妆工具？',
    options: ['卸妆巾', '洁面巾', '化妆棉', '湿敷棉'],
    correctAnswer: 2, // C
    explanation: '化妆棉用于涂抹爽肤水或卸妆'
  },
  
  // ===== 品牌logo识别题（15题）=====
  
  {
    id: 36,
    image: getLocalImage(36),
    question: '这是哪个化妆品品牌的logo？',
    options: ['兰蔻', '海蓝之谜', '雅诗兰黛', '倩碧'],
    correctAnswer: 2, // C
    explanation: '雅诗兰黛是美国高端化妆品品牌，以小棕瓶精华闻名'
  },
  {
    id: 37,
    image: getLocalImage(37),
    question: '这是哪个化妆品品牌的logo？',
    options: ['娇兰', '赫莲娜', '纪梵希', '兰蔻'],
    correctAnswer: 3, // D
    explanation: '兰蔻是法国高端化妆品品牌，以玫瑰为标志'
  },
  {
    id: 38,
    image: getLocalImage(38),
    question: '这是哪个化妆品品牌的logo？',
    options: ['迪奥', '香奈儿', '爱马仕', '路易威登'],
    correctAnswer: 0, // A
    explanation: '迪奥是法国奢侈品牌，以烈艳蓝金口红著称'
  },
  {
    id: 39,
    image: getLocalImage(39),
    question: '这是哪个化妆品品牌的logo？',
    options: ['Gucci', '香奈儿', 'Fendi', 'Burberry'],
    correctAnswer: 1, // B
    explanation: '香奈儿是法国奢侈品牌，双C标志是其经典logo'
  },
  {
    id: 40,
    image: getLocalImage(40),
    question: '这是哪个化妆品品牌的logo？',
    options: ['纪梵希', '阿玛尼', '圣罗兰', 'Valentino'],
    correctAnswer: 2, // C
    explanation: 'YSL圣罗兰是法国奢侈品牌，以方管口红和镜光唇釉闻名'
  },
  {
    id: 41,
    image: getLocalImage(41),
    question: '这是哪个化妆品品牌的logo？',
    options: ['Bobbi Brown', 'MAC', 'Benefit', 'Tarte'],
    correctAnswer: 1, // B
    explanation: 'MAC是加拿大专业彩妆品牌，深受彩妆师喜爱'
  },
  {
    id: 42,
    image: getLocalImage(42),
    question: '这是哪个化妆品品牌的logo？',
    options: ['NARS', 'Urban Decay', 'Too Faced', 'Charlotte Tilbury'],
    correctAnswer: 0, // A
    explanation: 'NARS是美国彩妆品牌，以Orgasm腮红闻名'
  },
  {
    id: 43,
    image: getLocalImage(43),
    question: '这是哪个化妆品品牌的logo？',
    options: ['奥尔滨', 'CPB肌肤之钥', 'POLA', 'SK-II'],
    correctAnswer: 3, // D
    explanation: 'SK-II是日本高端护肤品牌，以神仙水著称'
  },
  {
    id: 44,
    image: getLocalImage(44),
    question: '这是哪个化妆品品牌的logo？',
    options: ['资生堂', '黛珂', '芙丽芳丝', '珂润'],
    correctAnswer: 0, // A
    explanation: '资生堂是日本最大的化妆品公司，历史悠久'
  },
  {
    id: 45,
    image: getLocalImage(45),
    question: '这是哪个化妆品品牌的logo？',
    options: ['莱珀妮', '希思黎', '海蓝之谜', '香缇卡'],
    correctAnswer: 2, // C
    explanation: 'La Mer海蓝之谜是美国顶级护肤品牌，以经典面霜闻名'
  },
  {
    id: 46,
    image: getLocalImage(46),
    question: '这是哪个化妆品品牌的logo？',
    options: ['雪花秀', '兰芝', '后', '吕'],
    correctAnswer: 1, // B
    explanation: '兰芝是韩国化妆品品牌，以气垫粉底著称'
  },
  {
    id: 47,
    image: getLocalImage(47),
    question: '这是哪个化妆品品牌的logo？',
    options: ['自然乐园', '悦诗风吟', '爱丽小屋', '菲诗小铺'],
    correctAnswer: 1, // B
    explanation: '悦诗风吟是韩国自然主义化妆品品牌'
  },
  {
    id: 48,
    image: getLocalImage(48),
    question: '这是哪个化妆品品牌的logo？',
    options: ['露华浓', '蜜丝佛陀', '美宝莲', '妙巴黎'],
    correctAnswer: 2, // C
    explanation: '美宝莲是美国开架彩妆品牌，性价比高'
  },
  {
    id: 49,
    image: getLocalImage(49),
    question: '这是哪个化妆品品牌的logo？',
    options: ['美宝莲', '欧莱雅', '卡尼尔', '美源'],
    correctAnswer: 1, // B
    explanation: '欧莱雅是全球最大的化妆品集团'
  },
  {
    id: 50,
    image: getLocalImage(50),
    question: '这是哪个化妆品品牌的logo？',
    options: ['Tom Ford', 'Hourglass', 'Pat McGrath', 'Natasha Denona'],
    correctAnswer: 0, // A
    explanation: 'Tom Ford是美国奢侈品牌，以黑管口红著称'
  }
]