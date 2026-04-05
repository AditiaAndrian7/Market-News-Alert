````markdown
# 📈 MARKET NEWS ALERT

**Real-time financial news aggregator for Discord**

NewsBot scans global news every 5 minutes and sends real-time updates directly to your Discord channel. Focused on **stocks, crypto, commodities, interest rates, and geopolitics**. Irrelevant content (entertainment, lifestyle, etc.) is automatically ignored.

---

## ⚡ Features

- Global news scanning via [NewsAPI](https://newsapi.org/)
- Smart filtering: keywords, low-value content, and banned sources
- Gemini AI integration for content relevance scoring
- Real-time Discord webhook delivery
- Modular architecture: `bot`, `jobs`, `services`, `utils`
- `.env` file for secure token & API key storage

---

## 🛠 Prerequisites

- **Node.js** v24 or higher
- **npm** (comes with Node.js)
- A [NewsAPI](https://newsapi.org/) API key
- A Discord Bot Token & Channel ID

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <repo-url>
cd NEWSBOT
```
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file in root directory

```env
NEWS_API_KEY=your_newsapi_key
DISCORD_TOKEN=your_discord_bot_token
CHANNEL_ID=your_discord_channel_id
GEMINI_API_KEY=your_gemini_api_key
```

> **Never commit `.env`** — it's already ignored via `.gitignore`

### 4. Run the bot

**Production mode:**

```bash
npm run start
```

**Development mode (auto-restart on changes):**

```bash
npm run dev
```

---

## 📁 Project Structure

```
NEWSBOT/
├── node_modules/               # Dependencies
├── src/
│   ├── bot/
│   │   └── discordClient.js    # Discord connection & handlers
│   ├── config/
│   │   ├── aiConfig.js         # Gemini AI settings
│   │   ├── appConfig.js        # Global bot configuration
│   │   └── newsConfig.js       # Keywords & source filters
│   ├── jobs/
│   │   └── scheduler.js        # Cron job (every 5 min)
│   ├── services/
│   │   ├── aiService.js        # Gemini relevance scoring
│   │   ├── discordService.js   # Discord message sender
│   │   ├── filterService.js    # Content filtering logic
│   │   └── newsService.js      # NewsAPI fetching
│   ├── utils/
│   │   └── time.js             # Timestamp utilities
│   └── index.js                # Application entry point
├── .env                        # API keys & tokens (ignored)
├── .gitignore                  # Ignore rules
├── package.json                # Dependencies & scripts
├── package-lock.json           # Lockfile
└── README.md                   # This file
```

---

## ⚙️ Configuration Files

| File            | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| `newsConfig.js` | Keywords, banned sources, low-value content patterns |
| `aiConfig.js`   | Gemini model settings & relevance thresholds         |
| `appConfig.js`  | Scan interval, channel settings, logging level       |

---

## 📌 Example Discord Output

```
📰 **[MARKET NEWS]** Fed signals rate cut in September
🕒 2 minutes ago | Source: Reuters
🔗 https://reuters.com/...
```

---

## 🧠 Tech Stack

- **Node.js** + **JavaScript (ES6+)**
- **Discord.js** — Discord bot integration
- **node-cron** — scheduling
- **NewsAPI** — news aggregation
- **Google Gemini API** — AI relevance scoring
- **dotenv** — environment management

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---
