import express from "express";
import config from "./KaguyaSetUp/config.js";
import { log } from "./logger/index.js";
import { spawn } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// تحديد مسار المجلد الجذري للمشروع
const __dirname = dirname(fileURLToPath(import.meta.url));

// إعدادات البوت
const app = express();
const PORT = process.env.PORT || config.port || 8040;
const BOT_NAME = "دورا بوت";
const DEVELOPER = "حمودي سان 🇸🇩";
const FB_LINK = "https://www.facebook.com/babasnfor80";

// تفعيل خدمة الملفات الثابتة (مثل صفحة index.html)
app.use("/assets", express.static(join(__dirname, "utils/assets")));

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "./utils/index.html"));
});

// تشغيل الخادم
app.listen(PORT, () => {
  log([
    { message: "[ EXPRESSJS ]: ", color: "green" },
    { message: `✅ ${BOT_NAME} تم تشغيل الخادم بنجاح | `, color: "white" },
    { message: `المنفذ: ${PORT} | `, color: "yellow" },
    { message: `المطور: ${DEVELOPER}`, color: "magenta" },
  ]);

  // عرض رسالة في الكونسول
  console.log(`🔗 افتح في المتصفح: http://localhost:${PORT}`);
  console.log(`📞 مطور البوت: ${DEVELOPER}`);
  console.log(`📘 فيسبوك: ${FB_LINK}`);
});

// دالة لإعادة تشغيل عملية البوت تلقائياً
function startBotProcess(script) {
  const child = spawn(
    "node",
    ["--trace-warnings", "--async-stack-traces", script],
    {
      cwd: __dirname,
      stdio: "inherit", // يُظهر النتائج في الكونسول
      shell: true,
    }
  );

  child.on("close", (codeExit) => {
    log([
      { message: "[ RESTART ]: ", color: "yellow" },
      { message: `${script} انتهت العملية بالرمز `, color: "white" },
      { message: `${codeExit}`, color: codeExit === 0 ? "green" : "red" },
    ]);

    if (codeExit !== 0) {
      log([
        { message: "[ SYSTEM ]: ", color: "blue" },
        { message: "إعادة تشغيل البوت بعد 3 ثوانٍ...", color: "yellow" },
      ]);
      setTimeout(() => startBotProcess(script), 3000);
    }
  });

  child.on("error", (error) => {
    log([
      { message: "[ ERROR ]: ", color: "red" },
      { message: `فشل في تشغيل ${script}: ${error.message}`, color: "white" },
    ]);
  });
}

// بدء تشغيل البوت الرئيسي
startBotProcess("index.js");
