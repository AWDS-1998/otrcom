const fs = require("fs");
const path = require("path");

// قائمة الملفات التي تريد نسخها
const filesToCopy = ["otr.js", "otr.otr"];

// المسار الحالي للحزمة
const currentDir = __dirname;

// الجذر النهائي للمشروع
const destDir = path.resolve(currentDir, "../../../../");

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
