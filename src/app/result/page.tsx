'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { getScoreComment } from '@/utils/quiz'

function ResultContent() {
  const searchParams = useSearchParams()
  const score = parseInt(searchParams.get('score') || '0')
  const total = 10

  const comment = getScoreComment(score, total)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* 结果卡片 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            测试完成！
          </h1>
          
          <div className="text-6xl font-bold text-pink-600 mb-4">
            {score} / {total}
          </div>
          
          <p className="text-xl text-gray-600 mb-8">
            {comment}
          </p>

          {/* 广告区域 */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              ✨ 灵光信栈
            </h3>
            <p className="text-gray-600 mb-3">
              想要更多有趣的小工具？
            </p>
            <p className="text-sm text-gray-500">
              快去小红书搜索：<span className="font-bold text-pink-600">灵光信栈</span>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              里面有更多好玩的内容等你发现！
            </p>
          </div>

          {/* 按钮 */}
          <div className="space-y-3">
            <Link href="/quiz">
              <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold transition">
                再测一次
              </button>
            </Link>
            <Link href="/">
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition">
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
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">加载中...</div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}
