const SlackBot = require("slackbots");
const axios = require("axios");
const bot = new SlackBot({
  token: "xoxb-553324377632-553511725281-GBjmVB6Aqv3zk9MZYjzthrsC",
  name: "moodbot"
});

bot.on("start", () => {
  let params = {
    icon_emoji: ":moodawe:"
  };

  bot.postMessageToChannel(
    "mood-bot",
    "Check in on your team with @moodbot!",
    params
  );
});
