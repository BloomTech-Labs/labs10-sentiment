// const SlackBot = require("slackbots");
const axios = require("axios");
// const bot = new SlackBot({
//   token: "xoxb-553324377632-553511725281-K35gpSdumrvX0lOq5CqpHYdq",
//   name: "moodbot"
// });

// bot.on("start", () => {
//   let params = {
//     icon_emoji: ":moodawe:"
//   };

//   bot.postMessageToChannel(
//     "general",
//     "Check on your team with @moodbot!",
//     params
//   );
// });

// const endpoint =
//   "https://hooks.slack.com/services/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";

// const test = () => {
//   axios.post(endpoint, {
//     text: "Survey question from Mood Bot:",
//     attachments: [
//       {
//         title: "How do you feel?",
//         actions: [
//           {
//             name: "feelings_list",
//             type: "select",
//             text: "Add a Feeling...",
//             data_source: "static",
//             options: [
//               {
//                 text: "Launch Blocking",
//                 value: "launch-blocking"
//               },
//               {
//                 text: "Enhancement",
//                 value: "enhancement"
//               },
//               {
//                 text: "Bug",
//                 value: "bug"
//               }
//             ]
//           },
//           {
//             name: "action",
//             type: "button",
//             text: "Submit",
//             style: "",
//             value: "complete"
//           }
//         ]
//       }
//     ]
//   });
// };

// test();

// const endpoint1 = "https://mood-dev-team.slack.com/api/team.info";
// const token = "xoxb-553324377632-553511725281-K35gpSdumrvX0lOq5CqpHYdq";
// // https://mood-dev-team.slack.com/messages/CG9EQ53QR
// const test1 = () => {
//   axios.get(endpoint1, {token: token}).then(res=>{console.log(res.team);});
// };

// test1();


// const endpoint = "https://slack.com/oauth/authorize";

// const test = () => {
//   axios.get(endpoint, {
//     client_id: "553324377632.554405336645",
//     scope: "team:read",
//     // redirect_uri: "",
//     state: "statetest",
//     // team: "mood-bot"
//   }).then(res=>{
//     console.log(res);
//   });
// };

// test();
