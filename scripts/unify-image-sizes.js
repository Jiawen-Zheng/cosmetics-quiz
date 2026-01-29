const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const TARGET_SIZE = 1200; // 目标尺寸：1200x1200，保持高分辨率

async function unifyImageSizes() {
  const files = fs.readdirSync(imagesDir)
    .filter(file => file.startsWith('product-') && file.endsWith('.png'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)[0]);
      const numB = parseInt(b.match(/\d+/)[0]);
      return numA - numB;
    });

  console.log(`开始统一图像尺寸到 ${TARGET_SIZE}x${TARGET_SIZE}...\n`);
  
  let processed = 0;
  let errors = 0;
  
  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    
    try {
      const metadata = await sharp(filePath).metadata();
      const originalSize = `${metadata.width}x${metadata.height}`;
      
      // 读取原始图像
      const image = sharp(filePath);
      
      // 创建一个白色背景的画布
      const canvas = sharp({
        create: {
          width: TARGET_SIZE,
          height: TARGET_SIZE,
          channels: 4,
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        }
      });
      
      // 计算缩放比例，保持宽高比
      const scale = Math.min(TARGET_SIZE / metadata.width, TARGET_SIZE / metadata.height);
      const newWidth = Math.round(metadata.width * scale);
      const newHeight = Math.round(metadata.height * scale);
      
      // 调整图像大小（使用高质量插值）
      const resizedBuffer = await image
        .resize(newWidth, newHeight, {
          kernel: 'lanczos3', // 使用最高质量的插值算法
          fit: 'inside'
        })
        .toBuffer();
      
      // 计算居中位置
      const left = Math.round((TARGET_SIZE - newWidth) / 2);
      const top = Math.round((TARGET_SIZE - newHeight) / 2);
      
      // 将调整后的图像合成到画布上
      await canvas
        .composite([{
          input: resizedBuffer,
          left: left,
          top: top
        }])
        .png({ quality: 100, compressionLevel: 0 }) // 无损PNG，不压缩
        .toFile(filePath);
      
      console.log(`✓ ${file}: ${originalSize} -> ${TARGET_SIZE}x${TARGET_SIZE}`);
      processed++;
      
    } catch (error) {
      console.error(`✗ 错误处理 ${file}:`, error.message);
      errors++;
    }
  }
  
  console.log(`\n完成！`);
  console.log(`成功处理: ${processed} 个文件`);
  if (errors > 0) {
    console.log(`失败: ${errors} 个文件`);
  }
}

unifyImageSizes().catch(console.error);
