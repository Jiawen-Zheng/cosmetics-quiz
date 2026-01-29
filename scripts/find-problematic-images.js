const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');

async function findProblematicImages() {
  console.log('检查所有图片文件...\n');
  
  const problematic = [];
  
  for (let i = 1; i <= 50; i++) {
    const filename = `product-${i}.png`;
    const filePath = path.join(imagesDir, filename);
    
    try {
      // 检查文件是否存在
      if (!fs.existsSync(filePath)) {
        console.log(`❌ ${filename}: 文件不存在`);
        problematic.push({ file: filename, issue: '文件不存在' });
        continue;
      }
      
      // 检查文件大小
      const stats = fs.statSync(filePath);
      if (stats.size === 0) {
        console.log(`❌ ${filename}: 文件大小为0`);
        problematic.push({ file: filename, issue: '文件大小为0' });
        continue;
      }
      
      // 尝试用sharp读取图片
      try {
        const metadata = await sharp(filePath).metadata();
        
        // 检查图片尺寸
        if (metadata.width === 0 || metadata.height === 0) {
          console.log(`❌ ${filename}: 图片尺寸异常 (${metadata.width}x${metadata.height})`);
          problematic.push({ file: filename, issue: '图片尺寸异常' });
          continue;
        }
        
        // 尝试实际读取图片数据
        await sharp(filePath).toBuffer();
        
        // console.log(`✓ ${filename}: OK (${metadata.width}x${metadata.height}, ${stats.size} bytes)`);
        
      } catch (sharpError) {
        console.log(`❌ ${filename}: Sharp无法处理 - ${sharpError.message}`);
        problematic.push({ file: filename, issue: `Sharp错误: ${sharpError.message}` });
      }
      
    } catch (error) {
      console.log(`❌ ${filename}: 检查失败 - ${error.message}`);
      problematic.push({ file: filename, issue: error.message });
    }
  }
  
  console.log('\n=== 检查结果 ===');
  if (problematic.length === 0) {
    console.log('✅ 所有图片文件都正常！');
  } else {
    console.log(`\n发现 ${problematic.length} 个问题图片：\n`);
    problematic.forEach(item => {
      console.log(`- ${item.file}: ${item.issue}`);
    });
  }
}

findProblematicImages().catch(console.error);
