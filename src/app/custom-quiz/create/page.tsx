'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CustomQuestion } from '@/types/question';
import { saveCustomQuestion, generateId, compressImage, getCustomQuestions, getMaxQuestions } from '@/utils/customQuestions';

export default function CreateCustomQuiz() {
  const router = useRouter();
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  
  const [image, setImage] = useState<string>('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<[string, string, string, string]>(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 检查是否已达上限
  useEffect(() => {
    const questions = getCustomQuestions();
    const maxQuestions = getMaxQuestions();
    if (questions.length >= maxQuestions) {
      alert(`题目数量已达上限（${maxQuestions}题），请删除一些题目后再创建`);
      router.push('/custom-quiz/manage');
    }
  }, [router]);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }

    // 检查文件大小（限制10MB）
    if (file.size > 10 * 1024 * 1024) {
      alert('图片文件过大，请选择小于10MB的图片');
      return;
    }

    setIsUploading(true);
    try {
      const compressed = await compressImage(file, 800);
      setImage(compressed);
    } catch (error) {
      console.error('图片处理失败:', error);
      alert('图片处理失败，请重试');
    } finally {
      setIsUploading(false);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions: [string, string, string, string] = [...options] as [string, string, string, string];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSave = () => {
    // 验证表单
    if (!image) {
      alert('请上传题目图片');
      return;
    }
    if (!question.trim()) {
      alert('请输入题目问题');
      return;
    }
    if (options.some(opt => !opt.trim())) {
      alert('请填写所有选项');
      return;
    }

    setIsSaving(true);

    const newQuestion: CustomQuestion = {
      id: generateId(),
      image,
      question: question.trim(),
      options: options.map(opt => opt.trim()) as [string, string, string, string],
      correctAnswer,
      createdAt: Date.now()
    };

    if (saveCustomQuestion(newQuestion)) {
      alert('题目创建成功！');
      router.push('/custom-quiz/manage');
    } else {
      alert('保存失败，请重试');
      setIsSaving(false);
    }
  };

  const canSave = image && question.trim() && options.every(opt => opt.trim());

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* 头部 */}
        <div className="mb-8">
          <Link href="/custom-quiz/manage" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4">
            <span className="mr-2">←</span> 返回管理
          </Link>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
            ✨ 创建新题目
          </h1>
          <p className="text-gray-600">上传图片并设置题目选项</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* 图片上传 */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              1️⃣ 上传题目图片
            </label>
            
            {/* 拍照输入 */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageSelect}
              className="hidden"
            />
            
            {/* 相册输入 */}
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />

            {!image ? (
              <div className="space-y-4">
                {/* 拍照按钮 */}
                <button
                  onClick={() => cameraInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full h-32 border-3 border-dashed border-gray-300 rounded-xl hover:border-pink-400 hover:bg-pink-50 transition-all flex flex-col items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-pink-600"></div>
                      <p className="text-gray-600">处理中...</p>
                    </>
                  ) : (
                    <>
                      <div className="text-5xl">📷</div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-700">拍照</p>
                        <p className="text-sm text-gray-500">打开相机拍摄照片</p>
                      </div>
                    </>
                  )}
                </button>

                {/* 从相册选择按钮 */}
                <button
                  onClick={() => galleryInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full h-32 border-3 border-dashed border-gray-300 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all flex flex-col items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600"></div>
                      <p className="text-gray-600">处理中...</p>
                    </>
                  ) : (
                    <>
                      <div className="text-5xl">🖼️</div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-700">从相册选择</p>
                        <p className="text-sm text-gray-500">从设备相册中选择图片</p>
                      </div>
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500">
                  支持 JPG、PNG 格式，最大 10MB
                </p>
              </div>
            ) : (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={image} 
                  alt="预览" 
                  className="w-full h-64 object-contain rounded-xl border-2 border-gray-200"
                />
                <button
                  onClick={() => setImage('')}
                  className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  🗑️ 重新选择
                </button>
              </div>
            )}
          </div>

          {/* 题目问题 */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              2️⃣ 输入题目问题
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="例如：这是什么化妆品？"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-400 focus:outline-none text-lg"
              maxLength={100}
            />
            <p className="text-sm text-gray-500 mt-2">
              {question.length}/100 字符
            </p>
          </div>

          {/* 选项设置 */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              3️⃣ 设置四个选项（点击右侧按钮设置正确答案）
            </label>
            <div className="space-y-4">
              {options.map((option, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`选项 ${String.fromCharCode(65 + index)}`}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-400 focus:outline-none"
                    maxLength={50}
                  />
                  <button
                    onClick={() => setCorrectAnswer(index)}
                    className={`px-4 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                      correctAnswer === index
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-600 hover:bg-green-100 hover:text-green-700'
                    }`}
                  >
                    {correctAnswer === index ? '✓ 正确答案' : '设为正确'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 当前正确答案提示 */}
          <div className="mb-8 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
            <p className="text-green-700 font-semibold">
              ✓ 正确答案：选项 {String.fromCharCode(65 + correctAnswer)}
              {options[correctAnswer] && ` - ${options[correctAnswer]}`}
            </p>
          </div>

          {/* 保存按钮 */}
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={!canSave || isSaving}
              className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${
                canSave && !isSaving
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSaving ? '保存中...' : '💾 保存题目'}
            </button>
            <Link href="/custom-quiz/manage" className="flex-shrink-0">
              <button className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-300 transition-colors">
                取消
              </button>
            </Link>
          </div>
        </div>

        {/* 提示信息 */}
        <div className="mt-6 bg-white/80 backdrop-blur rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-3">💡 创建提示</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• 可以选择拍照或从相册导入图片</li>
            <li>• 图片会自动压缩以节省存储空间</li>
            <li>• 题目和选项会保存在你的设备本地</li>
            <li>• <span className="text-green-600 font-semibold">点击"设为正确"按钮可以指定任意选项为正确答案</span></li>
            <li>• 默认选项A为正确答案，你可以随时更改</li>
            <li>• 建议使用清晰的产品图片</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
