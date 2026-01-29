'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

// 根据分数获取评级和评价
function getScoreRating(score: number) {
  if (score >= 90) {
    return {
      emoji: '🏆',
      title: '化妆品专家',
      comment: '太厉害了！你对化妆品的了解堪称专业级别！',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50'
    }
  } else if (score >= 80) {
    return {
      emoji: '🎉',
      title: '化妆品达人',
      comment: '非常棒！你对化妆品有很深的了解！',
      color: 'from-pink-500 to-purple-500',
      bgColor: 'from-pink-50 to-purple-50'
    }
  } else if (score >= 70) {
    return {
      emoji: '👍',
      title: '进阶玩家',
      comment: '不错哦！你对化妆品有一定的认识！',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    }
  } else if (score >= 60) {
    return {
      emoji: '💪',
      title: '入门选手',
      comment: '还不错！继续加油，多多学习！',
      color: 'from-green-500 to-teal-500',
      bgColor: 'from-green-50 to-teal-50'
    }
  } else {
    return {
      emoji: '😅',
      title: '化妆品小白',
      comment: '没关系！多练习几次就会进步的！',
      color: 'from-gray-500 to-gray-600',
      bgColor: 'from-gray-50 to-gray-100'
    }
  }
}

function ResultContent() {
  const searchParams = useSearchParams()
  const score = parseInt(searchParams.get('score') || '0')
  const mode = searchParams.get('mode') || 'random'
  
  const rating = getScoreRating(score)
  const modeText = mode === 'random' ? '随机测试' : '全部题库'
  const modeEmoji = mode === 'random' ? '🎲' : '📚'

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* 结果卡片 */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          {/* 顶部标识 */}
          <div className="mb-4">
            <span className="inline-block bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full text-sm font-semibold text-gray-700">
              {modeEmoji} {modeText}
            </span>
          </div>
          
          <div className="text-7xl mb-4">{rating.emoji}</div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            测试完成！
          </h1>
          
          {/* 评级标题 */}
          <div className={`inline-block bg-gradient-to-r ${rating.bgColor} px-6 py-2 rounded-full mb-6`}>
            <h2 className={`text-xl font-bold bg-gradient-to-r ${rating.color} bg-clip-text text-transparent`}>
              {rating.title}
            </h2>
          </div>
          
          {/* 分数显示 */}
          <div className="mb-6">
            <div className={`text-7xl font-bold bg-gradient-to-r ${rating.color} bg-clip-text text-transparent mb-2`}>
              {score}
            </div>
            <div className="text-gray-500 text-lg">满分 100 分</div>
          </div>
          
          {/* 评价 */}
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {rating.comment}
          </p>

          {/* 统计信息 */}
          <div className={`bg-gradient-to-r ${rating.bgColor} rounded-2xl p-6 mb-6`}>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-800">{mode === 'random' ? '10' : '50'}</div>
                <div className="text-sm text-gray-600">题目数量</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{mode === 'random' ? score / 10 : score / 2}</div>
                <div className="text-sm text-gray-600">答对题数</div>
              </div>
            </div>
          </div>

          {/* 广告区域 */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-pink-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
            </h3>
            <p className="text-gray-600 mb-4">
              想要更多有趣的小工具？
            </p>
            <a
              href="https://xhslink.com/m/1ZZ7GicPCV0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
            >
              <span className="text-lg"></span>
              <span>访问我的小红书：灵光信栈</span>
            </a>
            <p className="text-xs text-gray-400 mt-3">
              里面有更多好玩的内容等你发现！
            </p>
          </div>

          {/* 按钮 */}
          <div className="space-y-3">
            <Link href={`/quiz?mode=${mode}`}>
              <button className={`w-full bg-gradient-to-r ${rating.color} hover:opacity-90 text-white py-4 rounded-xl font-semibold transition shadow-lg transform hover:scale-105`}>
                再测一次
              </button>
            </Link>
            <Link href="/">
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 rounded-xl font-semibold transition">
                返回首页
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">加载中...</div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}
