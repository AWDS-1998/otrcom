import fs from "fs";
import { execSync } from "child_process";

// مسار ملف .otr الأصلي
const originalFile = "otr.otr";

// قراءة محتوى الملف الأصلي
const content = fs.readFileSync(originalFile, "utf-8");

// كتابة المحتوى إلى ملف مؤقت بامتداد .js
const tempFile = "temp-otr.otr.js";
fs.writeFileSync(tempFile, content);

// تشغيل الملف المؤقت
try {
    execSync(`node ${tempFile}`, { stdio: "inherit" });
    console.log("Script executed successfully.");
} catch (error) {
    console.error("Error executing the script:", error);
} finally {
    // حذف الملف المؤقت
    fs.unlinkSync(tempFile);
}
