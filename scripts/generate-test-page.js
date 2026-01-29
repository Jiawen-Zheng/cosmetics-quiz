const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');

console.log('生成图片测试HTML页面...\n');

let html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>图片测试页面</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      color: #333;
      text-align: center;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }
    .item {
      background: white;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }
    .item img {
      width: 100%;
      height: 200px;
      object-fit: contain;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #fafafa;
    }
    .item img.error {
      border-color: #f44336;
      background: #ffebee;
    }
    .item.success {
      border: 2px solid #4caf50;
    }
    .item.error {
      border: 2px solid #f44336;
    }
    .label {
      margin-top: 10px;
      font-weight: bold;
      color: #666;
    }
    .status {
      margin-top: 5px;
      font-size: 12px;
    }
    .status.success {
      color: #4caf50;
    }
    .status.error {
      color: #f44336;
    }
    .summary {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      text-align: center;
    }
    .summary h2 {
      margin: 0 0 10px 0;
      color: #333;
    }
    .stats {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin-top: 15px;
    }
    .stat {
      font-size: 24px;
      font-weight: bold;
    }
    .stat.success {
      color: #4caf50;
    }
    .stat.error {
      color: #f44336;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🖼️ 化妆品图片测试页面</h1>
    
    <div class="summary">
      <h2>加载统计</h2>
      <div class="stats">
        <div>
          <div class="stat success" id="successCount">0</div>
          <div>成功</div>
        </div>
        <div>
          <div class="stat error" id="errorCount">0</div>
          <div>失败</div>
        </div>
      </div>
      <div id="errorList" style="margin-top: 20px; color: #f44336; font-weight: bold;"></div>
    </div>
    
    <div class="grid" id="grid">
`;

for (let i = 1; i <= 50; i++) {
  html += `
      <div class="item" id="item-${i}">
        <img 
          src="/images/product-${i}.png" 
          alt="Product ${i}"
          onload="imageLoaded(${i})"
          onerror="imageError(${i})"
        />
        <div class="label">product-${i}.png</div>
        <div class="status" id="status-${i}">加载中...</div>
      </div>
`;
}

html += `
    </div>
  </div>
  
  <script>
    let successCount = 0;
    let errorCount = 0;
    const errors = [];
    
    function imageLoaded(num) {
      successCount++;
      document.getElementById('successCount').textContent = successCount;
      document.getElementById('item-' + num).classList.add('success');
      document.getElementById('status-' + num).textContent = '✓ 加载成功';
      document.getElementById('status-' + num).classList.add('success');
    }
    
    function imageError(num) {
      errorCount++;
      errors.push(num);
      document.getElementById('errorCount').textContent = errorCount;
      document.getElementById('item-' + num).classList.add('error');
      document.getElementById('item-' + num).querySelector('img').classList.add('error');
      document.getElementById('status-' + num).textContent = '✗ 加载失败';
      document.getElementById('status-' + num).classList.add('error');
      
      updateErrorList();
    }
    
    function updateErrorList() {
      if (errors.length > 0) {
        document.getElementById('errorList').textContent = 
          '失败的图片编号：' + errors.join(', ');
      }
    }
    
    // 5秒后检查是否还有未加载的
    setTimeout(() => {
      const total = 50;
      const loaded = successCount + errorCount;
      if (loaded < total) {
        console.warn('有 ' + (total - loaded) + ' 个图片未完成加载');
      }
    }, 5000);
  </script>
</body>
</html>
`;

const outputPath = path.join(__dirname, '../public/test-images.html');
fs.writeFileSync(outputPath, html, 'utf8');

console.log('✓ 测试页面已生成：public/test-images.html');
console.log('\n请在浏览器中访问：');
console.log('  http://localhost:3000/test-images.html');
console.log('\n这个页面会显示所有50个图片的加载状态');
console.log('失败的图片会用红色标记，并在顶部显示编号');
