const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');

async function checkImageSizes() {
  const files = fs.readdirSync(imagesDir)
    .filter(file => file.startsWith('product-') && file.endsWith('.png'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)[0]);
      const numB = parseInt(b.match(/\d+/)[0]);
      return numA - numB;
    });

  console.log('图像尺寸检查:\n');
  
  const sizes = {};
  
  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    try {
      const metadata = await sharp(filePath).metadata();
      const size = `${metadata.width}x${metadata.height}`;
      
      if (!sizes[size]) {
        sizes[size] = [];
      }
      sizes[size].push(file);
      
      console.log(`${file}: ${metadata.width}x${metadata.height}`);
    } catch (error) {
      console.error(`错误处理 ${file}:`, error.message);
    }
  }
  
  console.log('\n\n尺寸统计:');
  for (const [size, files] of Object.entries(sizes)) {
    console.log(`\n${size}: ${files.length} 个文件`);
    console.log(files.join(', '));
  }
}

checkImageSizes().catch(console.error);
