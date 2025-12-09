import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ======================= STATIC FILES =======================
// Видача папки images (щоб React міг бачити картинки)
app.use("/images", express.static("images"));


// ======================= NEWS API ===========================
const NEWS_FILE = "./data/news.json";

function loadNews() {
  return JSON.parse(fs.readFileSync(NEWS_FILE, "utf8"));
}

function saveNews(news) {
  fs.writeFileSync(NEWS_FILE, JSON.stringify(news, null, 2));
}

// ➤ GET: всі новини
app.get("/api/news", (req, res) => {
  const news = loadNews().map(n => ({
    ...n,
    image: `images/${n.image}`   // додаємо шлях для фронта
  }));

  res.json(news);
});

// ➤ GET: одна новина
app.get("/api/news/:id", (req, res) => {
  const news = loadNews().map(n => ({
    ...n,
    image: `images/${n.image}`
  }));

  const item = news.find(n => n.id == req.params.id);
  item ? res.json(item) : res.status(404).json({ error: "Not found" });
});

// ➤ POST: додати новину
app.post("/api/news", (req, res) => {
  const news = loadNews();
  const newItem = { id: Date.now(), ...req.body };

  news.push(newItem);
  saveNews(news);

  res.json({
    ...newItem,
    image: `images/${newItem.image}`
  });
});


// ======================= CONTACT MESSAGES API ===========================
const MESSAGES_FILE = "./data/messages.json";

function loadMessages() {
  return JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf8"));
}

function saveMessages(messages) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

// ➤ GET: отримати всі повідомлення 
app.get("/api/messages", (req, res) => {
  res.json(loadMessages());
});

// ➤ POST: додати нове повідомлення
app.post("/api/messages", (req, res) => {
  const messages = loadMessages();

  const newMessage = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    date: new Date().toISOString()
  };

  messages.push(newMessage);
  saveMessages(messages);

  res.json({ success: true, message: newMessage });
});


// ======================= START SERVER ========================
app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});

