'use client';

import Link from 'next/link'
import { useState, useEffect } from 'react'
import ActivationModal from '@/components/ActivationModal'
import { isDeviceActivated, activateDevice } from '@/utils/deviceFingerprint'

export default function Home() {
  const [isActivated, setIsActivated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activationError, setActivationError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 检查设备是否已激活
    const activated = isDeviceActivated();
    setIsActivated(activated);
    setShowModal(!activated);
    setIsLoading(false);
  }, []);

  const handleActivate = (code: string) => {
    const success = activateDevice(code);
    
    if (success) {
      setIsActivated(true);
      setShowModal(false);
      setActivationError('');
    } else {
      setActivationError('兑换码无效，请检查后重试');
    }
  };

  // 加载中状态
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-8 px-4">
      {/* 激活弹窗 */}
      {showModal && (
        <ActivationModal 
          onActivate={handleActivate}
          error={activationError}
        />
      )}

      <div className="text-center max-w-4xl w-full">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
            💄 化妆品知识测试
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 font-medium">
            看看你能对几题
          </p>
        </div>
        
        {/* 测试模式选择 - 只有激活后才可点击 */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* 随机测试模式 */}
          {isActivated ? (
            <Link href="/quiz?mode=random">
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-pink-400">
                <div className="text-5xl mb-4">✨</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">随机测试</h2>
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 mb-4">
                  <div className="text-3xl font-bold text-pink-600 mb-2">10题</div>
                  <div className="text-sm text-gray-600">每题 10 分</div>
                </div>
                <ul className="text-left space-y-2 text-gray-600 mb-6">
                  <li>🎲 随机抽取10道题</li>
                  <li>🎯 每题4个选项</li>
                  <li>⏱️ 不限时间</li>
                  <li>💯 满分100分</li>
                </ul>
                <div className="bg-pink-500 text-white py-3 px-6 rounded-full font-semibold inline-block">
                  开始随机测试 →
                </div>
              </div>
            </Link>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8 opacity-60 cursor-not-allowed border-2 border-gray-200">
              <div className="text-5xl mb-4">✨</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">随机测试</h2>
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 mb-4">
                <div className="text-3xl font-bold text-pink-600 mb-2">10题</div>
                <div className="text-sm text-gray-600">每题 10 分</div>
              </div>
              <ul className="text-left space-y-2 text-gray-600 mb-6">
                <li>🎲 随机抽取10道题</li>
                <li>🎯 每题4个选项</li>
                <li>⏱️ 不限时间</li>
                <li>💯 满分100分</li>
              </ul>
              <div className="bg-gray-400 text-white py-3 px-6 rounded-full font-semibold inline-block">
                🔒 需要激活
              </div>
            </div>
          )}

          {/* 全部题库测试模式 */}
          {isActivated ? (
            <Link href="/quiz?mode=full">
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-400">
                <div className="text-5xl mb-4">📚</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">全部题库</h2>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">50题</div>
                  <div className="text-sm text-gray-600">每题 2 分</div>
                </div>
                <ul className="text-left space-y-2 text-gray-600 mb-6">
                  <li>✨ 全部50道题目</li>
                  <li>🎯 每题4个选项</li>
                  <li>⏱️ 不限时间</li>
                  <li>💯 满分100分</li>
                </ul>
                <div className="bg-purple-500 text-white py-3 px-6 rounded-full font-semibold inline-block">
                  开始全部测试 →
                </div>
              </div>
            </Link>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8 opacity-60 cursor-not-allowed border-2 border-gray-200">
              <div className="text-5xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">全部题库</h2>
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-4">
                <div className="text-3xl font-bold text-purple-600 mb-2">50题</div>
                <div className="text-sm text-gray-600">每题 2 分</div>
              </div>
              <ul className="text-left space-y-2 text-gray-600 mb-6">
                <li>✨ 全部50道题目</li>
                <li>🎯 每题4个选项</li>
                <li>⏱️ 不限时间</li>
                <li>💯 满分100分</li>
              </ul>
              <div className="bg-gray-400 text-white py-3 px-6 rounded-full font-semibold inline-block">
                🔒 需要激活
              </div>
            </div>
          )}
        </div>

        {/* 自定义测试模块 - 独立显示，不需要激活 */}
        <div className="mb-8">
          <Link href="/custom-quiz/manage">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-400 max-w-2xl mx-auto">
              <div className="text-5xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">自定义测试</h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
                <div className="text-3xl font-bold text-blue-600 mb-2">自由创建</div>
                <div className="text-sm text-gray-600">自己出题，自己测试</div>
              </div>
              <ul className="text-left space-y-2 text-gray-600 mb-6">
                <li>📷 拍照上传图片</li>
                <li>✏️ 自定义题目和选项</li>
                <li>💾 本地保存，设备绑定</li>
                <li>🎯 随时添加和删除</li>
              </ul>
              <div className="bg-blue-500 text-white py-3 px-6 rounded-full font-semibold inline-block">
                进入自定义测试 →
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-xl p-6 mb-6 max-w-2xl mx-auto">
          <p className="text-gray-600 text-sm leading-relaxed">
            💡 <span className="font-semibold">提示：</span>
            {isActivated 
              ? '随机测试适合快速体验，全部题库适合系统学习。自定义测试让你可以创建自己的题目。三种模式都是满分100分，选择你喜欢的方式开始吧！'
              : '请先输入兑换码激活测试，激活后即可开始答题。自定义测试无需激活，可直接使用。'
            }
          </p>
        </div>
        
        <div className="mt-8">
          <Link href="/copyright" className="text-sm text-gray-500 hover:text-gray-700 underline">
            版权声明
          </Link>
        </div>
      </div>
    </div>
  )
}
