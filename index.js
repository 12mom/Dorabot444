// index.js

// ====== إعدادات أساسية ======
const BOT_NAME = "دورا";
const DEV_NAME = "حمودي سان 🇸🇩";

// ====== كود البوت ======
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// استقبال الرسائل
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
        <h1>🤖 بوت ${BOT_NAME}</h1>
        <p>✨ المطور: ${DEV_NAME}</p>
        <p>البوت يعمل الآن بنجاح 🚀</p>
    `);
});

// مثال أمر ترحيب
app.post("/webhook", (req, res) => {
    const message = req.body.message?.text || "";

    let reply = "";

    if (/^مرحبا|السلام/i.test(message)) {
        reply = `👋 أهلاً بك في بوت ${BOT_NAME}!\n💻 المطور: ${DEV_NAME}`;
    } else {
        reply = `😄 أنا ${BOT_NAME}، كيف أقدر أساعدك اليوم؟`;
    }

    console.log(`📩 رسالة من المستخدم: ${message}`);
    console.log(`📤 رد البوت: ${reply}`);

    res.send({ reply });
});

app.listen(PORT, () => {
    console.log(`🚀 بوت ${BOT_NAME} شغال على المنفذ ${PORT}`);
});
