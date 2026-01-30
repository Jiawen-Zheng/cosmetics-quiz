'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CustomQuestion } from '@/types/question';
import { getCustomQuestions } from '@/utils/customQuestions';

export default function CustomQuizTest() {
  const router = useRouter();
  const [questions, setQuestions] = useState<CustomQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const loaded = getCustomQuestions();
    if (loaded.length === 0) {
      alert('还没有自定义题目，请先创建题目');
      router.push('/custom-quiz/manage');
      return;
    }
    setQuestions(loaded);
  }, [router]);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      score: Math.round((correct / questions.length) * 100)
    };
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    setIsFinished(false);
  };

  // 完成页面
  if (isFinished) {
    const { correct, total, score } = calculateScore();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-6">
              {score >= 90 ? '🎉' : score >= 70 ? '👏' : score >= 60 ? '💪' : '📚'}
            </div>
            
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
              测试完成！
            </h1>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-8 mb-6">
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
                {score}分
              </div>
              <p className="text-gray-600 text-lg">
                答对 {correct} / {total} 题
              </p>
            </div>

            <div className="mb-8">
              <p className="text-xl text-gray-700 font-semibold mb-4">
                {score >= 90 && '太棒了！你对自己的题目掌握得非常好！'}
                {score >= 70 && score < 90 && '不错！继续加油！'}
                {score >= 60 && score < 70 && '还可以，需要多加练习！'}
                {score < 60 && '需要更多练习，加油！'}
              </p>
            </div>

            {/* 详细结果 */}
            <div className="mb-8 text-left">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 答题详情</h3>
              <div className="space-y-3">
                {questions.map((q, index) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer === q.correctAnswer;
                  
                  return (
                    <div 
                      key={q.id}
                      className={`p-4 rounded-lg border-2 ${
                        isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          isCorrect ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 mb-1">{q.question}</p>
                          <p className="text-sm text-gray-600">
                            你的答案: {String.fromCharCode(65 + userAnswer)} - {q.options[userAnswer]}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-600 font-semibold">
                              正确答案: {String.fromCharCode(65 + q.correctAnswer)} - {q.options[q.correctAnswer]}
                            </p>
                          )}
                        </div>
                        <div className="flex-shrink-0 text-2xl">
                          {isCorrect ? '✓' : '✗'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={restartQuiz}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
              >
                🔄 再测一次
              </button>
              <Link href="/custom-quiz/manage" className="flex-1">
                <button className="w-full bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 transition-colors">
                  📝 返回管理
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 答题页面
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 进度条 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              题目 {currentIndex + 1} / {questions.length}
            </span>
            <span className="text-sm font-semibold text-gray-700">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 题目卡片 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* 图片 */}
          <div className="mb-6">
            <img 
              src={currentQuestion.image} 
              alt="题目图片" 
              className="w-full max-h-96 object-contain rounded-xl border-2 border-gray-200"
            />
          </div>

          {/* 问题 */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {currentQuestion.question}
          </h2>

          {/* 选项 */}
          <div className="grid gap-4 mb-6">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`p-4 rounded-xl text-left font-semibold transition-all transform hover:scale-102 ${
                    showCorrect
                      ? 'bg-green-100 border-3 border-green-500 text-green-700'
                      : showWrong
                      ? 'bg-red-100 border-3 border-red-500 text-red-700'
                      : isSelected
                      ? 'bg-purple-100 border-3 border-purple-500 text-purple-700'
                      : 'bg-gray-50 border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                  } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      showCorrect
                        ? 'bg-green-500 text-white'
                        : showWrong
                        ? 'bg-red-500 text-white'
                        : isSelected
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1">{option}</span>
                    {showCorrect && <span className="text-2xl">✓</span>}
                    {showWrong && <span className="text-2xl">✗</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 结果提示 */}
          {showResult && (
            <div className={`p-4 rounded-xl mb-6 ${
              selectedAnswer === currentQuestion.correctAnswer
                ? 'bg-green-50 border-2 border-green-200'
                : 'bg-red-50 border-2 border-red-200'
            }`}>
              <p className={`text-lg font-semibold ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? 'text-green-700'
                  : 'text-red-700'
              }`}>
                {selectedAnswer === currentQuestion.correctAnswer
                  ? '✓ 回答正确！'
                  : `✗ 回答错误！正确答案是 ${String.fromCharCode(65 + currentQuestion.correctAnswer)}`
                }
              </p>
            </div>
          )}

          {/* 下一题按钮 */}
          {showResult && (
            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
            >
              {currentIndex < questions.length - 1 ? '下一题 →' : '查看结果 →'}
            </button>
          )}
        </div>

        {/* 退出按钮 */}
        <div className="text-center">
          <Link href="/custom-quiz/manage" className="text-gray-600 hover:text-gray-800 underline">
            退出测试
          </Link>
        </div>
      </div>
    </div>
  );
}
