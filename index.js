const fs = require("fs");
const path = require("path");

// قائمة الملفات التي تريد نسخها
const filesToCopy = ["otr.js", "otr.otr"];

// المسار الحالي للحزمة
const currentDir = __dirname;

// دالة للبحث عن مجلد node_modules في المسارات العليا
function findNodeModulesInParent(dir) {
  const parentDir = path.dirname(dir);

  if (parentDir === dir) {
    // وصلنا إلى الجذر ولم نجد node_modules
    return null;
  }

  const nodeModulesPath = path.join(parentDir, "node_modules");
  if (fs.existsSync(nodeModulesPath)) {
    return parentDir;
  }

  return findNodeModulesInParent(parentDir);
}

// العثور على المسار الذي يحتوي على node_modules في المسارات العليا
const projectRoot = findNodeModulesInParent(currentDir);

if (!projectRoot) {
  console.error("لم يتم العثور على مجلد node_modules في المسارات العليا");
  process.exit(1);
}

// الجذر النهائي للمشروع بجانب node_modules
const destDir = projectRoot;

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
