const fs = require("fs");
const path = require("path");

// قائمة الملفات التي تريد نسخها
const filesToCopy = ["otr.js", "otr.otr"];

// المسار الحالي للحزمة
const currentDir = __dirname;

// دالة للبحث عن مجلد node_modules في المسار الحالي أو المسارات العليا
function findNodeModules(dir) {
  if (dir === path.parse(dir).root) {
    return null;
  }
  const nodeModulesPath = path.join(dir, "node_modules");
  if (fs.existsSync(nodeModulesPath)) {
    return nodeModulesPath;
  }
  return findNodeModules(path.dirname(dir));
}

// العثور على مجلد node_modules
const nodeModulesDir = findNodeModules(currentDir);
if (!nodeModulesDir) {
  console.error("لم يتم العثور على مجلد node_modules");
  process.exit(1);
}

// الجذر النهائي للمشروع بجانب node_modules
const destDir = path.dirname(nodeModulesDir);

filesToCopy.forEach((file) => {
  const srcFile = path.join(currentDir, file);
  const destFile = path.join(destDir, file);

  // التحقق من وجود الملف قبل نسخه
  if (fs.existsSync(srcFile)) {
    try {
      fs.copyFileSync(srcFile, destFile);
      console.log(`Copied ${file} to ${destDir}`);
    } catch (error) {
      console.error(`Error copying ${file}: ${error.message}`);
    }
  } else {
    console.error(`File ${srcFile} does not exist`);
  }
});
