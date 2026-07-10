const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processImages(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const filePath = path.join(dir, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      await processImages(filePath);
      continue;
    }

    if (ext === '.avif') {
      continue;
    }
    
    if (['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(ext)) {
      const parsed = path.parse(file);
      const newName = parsed.name.replace(/\.[^/.]+$/, "") + '.avif';
      const newPath = path.join(dir, newName);
      
      try {
        await sharp(filePath)
          .avif({ quality: 80 })
          .toFile(newPath);
        console.log(`Converted ${filePath} -> ${newPath}`);
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

const targetDir = path.join(__dirname, 'public', 'images');
processImages(targetDir).then(() => console.log('Done'));
