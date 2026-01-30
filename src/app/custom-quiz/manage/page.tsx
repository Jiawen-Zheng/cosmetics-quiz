'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CustomQuestion } from '@/types/question';
import { getCustomQuestions, deleteCustomQuestion, getMaxQuestions } from '@/utils/customQuestions';

export default function CustomQuizManage() {
  const [questions, setQuestions] = useState<CustomQuestion[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const maxQuestions = getMaxQuestions();

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    const loaded = getCustomQuestions();
    setQuestions(loaded);
  };

  const handleDelete = (id: string) => {
    if (deleteCustomQuestion(id)) {
      loadQuestions();
      setDeleteConfirm(null);
    } else {
      alert('删除失败，请重试');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4">
            <span className="mr-2">←</span> 返回首页
          </Link>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
            📝 我的自定义题目
          </h1>
          <p className="text-gray-600">管理你创建的所有题目</p>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-4 mb-6">
          {questions.length < maxQuestions ? (
            <Link href="/custom-quiz/create">
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                ➕ 创建新题目 ({questions.length}/{maxQuestions})
              </button>
            </Link>
          ) : (
            <button 
              disabled
              className="bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold cursor-not-allowed opacity-60"
              title="已达题目上限"
            >
              ➕ 已达上限 ({questions.length}/{maxQuestions})
            </button>
          )}
          
          {questions.length > 0 && (
            <Link href="/custom-quiz/test">
              <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                🎯 开始测试 ({questions.length}题)
              </button>
            </Link>
          )}
        </div>

        {/* 题目列表 */}
        {questions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">还没有自定义题目</h2>
            <p className="text-gray-600 mb-6">点击上方按钮创建你的第一道题目吧！</p>
            <Link href="/custom-quiz/create">
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                立即创建
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {questions.map((question, index) => (
              <div key={question.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative group">
                {/* 题号标签 */}
                <div className="absolute top-2 left-2 z-10 w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {index + 1}
                </div>

                {/* 删除按钮 */}
                <div className="absolute top-2 right-2 z-10">
                  {deleteConfirm === question.id ? (
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleDelete(question.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 transition-colors shadow-lg"
                      >
                        确认
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-3 py-1 bg-gray-500 text-white rounded-lg text-xs font-semibold hover:bg-gray-600 transition-colors shadow-lg"
                      >
                        取消
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(question.id)}
                      className="w-10 h-10 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-colors shadow-lg opacity-0 group-hover:opacity-100"
                    >
                      🗑️
                    </button>
                  )}
                </div>

                {/* 图片 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={question.image} 
                  alt={`题目 ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* 统计信息 */}
        {questions.length > 0 && (
          <div className="mt-8 bg-white/80 backdrop-blur rounded-xl p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-pink-600">{questions.length}</div>
                <div className="text-sm text-gray-600">总题目数</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">{questions.length * 10}</div>
                <div className="text-sm text-gray-600">总分值</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">
                  {Math.round((questions.reduce((sum, q) => sum + q.image.length, 0) / 1024 / 1024) * 10) / 10}MB
                </div>
                <div className="text-sm text-gray-600">存储空间</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
