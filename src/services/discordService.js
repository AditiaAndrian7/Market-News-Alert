const { EmbedBuilder } = require("discord.js");
const { client } = require("../bot/discordClient");

function getColor(impact) {
  switch (impact) {
    case "HIGH":
      return 0xff0000;
    case "MEDIUM":
      return 0xffa500;
    case "LOW":
      return 0x00ff00;
    default:
      return 0x808080;
  }
}

async function sendNews(news, ai, category, time) {
  try {
    const channel = await client.channels.fetch(process.env.CHANNEL_ID);

    if (!channel) {
      console.log("Channel tidak ditemukan");
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle(news.title)
      .setURL(news.url)
      .setDescription(ai.summary)
      .addFields(
        { name: "Category", value: category, inline: true },
        { name: "Impact", value: ai.impact, inline: true },
        { name: "Time", value: time },
      )
      .setColor(getColor(ai.impact))
      .setFooter({ text: "AI News Bot" });

    await channel.send({ embeds: [embed] });
  } catch (err) {
    console.error("Discord Error:", err.message);
  }
}

module.exports = {
  sendNews,
};
