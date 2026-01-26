export default function CopyrightPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">版权声明</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">关于本网站</h2>
            <p className="leading-relaxed">
              本网站是一个化妆品知识学习平台，旨在帮助用户学习和识别不同的化妆品类型和品牌。
              所有内容仅用于教育和学习目的。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">图片来源</h2>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>产品图片来自 Unsplash、Pexels 等免费图库，遵循相应的使用许可</li>
              <li>品牌logo仅用于教育和识别目的，符合"合理使用"原则</li>
              <li>所有图片均不用于商业销售或盈利目的</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">商标声明</h2>
            <p className="leading-relaxed mb-3">
              所有品牌名称、商标和logo归其各自所有者所有，包括但不限于：
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm leading-relaxed">
                雅诗兰黛 (Estée Lauder)、兰蔻 (Lancôme)、迪奥 (Dior)、香奈儿 (Chanel)、
                YSL (圣罗兰)、MAC、NARS、SK-II、资生堂 (Shiseido)、La Mer (海蓝之谜)、
                兰芝 (Laneige)、悦诗风吟 (Innisfree)、美宝莲 (Maybelline)、
                欧莱雅 (L'Oréal)、Tom Ford 等。
              </p>
            </div>
            <p className="leading-relaxed mt-3">
              本网站与上述品牌没有任何官方关联、赞助或授权关系。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">免责声明</h2>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>本网站内容仅供学习和参考，不构成任何购买建议</li>
              <li>产品信息可能存在更新延迟，请以品牌官方信息为准</li>
              <li>使用本网站即表示您同意本声明的所有条款</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">版权投诉</h2>
            <p className="leading-relaxed">
              如果您认为本网站的内容侵犯了您的权利，请通过以下方式联系我们：
            </p>
            <div className="bg-pink-50 p-4 rounded-lg mt-3">
              <p className="text-sm">
                我们将在收到通知后24小时内处理您的请求。
              </p>
            </div>
          </section>

          <section className="border-t pt-6 mt-8">
            <p className="text-sm text-gray-600 text-center">
              本网站使用 Next.js 构建 | 最后更新：2026年1月
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block bg-pink-500 text-white px-8 py-3 rounded-full font-medium hover:bg-pink-600 transition-colors"
          >
            返回首页
          </a>
        </div>
      </div>
    </div>
  )
}
