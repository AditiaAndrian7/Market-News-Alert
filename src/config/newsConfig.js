module.exports = {
  BASE_URL: "https://newsapi.org/v2/everything",

  queries: [
    "stock market OR stocks",
    "crypto OR bitcoin OR ethereum",
    "inflation OR interest rate OR fed",
    "oil price OR gold price",
    "geopolitics AND market",
  ],

  mainKeywords: [
    "stock",
    "market",
    "crypto",
    "bitcoin",
    "ethereum",
    "inflation",
    "interest rate",
    "fed",
    "central bank",
    "recession",
    "economy",
    "gdp",
    "oil",
    "commodity",
    "gold",
    "bond",
    "yield",
  ],

  geoKeywords: ["war", "conflict", "sanctions", "tension"],

  bannedKeywords: [
    "celebrity",
    "movie",
    "actor",
    "entertainment",
    "quote of the day",
    "lifestyle",
    "fashion",
  ],

  bannedSources: ["pypi.org", "github.com", "npmjs.com"],

  lowValueKeywords: [
    "bet his life savings",
    "personal story",
    "how i made",
    "my journey",
    "opinion",
    "editorial",
  ],
};
