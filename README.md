MARKET NEWS ALERT

Real-time financial news aggregator for Discord

NewsBot memindai berita global setiap 5 menit dan mengirimkan update ke Discord. Fokus pada stocks, crypto, commodities, interest rates, dan geopolitics. Konten yang tidak relevan seperti entertainment atau lifestyle secara otomatis di-ignore.

⚡ Fitur
Scan berita global via NewsAPI
Filter otomatis: main keywords, low-value content, dan sumber banned
Kirim berita ke Discord channel secara real-time
Struktur modular: bot, jobs, services, utils
.env untuk menyimpan token & API key agar aman
🛠️ Prerequisites
Node.js v24 atau lebih baru
npm
🚀 Instalasi
Clone repo:
git clone <repo-url>
cd NEWSBOT
Install dependencies:
npm install
Buat file .env di root folder (NEWSBOT/.env) dengan isi:
NEWS_API_KEY=your_newsapi_key
DISCORD_TOKEN=your_discord_bot_token
CHANNEL_ID=your_discord_channel_id
GEMINI_API_KEY=your_gemini_api_key

⚠️ Jangan commit .env agar token tetap aman

Jalankan bot:
npm run start

Mode development (auto-restart saat ada perubahan):

npm run dev
🗂️ Struktur Repo
NEWSBOT/
├─ node_modules/ # Dependencies npm
├─ src/
│ ├─ bot/
│ │ └─ discordClient.js
│ ├─ config/
│ │ ├─ aiConfig.js
│ │ ├─ appConfig.js
│ │ └─ newsConfig.js
│ ├─ jobs/
│ │ └─ scheduler.js
│ ├─ services/
│ │ ├─ aiService.js
│ │ ├─ discordService.js
│ │ ├─ filterService.js
│ │ └─ newsService.js
│ ├─ utils/
│ │ └─ time.js
│ └─ index.js
├─ .env # ISI API KEY DAN DISCORD TOKEN  
├─ .gitignore
├─ package.json
├─ package-lock.json
└─ README.md

🔧 Konfigurasi
newsConfig.js → keyword & sumber berita
aiConfig.js → konfigurasi AI (misal untuk analisis sentimen)
appConfig.js → pengaturan global bot
