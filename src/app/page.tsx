import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold text-pink-600 mb-4">
          💄 化妆品知识大测试
        </h1>
        <p className="text-2xl text-gray-700 mb-8">
          看看你的男朋友能对几题
        </p>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">测试规则</h2>
          <ul className="text-left space-y-2 text-gray-600">
            <li>✨ 共10道题目</li>
            <li>🎯 每题4个选项</li>
            <li>⏱️ 不限时间</li>
            <li>🎁 测完有惊喜</li>
          </ul>
        </div>
        
        <Link href="/quiz">
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-lg transform transition hover:scale-105">
            开始测试 →
          </button>
        </Link>
        
        <div className="mt-8">
          <Link href="/copyright" className="text-sm text-gray-500 hover:text-gray-700 underline">
            版权声明
          </Link>
        </div>
      </div>
    </div>
  )
}
