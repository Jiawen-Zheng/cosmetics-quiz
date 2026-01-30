import { CustomQuestion } from '@/types/question';

const STORAGE_KEY = 'cosmetics_custom_questions';
const MAX_QUESTIONS = 20; // 最大题目数量限制

// 生成唯一ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// 获取所有自定义题目
export function getCustomQuestions(): CustomQuestion[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('读取自定义题目失败:', error);
    return [];
  }
}

// 保存自定义题目
export function saveCustomQuestion(question: CustomQuestion): boolean {
  try {
    const questions = getCustomQuestions();
    
    // 检查是否超过最大数量限制
    if (questions.length >= MAX_QUESTIONS) {
      alert(`题目数量已达上限（${MAX_QUESTIONS}题），请删除一些题目后再创建`);
      return false;
    }
    
    questions.push(question);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
    return true;
  } catch (error) {
    console.error('保存自定义题目失败:', error);
    return false;
  }
}

// 获取最大题目数量限制
export function getMaxQuestions(): number {
  return MAX_QUESTIONS;
}

// 删除自定义题目
export function deleteCustomQuestion(id: string): boolean {
  try {
    const questions = getCustomQuestions();
    const filtered = questions.filter(q => q.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('删除自定义题目失败:', error);
    return false;
  }
}

// 更新自定义题目
export function updateCustomQuestion(id: string, updatedQuestion: CustomQuestion): boolean {
  try {
    const questions = getCustomQuestions();
    const index = questions.findIndex(q => q.id === id);
    if (index === -1) return false;
    
    questions[index] = updatedQuestion;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
    return true;
  } catch (error) {
    console.error('更新自定义题目失败:', error);
    return false;
  }
}

// 清空所有自定义题目
export function clearCustomQuestions(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('清空自定义题目失败:', error);
    return false;
  }
}

// 将图片文件转换为base64
export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('读取图片失败'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// 压缩图片
export function compressImage(file: File, maxWidth: number = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // 计算缩放比例
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('无法创建canvas上下文'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        
        // 转换为base64，质量0.8
        const base64 = canvas.toDataURL('image/jpeg', 0.8);
        resolve(base64);
      };
      img.onerror = () => reject(new Error('图片加载失败'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
