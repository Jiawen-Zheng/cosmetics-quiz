import Link from 'next/link'

export default function CopyrightPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">版权声明</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">关于本网站</h2>
            <p className="leading-relaxed">
              本网站是一个化妆品小测试平台，旨在帮助用户学习和识别不同的化妆品类型和品牌。
              所有内容仅服务于测试题库目的。
            </p>
          </section>

          <section>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>品牌logo仅用于教育和识别目的，</li>
              <li>所有品牌名称、商标和logo归其各自所有，所有本网站与上述品牌没有任何官方关联、赞助或授权关系。</li>
            </ul>
          </section>

          <section className="border-t pt-6 mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">联系方式</h3>
            <div className="flex justify-center">
              <a
                href="https://xhslink.com/m/1ZZ7GicPCV0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
              >
                <span className="text-xl"></span>
                <span>访问我的小红书：灵光信栈</span>
              </a>
            </div>
          </section>

          <section className="border-t pt-6 mt-8">
            <p className="text-sm text-gray-600 text-center">
              本网站使用 Next.js 构建 | 最后更新：2026年1月
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-pink-500 text-white px-8 py-3 rounded-full font-medium hover:bg-pink-600 transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}
