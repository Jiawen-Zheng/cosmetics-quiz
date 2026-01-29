const sharp = require('sharp');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const TARGET_SIZE = 1200;

async function unifyProduct40() {
  const filePath = path.join(imagesDir, 'product-40.png');
  
  try {
    const metadata = await sharp(filePath).metadata();
    const originalSize = `${metadata.width}x${metadata.height}`;
    
    console.log(`处理 product-40.png: ${originalSize}`);
    
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
        kernel: 'lanczos3',
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
      .png({ quality: 100, compressionLevel: 0 })
      .toFile(filePath);
    
    console.log(`✓ product-40.png: ${originalSize} -> ${TARGET_SIZE}x${TARGET_SIZE}`);
    console.log('完成！');
    
  } catch (error) {
    console.error(`✗ 错误:`, error.message);
  }
}

unifyProduct40().catch(console.error);
