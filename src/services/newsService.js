const axios = require("axios");
const { BASE_URL, queries } = require("../config/newsConfig");
const { NEWS_WINDOW } = require("../config/appConfig");

async function fetchByQuery(query) {
  try {
    const now = new Date();
    const from = new Date(now.getTime() - NEWS_WINDOW);

    const res = await axios.get(BASE_URL, {
      params: {
        q: query,
        language: "en",
        sortBy: "publishedAt",
        pageSize: 10,
        from: from.toISOString(),
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    return res.data.articles || [];
  } catch (err) {
    console.error(`Error fetching query: ${query}`, err.message);
    return [];
  }
}

function removeDuplicates(newsList) {
  const seen = new Set();

  return newsList.filter((item) => {
    const key = item.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function getNews() {
  let allNews = [];

  for (const query of queries) {
    const result = await fetchByQuery(query);
    allNews = allNews.concat(result);
  }

  const uniqueNews = removeDuplicates(allNews);

  return uniqueNews.filter(
    (n) => n.title && n.description && n.url && n.publishedAt,
  );
}

module.exports = { getNews };
