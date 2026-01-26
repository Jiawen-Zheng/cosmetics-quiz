/**
 * 图片自动优化脚本（使用 Sharp）
 * 功能：
 * 1. 自动压缩所有图片
 * 2. 统一尺寸为 800x800
 * 3. 转换为 WebP 格式（可选）
 * 4. 保留原文件备份
 */

const fs = require('fs');
const path = require('path');

// 检查是否安装了 sharp
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.log('❌ Sharp 未安装');
  console.log('📦 请先安装 Sharp:');
  console.log('   npm install sharp --save-dev');
  console.log('');
  console.log('或者使用在线工具优化图片：');
  console.log('   TinyPNG: https://tinypng.com');
  console.log('   Squoosh: https://squoosh.app');
  process.exit(1);
}

const imagesDir = path.join(__dirname, '../public/images');
const backupDir = path.join(__dirname, '../public/images-backup');

// 配置选项
const config = {
  // 是否转换为 WebP 格式
  convertToWebP: false, // 改为 true 可转换为 WebP
  
  // 图片质量（1-100）
  quality: 80,
  
  // 最大尺寸
  maxWidth: 800,
  maxHeight: 800,
  
  // 是否创建备份
  createBackup: true,
};

async function optimizeImages() {
  console.log('🚀 开始优化图片...\n');
  
  // 创建备份目录
  if (config.createBackup && !fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
    console.log('📁 创建备份目录: images-backup\n');
  }
  
  // 获取所有图片文件
  const files = fs.readdirSync(imagesDir);
  const imageFiles = files.filter(f => f.match(/\.(jpg|jpeg|png|gif)$/i));
  
  console.log(`📊 找到 ${imageFiles.length} 个图片文件\n`);
  
  let successCount = 0;
  let errorCount = 0;
  let totalSizeBefore = 0;
  let totalSizeAfter = 0;
  
  for (const file of imageFiles) {
    const inputPath = path.join(imagesDir, file);
    const backupPath = path.join(backupDir, file);
    
    try {
      // 获取原文件大小
      const statsBefore = fs.statSync(inputPath);
      totalSizeBefore += statsBefore.size;
      
      // 备份原文件
      if (config.createBackup) {
        fs.copyFileSync(inputPath, backupPath);
      }
      
      // 确定输出格式和路径
      let outputPath = inputPath;
      let outputFormat = path.extname(file).toLowerCase().slice(1);
      
      if (config.convertToWebP) {
        outputFormat = 'webp';
        outputPath = inputPath.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
      }
      
      // 优化图片
      const image = sharp(inputPath);
      const metadata = await image.metadata();
      
      // 调整尺寸（保持比例）
      if (metadata.width > config.maxWidth || metadata.height > config.maxHeight) {
        image.resize(config.maxWidth, config.maxHeight, {
          fit: 'inside',
          withoutEnlargement: true
        });
      }
      
      // 根据格式应用不同的压缩
      if (outputFormat === 'webp') {
        await image.webp({ quality: config.quality }).toFile(outputPath + '.tmp');
      } else if (outputFormat === 'jpg' || outputFormat === 'jpeg') {
        await image.jpeg({ quality: config.quality, progressive: true }).toFile(outputPath + '.tmp');
      } else if (outputFormat === 'png') {
        await image.png({ quality: config.quality, compressionLevel: 9 }).toFile(outputPath + '.tmp');
      }
      
      // 替换原文件
      fs.renameSync(outputPath + '.tmp', outputPath);
      
      // 如果转换为 WebP，删除原文件
      if (config.convertToWebP && outputPath !== inputPath) {
        fs.unlinkSync(inputPath);
      }
      
      // 获取优化后文件大小
      const statsAfter = fs.statSync(outputPath);
      totalSizeAfter += statsAfter.size;
      
      const sizeBefore = (statsBefore.size / 1024).toFixed(2);
      const sizeAfter = (statsAfter.size / 1024).toFixed(2);
      const reduction = ((1 - statsAfter.size / statsBefore.size) * 100).toFixed(1);
      
      console.log(`✅ ${file}: ${sizeBefore}KB → ${sizeAfter}KB (减少 ${reduction}%)`);
      successCount++;
      
    } catch (error) {
      console.log(`❌ ${file}: 优化失败 - ${error.message}`);
      errorCount++;
    }
  }
  
  // 统计结果
  console.log('\n' + '='.repeat(60));
  console.log('📈 优化完成！\n');
  console.log(`✅ 成功: ${successCount} 个文件`);
  if (errorCount > 0) {
    console.log(`❌ 失败: ${errorCount} 个文件`);
  }
  console.log(`\n📦 总大小: ${(totalSizeBefore / 1024 / 1024).toFixed(2)} MB → ${(totalSizeAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💾 节省空间: ${((totalSizeBefore - totalSizeAfter) / 1024 / 1024).toFixed(2)} MB (${((1 - totalSizeAfter / totalSizeBefore) * 100).toFixed(1)}%)`);
  
  if (config.createBackup) {
    console.log(`\n💡 原文件已备份到: images-backup/`);
  }
  
  if (config.convertToWebP) {
    console.log(`\n⚠️  已转换为 WebP 格式，需要更新代码中的图片路径`);
  }
}

// 运行优化
optimizeImages().catch(error => {
  console.error('❌ 优化过程出错:', error);
  process.exit(1);
});
