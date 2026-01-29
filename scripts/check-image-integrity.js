const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');

console.log('检查图片文件完整性...\n');

let hasIssues = false;

for (let i = 1; i <= 50; i++) {
  const filename = `product-${i}.png`;
  const filePath = path.join(imagesDir, filename);
  
  try {
    const stats = fs.statSync(filePath);
    
    // 检查文件大小
    if (stats.size === 0) {
      console.log(`❌ ${filename}: 文件大小为0`);
      hasIssues = true;
    } else if (stats.size < 1000) {
      console.log(`⚠️  ${filename}: 文件太小 (${stats.size} bytes)`);
      hasIssues = true;
    } else {
      // 读取文件头检查是否是有效的PNG
      const buffer = fs.readFileSync(filePath);
      const pngSignature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
      
      if (!buffer.slice(0, 8).equals(pngSignature)) {
        console.log(`❌ ${filename}: 不是有效的PNG文件`);
        hasIssues = true;
      }
    }
  } catch (error) {
    console.log(`❌ ${filename}: 文件不存在或无法读取`);
    hasIssues = true;
  }
}

if (!hasIssues) {
  console.log('✅ 所有图片文件都正常！');
} else {
  console.log('\n发现问题，需要修复。');
}
