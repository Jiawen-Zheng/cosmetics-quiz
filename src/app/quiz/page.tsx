'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { questions } from '@/data/questions'
import { getRandomQuestions } from '@/utils/quiz'
import { Question } from '@/types/question'

export default function QuizPage() {
  const router = useRouter()
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  useEffect(() => {
    // 随机抽取10道题
    const randomQuestions = getRandomQuestions(questions, 10)
    setQuizQuestions(randomQuestions)
  }, [])

  if (quizQuestions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl">加载中...</div>
    </div>
  }

  const currentQuestion = quizQuestions[currentIndex]

  const handleAnswer = (answerIndex: number) => {
    if (showFeedback) return

    setSelectedAnswer(answerIndex)
    setShowFeedback(true)

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }

    // 1.5秒后进入下一题或结束
    setTimeout(() => {
      if (currentIndex < quizQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setSelectedAnswer(null)
        setShowFeedback(false)
      } else {
        // 测试完成，跳转到结果页
        router.push(`/result?score=${score + (answerIndex === currentQuestion.correctAnswer ? 1 : 0)}`)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>第 {currentIndex + 1} / {quizQuestions.length} 题</span>
            <span>已答对 {score} 题</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* 题目卡片 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* 图片 */}
          <div className="mb-6 flex justify-center items-center bg-gray-50 rounded-lg p-4" style={{ minHeight: '320px' }}>
            <img
              src={currentQuestion.image}
              alt="化妆品"
              className="max-w-full max-h-80 object-contain rounded-lg shadow-md"
              style={{ 
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '320px'
              }}
            />
          </div>

          {/* 问题 */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {currentQuestion.question}
          </h2>

          {/* 选项 */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === currentQuestion.correctAnswer
              const showCorrect = showFeedback && isCorrect
              const showWrong = showFeedback && isSelected && !isCorrect

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-lg text-left font-medium transition-all ${
                    showCorrect
                      ? 'bg-green-500 text-white'
                      : showWrong
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                  {showCorrect && ' ✓'}
                  {showWrong && ' ✗'}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
