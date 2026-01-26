import { Question } from '@/types/question'

// 随机打乱数组
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// 从题库中随机抽取N道题
export function getRandomQuestions(
  questions: Question[],
  count: number
): Question[] {
  return shuffleArray(questions).slice(0, count)
}

// 根据分数获取评价
export function getScoreComment(score: number, total: number): string {
  const percentage = (score / total) * 100
  
  if (percentage <= 30) {
    return '化妆品小白，需要多多学习哦 😅'
  } else if (percentage <= 60) {
    return '入门级选手，还有进步空间 💪'
  } else if (percentage <= 80) {
    return '不错哦，对化妆品有一定了解 👍'
  } else {
    return '化妆品达人，太厉害了！🎉'
  }
}
