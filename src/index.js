require("dotenv").config();
const { startJob } = require("./jobs/scheduler");
console.log("Bot Aktif!\n");
startJob();
