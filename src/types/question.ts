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
