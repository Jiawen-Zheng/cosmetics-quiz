import { Question } from '@/types/question'

// 获取本地图片路径，自动适配jpg和png格式
const getLocalImage = (id: number) => {
  // 1-11是jpg格式，12-50是png格式
  const extension = id <= 11 ? 'jpg' : 'png'
  return `/images/product-${id}.${extension}`
}

export const questions: Question[] = [
  // 产品类型识别题（35题）
  {
    id: 1,
    image: getLocalImage(1),
    question: '这是什么化妆品？',
    options: ['粉底液', 'BB霜', '隔离霜', '妆前乳'],
    correctAnswer: 0,
    explanation: '粉底液是液体状的底妆产品，用于均匀肤色和遮盖瑕疵'
  },
  {
    id: 2,
    image: getLocalImage(2),
    question: '这是什么化妆品？',
    options: ['遮瑕膏', '粉底霜', '高光膏', '腮红膏'],
    correctAnswer: 0,
    explanation: '遮瑕膏用于遮盖面部瑕疵、黑眼圈和痘印'
  },
  {
    id: 3,
    image: getLocalImage(3),
    question: '这是什么化妆品？',
    options: ['口红', '唇釉', '唇彩', '润唇膏'],
    correctAnswer: 1,
    explanation: '唇釉质地轻薄，光泽度高，介于口红和唇彩之间'
  },
  {
    id: 4,
    image: getLocalImage(4),
    question: '这是什么化妆品？',
    options: ['眼影盘', '腮红盘', '修容盘', '高光盘'],
    correctAnswer: 0,
    explanation: '眼影盘包含多个颜色，用于眼部彩妆'
  },
  {
    id: 5,
    image: getLocalImage(5),
    question: '这是什么化妆品？',
    options: ['睫毛膏', '眉膏', '染眉膏', '睫毛增长液'],
    correctAnswer: 0,
    explanation: '睫毛膏用于增加睫毛的浓密度和长度'
  },
  {
    id: 6,
    image: getLocalImage(6),
    question: '这是什么化妆品？',
    options: ['眉笔', '眼线笔', '唇线笔', '遮瑕笔'],
    correctAnswer: 0,
    explanation: '眉笔用于描绘和填充眉毛，使眉形更清晰'
  },
  {
    id: 7,
    image: getLocalImage(7),
    question: '这是什么化妆品？',
    options: ['眼线笔', '眉笔', '唇线笔', '卧蚕笔'],
    correctAnswer: 0,
    explanation: '眼线笔用于描绘眼线，使眼睛更有神'
  },
  {
    id: 8,
    image: getLocalImage(8),
    question: '这是什么化妆品？',
    options: ['眼线液', '眼线胶笔', '眼线膏', '眼线粉'],
    correctAnswer: 0,
    explanation: '眼线液笔头细，适合画精细流畅的眼线'
  },
  {
    id: 9,
    image: getLocalImage(9),
    question: '这是什么化妆品？',
    options: ['腮红', '修容粉', '高光粉', '散粉'],
    correctAnswer: 0,
    explanation: '腮红用于增添面部气色，打造红润感'
  },
  {
    id: 10,
    image: getLocalImage(10),
    question: '这是什么化妆品？',
    options: ['高光', '阴影粉', '腮红', '散粉'],
    correctAnswer: 0,
    explanation: '高光用于提亮面部高点，增加立体感'
  },
  {
    id: 11,
    image: getLocalImage(11),
    question: '这是什么化妆品？',
    options: ['修容粉', '腮红', '高光', '散粉'],
    correctAnswer: 0,
    explanation: '修容粉用于打造面部阴影，增强轮廓感'
  },
  {
    id: 12,
    image: getLocalImage(12),
    question: '这是什么化妆品？',
    options: ['散粉', '粉饼', '蜜粉', '定妆粉'],
    correctAnswer: 0,
    explanation: '散粉用于定妆，控油，使妆容更持久'
  },
  {
    id: 13,
    image: getLocalImage(13),
    question: '这是什么化妆品？',
    options: ['粉饼', '散粉', '气垫', '粉底霜'],
    correctAnswer: 0,
    explanation: '粉饼是压缩成饼状的粉底，便于携带和补妆'
  },
  {
    id: 14,
    image: getLocalImage(14),
    question: '这是什么化妆品？',
    options: ['气垫粉底', '粉饼', '散粉', '粉底液'],
    correctAnswer: 0,
    explanation: '气垫粉底是海绵气垫中含有粉底液的产品，便于补妆'
  },
  {
    id: 15,
    image: getLocalImage(15),
    question: '这是什么化妆品？',
    options: ['妆前乳', '隔离霜', '防晒霜', '面霜'],
    correctAnswer: 0,
    explanation: '妆前乳在底妆前使用，帮助妆容更服帖持久'
  },
  {
    id: 16,
    image: getLocalImage(16),
    question: '这是什么化妆品？',
    options: ['隔离霜', '妆前乳', '防晒霜', 'BB霜'],
    correctAnswer: 0,
    explanation: '隔离霜用于隔离彩妆和外界污染，保护肌肤'
  },
  {
    id: 17,
    image: getLocalImage(17),
    question: '这是什么化妆品？',
    options: ['唇线笔', '眉笔', '眼线笔', '遮瑕笔'],
    correctAnswer: 0,
    explanation: '唇线笔用于勾勒唇形，防止口红晕染'
  },
  {
    id: 18,
    image: getLocalImage(18),
    question: '这是什么化妆品？',
    options: ['染眉膏', '睫毛膏', '眉膏', '眉粉'],
    correctAnswer: 0,
    explanation: '染眉膏用于改变眉毛颜色，使眉毛更自然'
  },
  {
    id: 19,
    image: getLocalImage(19),
    question: '这是什么化妆品？',
    options: ['眉粉', '眼影', '修容粉', '鼻影粉'],
    correctAnswer: 0,
    explanation: '眉粉用于填充眉毛，打造自然雾面眉妆'
  },
  {
    id: 20,
    image: getLocalImage(20),
    question: '这是什么化妆品？',
    options: ['卧蚕笔', '高光笔', '遮瑕笔', '眼线笔'],
    correctAnswer: 0,
    explanation: '卧蚕笔用于打造卧蚕效果，使眼睛更有神'
  },
  {
    id: 21,
    image: getLocalImage(21),
    question: '这是什么护肤品？',
    options: ['洁面乳', '卸妆乳', '洗面奶', '洁面泡沫'],
    correctAnswer: 0,
    explanation: '洁面乳是乳状质地的清洁产品，温和清洁面部'
  },
  {
    id: 22,
    image: getLocalImage(22),
    question: '这是什么护肤品？',
    options: ['爽肤水', '化妆水', '柔肤水', '精华水'],
    correctAnswer: 0,
    explanation: '爽肤水在洁面后使用，二次清洁并补水'
  },
  {
    id: 23,
    image: getLocalImage(23),
    question: '这是什么护肤品？',
    options: ['精华液', '乳液', '面霜', '精华水'],
    correctAnswer: 0,
    explanation: '精华液含有高浓度活性成分，针对性护理肌肤'
  },
  {
    id: 24,
    image: getLocalImage(24),
    question: '这是什么护肤品？',
    options: ['乳液', '面霜', '精华液', '凝露'],
    correctAnswer: 0,
    explanation: '乳液质地轻薄，用于保湿锁水'
  },
  {
    id: 25,
    image: getLocalImage(25),
    question: '这是什么护肤品？',
    options: ['面霜', '乳液', '凝霜', '面膜'],
    correctAnswer: 0,
    explanation: '面霜质地较厚重，深层滋润保湿'
  },
  {
    id: 26,
    image: getLocalImage(26),
    question: '这是什么护肤品？',
    options: ['眼霜', '面霜', '眼部精华', '眼胶'],
    correctAnswer: 0,
    explanation: '眼霜专门用于眼部护理，质地较轻薄'
  },
  {
    id: 27,
    image: getLocalImage(27),
    question: '这是什么护肤品？',
    options: ['面膜', '睡眠面膜', '涂抹面膜', '泥膜'],
    correctAnswer: 0,
    explanation: '片状面膜是最常见的面膜类型，用于密集补水'
  },
  {
    id: 28,
    image: getLocalImage(28),
    question: '这是什么护肤品？',
    options: ['防晒霜', '隔离霜', '妆前乳', 'BB霜'],
    correctAnswer: 0,
    explanation: '防晒霜用于防止紫外线伤害，是护肤的最后一步'
  },
  {
    id: 29,
    image: getLocalImage(29),
    question: '这是什么护肤品？',
    options: ['卸妆油', '卸妆水', '卸妆乳', '洁面油'],
    correctAnswer: 0,
    explanation: '卸妆油质地较厚，卸妆力强，适合浓妆'
  },
  {
    id: 30,
    image: getLocalImage(30),
    question: '这是什么护肤品？',
    options: ['卸妆水', '卸妆油', '爽肤水', '化妆水'],
    correctAnswer: 0,
    explanation: '卸妆水质地清爽，适合淡妆和敏感肌'
  },
  {
    id: 31,
    image: getLocalImage(31),
    question: '这是什么化妆工具？',
    options: ['美妆蛋', '粉扑', '海绵', '化妆棉'],
    correctAnswer: 0,
    explanation: '美妆蛋用于上底妆，湿用效果更好'
  },
  {
    id: 32,
    image: getLocalImage(32),
    question: '这是什么化妆工具？',
    options: ['粉底刷', '腮红刷', '散粉刷', '修容刷'],
    correctAnswer: 0,
    explanation: '粉底刷用于涂抹粉底液，使妆容更均匀'
  },
  {
    id: 33,
    image: getLocalImage(33),
    question: '这是什么化妆工具？',
    options: ['眼影刷', '腮红刷', '散粉刷', '唇刷'],
    correctAnswer: 0,
    explanation: '眼影刷用于涂抹眼影，有多种大小和形状'
  },
  {
    id: 34,
    image: getLocalImage(34),
    question: '这是什么化妆工具？',
    options: ['睫毛夹', '睫毛梳', '眉夹', '修眉刀'],
    correctAnswer: 0,
    explanation: '睫毛夹用于夹翘睫毛，使眼睛更有神'
  },
  {
    id: 35,
    image: getLocalImage(35),
    question: '这是什么化妆工具？',
    options: ['化妆棉', '卸妆棉', '粉扑', '海绵'],
    correctAnswer: 0,
    explanation: '化妆棉用于涂抹爽肤水或卸妆'
  },
  
  // 品牌logo识别题（15题）
  {
    id: 36,
    image: getLocalImage(36),
    question: '这是哪个化妆品品牌的logo？',
    options: ['雅诗兰黛 ', '兰蔻 ', '迪奥 ', '香奈儿 '],
    correctAnswer: 0,
    explanation: '雅诗兰黛是美国高端化妆品品牌，以小棕瓶精华闻名'
  },
  {
    id: 37,
    image: getLocalImage(37),
    question: '这是哪个化妆品品牌的logo？',
    options: ['兰蔻 ', '雅诗兰黛 ', '娇兰 ', '赫莲娜 '],
    correctAnswer: 0,
    explanation: '兰蔻是法国高端化妆品品牌，以玫瑰为标志'
  },
  {
    id: 38,
    image: getLocalImage(38),
    question: '这是哪个化妆品品牌的logo？',
    options: ['迪奥 ', '香奈儿 ', '圣罗兰', 'TF '],
    correctAnswer: 0,
    explanation: '迪奥是法国奢侈品牌，以烈艳蓝金口红著称'
  },
  {
    id: 39,
    image: getLocalImage(39),
    question: '这是哪个化妆品品牌的logo？',
    options: ['香奈儿 ', '迪奥 ', 'Gucci', 'Prada'],
    correctAnswer: 0,
    explanation: '香奈儿是法国奢侈品牌，双C标志是其经典logo'
  },
  {
    id: 40,
    image: getLocalImage(40),
    question: '这是哪个化妆品品牌的logo？',
    options: ['圣罗兰', 'TF ', '迪奥 ', '纪梵希'],
    correctAnswer: 0,
    explanation: 'YSL是法国奢侈品牌，以方管口红和镜光唇釉闻名'
  },
  {
    id: 41,
    image: getLocalImage(41),
    question: '这是哪个化妆品品牌的logo？',
    options: ['MAC', 'NARS', 'Bobbi Brown', 'Make Up For Ever'],
    correctAnswer: 0,
    explanation: 'MAC是加拿大专业彩妆品牌，深受彩妆师喜爱'
  },
  {
    id: 42,
    image: getLocalImage(42),
    question: '这是哪个化妆品品牌的logo？',
    options: ['NARS', 'MAC', 'Urban Decay', 'Too Faced'],
    correctAnswer: 0,
    explanation: 'NARS是美国彩妆品牌，以Orgasm腮红闻名'
  },
  {
    id: 43,
    image: getLocalImage(43),
    question: '这是哪个化妆品品牌的logo？',
    options: ['SK-II', '资生堂 ', 'CPB (肌肤之钥)', 'IPSA (茵芙莎)'],
    correctAnswer: 0,
    explanation: 'SK-II是日本高端护肤品牌，以神仙水著称'
  },
  {
    id: 44,
    image: getLocalImage(44),
    question: '这是哪个化妆品品牌的logo？',
    options: ['资生堂 ', 'SK-II', 'KOSE ', 'Kanebo (嘉娜宝)'],
    correctAnswer: 0,
    explanation: '资生堂是日本最大的化妆品公司，历史悠久'
  },
  {
    id: 45,
    image: getLocalImage(45),
    question: '这是哪个化妆品品牌的logo？',
    options: ['海蓝之谜', '莱珀妮', '希思黎', '法尔曼'],
    correctAnswer: 0,
    explanation: 'La Mer是美国顶级护肤品牌，以经典面霜闻名'
  },
  {
    id: 46,
    image: getLocalImage(46),
    question: '这是哪个化妆品品牌的logo？',
    options: ['兰芝 ', '悦诗风吟 ', '爱茉莉 ', '雪花秀 '],
    correctAnswer: 0,
    explanation: '兰芝是韩国化妆品品牌，以气垫粉底著称'
  },
  {
    id: 47,
    image: getLocalImage(47),
    question: '这是哪个化妆品品牌的logo？',
    options: ['悦诗风吟 ', '兰芝 ', '伊蒂之屋 ', '爱丽小屋 '],
    correctAnswer: 0,
    explanation: '悦诗风吟是韩国自然主义化妆品品牌'
  },
  {
    id: 48,
    image: getLocalImage(48),
    question: '这是哪个化妆品品牌的logo？',
    options: ['美宝莲 ', '欧莱雅 ', '卡姿兰 ', '玛丽黛佳 '],
    correctAnswer: 0,
    explanation: '美宝莲是美国开架彩妆品牌，性价比高'
  },
  {
    id: 49,
    image: getLocalImage(49),
    question: '这是哪个化妆品品牌的logo？',
    options: ['欧莱雅 ', '美宝莲 ', '巴黎欧莱雅', '薇姿 '],
    correctAnswer: 0,
    explanation: '欧莱雅是全球最大的化妆品集团'
  },
  {
    id: 50,
    image: getLocalImage(50),
    question: '这是哪个化妆品品牌的logo？',
    options: ['TF (Tom Ford)', 'YSL (圣罗兰)', 'Armani (阿玛尼)', 'Gucci'],
    correctAnswer: 0,
    explanation: 'Tom Ford是美国奢侈品牌，以黑管口红著称'
  }
]
