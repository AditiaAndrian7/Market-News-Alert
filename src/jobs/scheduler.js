const newsService = require("../services/newsService");
const filterService = require("../services/filterService");
const aiService = require("../services/aiService");
const discordService = require("../services/discordService");
const { initDiscord } = require("../bot/discordClient");
const { formatDate, getRelativeTime } = require("../utils/time");
const { SCAN_INTERVAL } = require("../config/appConfig");

// delay helper
function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// ==========================
// MAIN SCAN FUNCTION
// ==========================

async function runScan() {
  try {
    console.log("\nScan Mulai", new Date().toLocaleTimeString());

    const news = await newsService.getNews();
    console.log("Sebelum filter:", news.length);

    const filtered = filterService.filterNews(news);
    console.log("Setelah filter:", filtered.length);

    if (filtered.length === 0) {
      console.log("Tidak ada berita baru");
      console.log("Scan Selesai");
      return;
    }

    let count = 0;

    for (let item of filtered) {
      const ai = await aiService.summarizeNews(item);

      const timeFormatted = `${formatDate(item.publishedAt)} (${getRelativeTime(
        item.publishedAt,
      )})`;

      console.log("\n====================");
      console.log("Title:", item.title);
      console.log("Time:", timeFormatted);
      console.log("Category:", filterService.getCategory(item));
      console.log("Impact:", ai.impact);
      console.log("Summary:", ai.summary);
      console.log("Link:", item.url);

      await discordService.sendNews(
        item,
        ai,
        filterService.getCategory(item),
        timeFormatted,
      );

      count++;
      await delay(2000);
    }

    console.log("\nBerita dikirim:", count);
    console.log("Scan Selesai");
  } catch (err) {
    console.error("Scheduler Error:", err.message);
  }
}

// ==========================
// LOOP FUNCTION
// ==========================

async function startJob() {
  try {
    await initDiscord();
    async function loop() {
      await runScan();
      console.log("Menunggu", SCAN_INTERVAL / 60000, "menit berikutnya.\n");
      setTimeout(loop, SCAN_INTERVAL);
    }

    loop();
  } catch (err) {
    console.error("Start Job Error:", err.message);
  }
}

module.exports = {
  startJob,
};
