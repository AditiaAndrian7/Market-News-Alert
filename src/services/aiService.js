const { GoogleGenerativeAI } = require("@google/generative-ai");
const { AI_DELAY } = require("../config/appConfig");
const {
  MODEL,
  MAX_RETRY,
  RETRY_DELAY,
  PROMPT_TEMPLATE,
} = require("../config/aiConfig");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: MODEL,
});

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// ==========================
// BUILD PROMPT DINAMIS
// ==========================

function buildPrompt(news) {
  return PROMPT_TEMPLATE.replace("{{title}}", news.title || "")
    .replace("{{description}}", news.description || "")
    .replace("{{content}}", news.content || "");
}

// ==========================
// MAIN FUNCTION
// ==========================

async function summarizeNews(news, retry = 0) {
  try {
    const prompt = buildPrompt(news);

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    await delay(AI_DELAY);

    return parseAIResponse(text);
  } catch (err) {
    const message = err.message || "";

    // HANDLE RATE LIMIT
    if (message.includes("429") && retry < MAX_RETRY) {
      console.log("⚠️ Rate limit, retry...");
      await delay(RETRY_DELAY);
      return summarizeNews(news, retry + 1);
    }

    console.error("Gemini Error:", message);

    return {
      summary: trimText(news.description || "No summary available"),
      impact: "UNKNOWN",
    };
  }
}

// ==========================
// PARSE RESPONSE
// ==========================

function parseAIResponse(text) {
  if (!text) {
    return {
      summary: "No summary generated",
      impact: "UNKNOWN",
    };
  }

  const summaryMatch = text.match(/Summary:\s*([\s\S]*?)(?:Impact:|$)/i);
  const impactMatch = text.match(/Impact:\s*(LOW|MEDIUM|HIGH)/i);

  return {
    summary: summaryMatch ? trimText(summaryMatch[1].trim()) : trimText(text),
    impact: impactMatch ? impactMatch[1].toUpperCase() : "UNKNOWN",
  };
}

// ==========================
// TRIM
// ==========================

function trimText(text, max = 400) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) + "..." : text;
}

module.exports = {
  summarizeNews,
};
