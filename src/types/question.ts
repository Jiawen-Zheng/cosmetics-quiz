export interface Question {
  id: number
  image: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface QuizState {
  questions: Question[]
  currentIndex: number
  score: number
  answers: number[]
  isFinished: boolean
}

// 自定义题目类型
export interface CustomQuestion {
  id: string // 使用UUID
  image: string // base64编码的图片
  question: string
  options: [string, string, string, string] // 固定4个选项
  correctAnswer: number // 0-3
  createdAt: number // 时间戳
}
