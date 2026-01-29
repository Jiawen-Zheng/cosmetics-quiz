'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { questions } from '@/data/questions'
import { getRandomQuestions, shuffleArray } from '@/utils/quiz'
import { Question } from '@/types/question'
import { Suspense } from 'react'

function QuizContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode') || 'random' // 默认随机模式
  
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  
  // 根据模式确定每题分数
  const pointsPerQuestion = mode === 'random' ? 10 : 2
  const totalQuestions = mode === 'random' ? 10 : 50

  useEffect(() => {
    // 根据模式选择题目
    if (mode === 'random') {
      // 随机抽取10道题
      const randomQuestions = getRandomQuestions(questions, 10)
      setQuizQuestions(randomQuestions)
    } else {
      // 全部题库，打乱顺序
      const allQuestions = shuffleArray(questions)
      setQuizQuestions(allQuestions)
    }
  }, [mode])

  if (quizQuestions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <div className="text-2xl text-gray-600">加载中...</div>
    </div>
  }

  const currentQuestion = quizQuestions[currentIndex]

  const handleAnswer = (answerIndex: number) => {
    if (showFeedback) return

    setSelectedAnswer(answerIndex)
    setShowFeedback(true)

    // 计算得分
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + pointsPerQuestion)
    }

    // 1.5秒后进入下一题或结束
    setTimeout(() => {
      if (currentIndex < quizQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setSelectedAnswer(null)
        setShowFeedback(false)
      } else {
        // 测试完成，跳转到结果页
        const finalScore = score + (answerIndex === currentQuestion.correctAnswer ? pointsPerQuestion : 0)
        router.push(`/result?score=${finalScore}&mode=${mode}`)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 顶部信息栏 */}
        <div className="bg-white/90 backdrop-blur rounded-xl shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{mode === 'random' ? '🎲' : '📚'}</span>
              <span className="font-semibold text-gray-700">
                {mode === 'random' ? '随机测试' : '全部题库'}
              </span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-pink-600">{score} 分</div>
              <div className="text-xs text-gray-500">满分 100 分</div>
            </div>
          </div>
          
          {/* 进度条 */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>第 {currentIndex + 1} / {quizQuestions.length} 题</span>
              <span>每题 {pointsPerQuestion} 分</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  mode === 'random' 
                    ? 'bg-gradient-to-r from-pink-500 to-pink-600' 
                    : 'bg-gradient-to-r from-purple-500 to-purple-600'
                }`}
                style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* 题目卡片 */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {/* 图片 */}
          <div className="mb-6 flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 shadow-inner" style={{ minHeight: '320px' }}>
            <div className="relative w-full h-80 flex items-center justify-center">
              <img
                src={currentQuestion.image}
                alt="化妆品"
                className="max-w-full max-h-full object-contain rounded-lg"
                loading="eager"
              />
            </div>
          </div>

          {/* 问题 */}
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center leading-relaxed">
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
                  className={`w-full p-4 rounded-xl text-left font-medium transition-all transform ${
                    showCorrect
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105'
                      : showWrong
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg scale-105'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-800 hover:shadow-md hover:scale-102'
                  } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 mr-3 font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                    </div>
                    {showCorrect && <span className="text-2xl">✓</span>}
                    {showWrong && <span className="text-2xl">✗</span>}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">加载中...</div>
      </div>
    }>
      <QuizContent />
    </Suspense>
  )
}
