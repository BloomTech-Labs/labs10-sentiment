require("dotenv").config();
const express = require("express");
const SlackBot = require("slackbots");
const router = express.Router();

router.get("/", function(req, res) {
  res.status(200).send("Hello World");
});

// let bot = new SlackBot({
//   token: "xoxb-553324377632-553511725281-WNAzkmfvQwuwJ3kAiLqUb5uG",
//   name: "Moodbot"
// });

// bot.on("message", function() {
//   let params = {
//     icon_emoji: ":moodawe:"
//   };

//   bot.postMessageToUser("general", "meow", params);
// });

module.exports = router;
