// const SlackBot = require("slackbots");
// const axios = require("axios");
// const bot = new SlackBot({
//   token: "xoxb-553324377632-553511725281-cCu87sKsUMLBgYnisyfvbgQT",
//   name: "moodbot"
// });

// bot.on("start", () => {
//   let params = {
//     icon_emoji: ":moodawe:"
//   };

//   bot.postMessageToChannel(
//     "mood-bot",
//     "Check in on your team with @moodbot!",
//     params
//   );
// });
// require("dotenv").config();

const server = require("./server.js");
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server listening ${port}`);
});
