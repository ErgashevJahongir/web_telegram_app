const { Telegraf } = require("telegraf");
const TOKEN = "6099013146:AAGOyIUp38iq9xRej7E4pUQmBJ4VSwU8Oo4";
const bot = new Telegraf(TOKEN);

const web_link = "https://web-telegram-app.vercel.app/";

bot.start((ctx) =>
  ctx.reply("Welcome : my book store bot", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();
