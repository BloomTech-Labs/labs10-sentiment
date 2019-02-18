const SlackBot = require("slackbots");
const axios = require("axios");
const bot = new SlackBot({
  token: "xoxb-553324377632-553511725281-V29P7AABiDTaldlHEey6zDF2",
  name: "moodbot"
});

bot.on("start", () => {
  let params = {
    icon_emoji: ":moodawe:"
  };

  bot.postMessageToChannel(
    "general",
    "Check on your team with @moodbot!",
    params
  );
});
