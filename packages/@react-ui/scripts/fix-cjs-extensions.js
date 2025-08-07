const fs = require('fs');
const path = require('path');

// Simply copy .js files from dist-cjs to dist as .cjs files
const distCjs = './dist-cjs';
const dist = './dist';

function copyWithExtension(src, dest, oldExt, newExt) {
  if (!fs.existsSync(src)) return;

  const files = fs.readdirSync(src, { withFileTypes: true });

  files.forEach((file) => {
    if (file.isDirectory()) {
      const srcDir = path.join(src, file.name);
      const destDir = path.join(dest, file.name);
      fs.mkdirSync(destDir, { recursive: true });
      copyWithExtension(srcDir, destDir, oldExt, newExt);
    } else if (file.name.endsWith(oldExt)) {
      const srcFile = path.join(src, file.name);
      const destFile = path.join(dest, file.name.replace(oldExt, newExt));
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

copyWithExtension(distCjs, dist, '.js', '.cjs');
if (fs.existsSync(distCjs)) {
  fs.rmSync(distCjs, { recursive: true, force: true });
}
console.log('CommonJS files renamed to .cjs');
