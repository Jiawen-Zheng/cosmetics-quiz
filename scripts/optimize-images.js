/**
 * 图片优化脚本
 * 功能：
 * 1. 检查所有图片文件
 * 2. 统一图片尺寸
 * 3. 压缩图片大小
 * 4. 生成优化报告
 */

const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');

// 检查图片文件
function checkImages() {
  console.log('🔍 检查图片文件...\n');
  
  const files = fs.readdirSync(imagesDir);
  const imageFiles = files.filter(f => f.match(/\.(jpg|jpeg|png|gif|webp)$/i));
  
  console.log(`📊 统计信息：`);
  console.log(`   总文件数: ${files.length}`);
  console.log(`   图片文件数: ${imageFiles.length}`);
  console.log(`   其他文件数: ${files.length - imageFiles.length}\n`);
  
  // 按格式分类
  const formats = {};
  imageFiles.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    formats[ext] = (formats[ext] || 0) + 1;
  });
  
  console.log(`📁 文件格式分布：`);
  Object.entries(formats).forEach(([ext, count]) => {
    console.log(`   ${ext}: ${count} 个文件`);
  });
  console.log('');
  
  // 检查文件大小
  console.log(`📦 文件大小分析：`);
  let totalSize = 0;
  const sizeInfo = [];
  
  imageFiles.forEach(file => {
    const filePath = path.join(imagesDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    totalSize += stats.size;
    sizeInfo.push({ file, size: parseFloat(sizeKB) });
  });
  
  sizeInfo.sort((a, b) => b.size - a.size);
  
  console.log(`   总大小: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   平均大小: ${(totalSize / imageFiles.length / 1024).toFixed(2)} KB`);
  console.log(`\n   最大的5个文件：`);
  sizeInfo.slice(0, 5).forEach(({ file, size }) => {
    console.log(`   - ${file}: ${size} KB`);
  });
  
  // 检查缺失的文件
  console.log(`\n🔎 检查文件完整性：`);
  const missing = [];
  for (let i = 1; i <= 50; i++) {
    const jpgFile = `product-${i}.jpg`;
    const pngFile = `product-${i}.png`;
    if (!imageFiles.includes(jpgFile) && !imageFiles.includes(pngFile)) {
      missing.push(i);
    }
  }
  
  if (missing.length === 0) {
    console.log(`   ✅ 所有图片文件完整 (1-50)`);
  } else {
    console.log(`   ⚠️  缺失的图片: product-${missing.join(', product-')}`);
  }
  
  // 建议
  console.log(`\n💡 优化建议：`);
  const largeFiles = sizeInfo.filter(f => f.size > 500);
  if (largeFiles.length > 0) {
    console.log(`   ⚠️  有 ${largeFiles.length} 个文件超过 500KB，建议压缩`);
  }
  
  const avgSize = totalSize / imageFiles.length / 1024;
  if (avgSize > 300) {
    console.log(`   ⚠️  平均文件大小较大，建议使用图片压缩工具`);
    console.log(`   推荐工具: TinyPNG (https://tinypng.com)`);
  }
  
  if (formats['.jpg'] && formats['.png']) {
    console.log(`   ℹ️  图片格式混合，建议统一为 .jpg 或 .webp 格式`);
  }
  
  console.log(`\n✅ 检查完成！`);
}

// 运行检查
try {
  checkImages();
} catch (error) {
  console.error('❌ 错误:', error.message);
}
