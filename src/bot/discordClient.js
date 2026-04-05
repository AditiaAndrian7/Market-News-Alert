const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

let isReady = false;

async function initDiscord() {
  if (isReady) return client;

  await client.login(process.env.DISCORD_TOKEN);

  return new Promise((resolve) => {
    client.once("clientReady", () => {
      console.log("Discord Ready:", client.user.tag);
      isReady = true;
      resolve(client);
    });
  });
}

module.exports = {
  client,
  initDiscord,
};
