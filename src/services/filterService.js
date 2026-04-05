const {
  mainKeywords,
  geoKeywords,
  bannedKeywords,
  bannedSources,
  lowValueKeywords,
} = require("../config/newsConfig");

const { MAX_NEWS } = require("../config/appConfig");

function cleanText(news) {
  return (news.title + " " + news.description).toLowerCase();
}

function isRelevant(news) {
  const text = cleanText(news);

  if (!news.title || !news.description || !news.url) return false;

  if (bannedSources.some((s) => news.url.includes(s))) return false;
  if (bannedKeywords.some((k) => text.includes(k))) return false;
  if (lowValueKeywords.some((k) => text.includes(k))) return false;

  if (mainKeywords.some((k) => text.includes(k))) return true;

  if (geoKeywords.some((k) => text.includes(k))) {
    if (
      text.includes("oil") ||
      text.includes("market") ||
      text.includes("economy") ||
      text.includes("trade") ||
      text.includes("supply")
    ) {
      return true;
    }
  }

  return false;
}

function getCategory(news) {
  const text = cleanText(news);

  if (text.includes("crypto") || text.includes("bitcoin")) return "Crypto";
  if (text.includes("stock")) return "Stock Market";
  if (text.includes("inflation") || text.includes("fed"))
    return "Macro Economy";
  if (text.includes("oil") || text.includes("gold")) return "Commodities";
  if (text.includes("war") || text.includes("conflict")) return "Geopolitics";

  return "Finance";
}

function scoreNews(news) {
  const text = cleanText(news);
  let score = 0;

  if (text.includes("fed")) score += 4;
  if (text.includes("interest rate")) score += 4;
  if (text.includes("inflation")) score += 3;
  if (text.includes("recession")) score += 3;
  if (text.includes("market")) score += 2;
  if (text.includes("crypto")) score += 2;
  if (text.includes("oil")) score += 2;
  if (text.includes("war")) score += 2;

  return score;
}

function removeDuplicates(newsList) {
  const seen = new Set();

  return newsList.filter((item) => {
    const key = item.title.slice(0, 60).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function filterNews(newsList) {
  const filtered = newsList.filter(isRelevant);
  const unique = removeDuplicates(filtered);
  const ranked = unique.sort((a, b) => scoreNews(b) - scoreNews(a));

  return ranked.slice(0, MAX_NEWS);
}

module.exports = { filterNews, getCategory };
