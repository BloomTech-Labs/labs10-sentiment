//
require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../database/helpers/slashDb");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const request = require("request");
const dbAuth = require("../database/helpers/slackAuthDb");

const {
  postSuccess,
  serverErrorPost,
  getSuccess,
  serverErrorGet,
  serverErrorGetID,
  serverErrorDelete404,
  serverErrorDelete500,
  serverErrorUpdate404,
  serverErrorUpdate500
} = require("./routeHelpers/helpers.js");

//routes for slash commands through Slack API//
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  db.get()
    .then(getSuccess(res))
    .catch(serverErrorGet(res));
});

function sendMessageToSlackResponseURL(responseURL, JSONmessage) {
  let postOptions = {
    uri: responseURL,
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    json: JSONmessage
  };
  request(postOptions, (error, response, body) => {
    if (error) {
      // handle errors as you see fit
      res.json({ error: "Error." });
    }
  });
}

function postMessage(JSONmessage, token) {
  let postOptions = {
    uri: `https://slack.com/api/chat.postMessage`,
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: token 
    },
    json: JSONmessage
  };
  request(postOptions, (error, response, body) => {
    if (error) {
      // handle errors as you see fit
      res.json({ error: "Error." });
    }
  });
}

// function postMessage(botToken) {
//   const postOptions = {
//     uri:
//       "https://slack.com/api/chat.postMessage?token=" +
//       botToken +
//       "&channel=" +
//       "CG9EQ53QR" +
//       "&text=" +
//       "Testing" +
//       "&as_user=" +
//       "false",
//     method: "POST"
//   };
//   request(postOptions, (error, response, body) => {
//     if (error) {
//       // handle errors as you see fit
//       res.json({ error: "Error." });
//     }
//   });
// }

// https://slack.com/api/chat.postMessage?token=xoxb-553324377632-553511725281-WtIU01FxATAkavAPlFn6BPz2&channel=CG9EQ53QR&text=Test

router.post("/send-me-buttons", urlencodedParser, (req, res) => {
  console.log("send me buttons");
  res.status(200).end(); // best practice to respond with empty 200 status code
  let reqBody = req.body;
  console.log(reqBody);
  if (reqBody.command === "/send-me-buttons") {
    let responseURL = reqBody.response_url;
    if (reqBody.token != process.env.VERIFCATION_TOKEN) {
      res.status(403).end("Access forbidden");
    } else {
      let message = {
        text: "Please respond with how you are feeling below.",
        attachments: [
          {
            text: "How are you feeling about this week?",
            fallback: "Shame... buttons aren't supported in this land",
            callback_id: "button_tutorial",
            color: "#3AA3E3",
            attachment_type: "default",
            actions: [
              {
                name: "Happy",
                text: "Happy",
                type: "button",
                value: "Happy"
              },
              {
                name: "Sad",
                text: "Sad",
                type: "button",
                value: "Sad"
              },
              {
                name: "Mad",
                text: "Mad",
                type: "button",
                value: "Mad",
                style: "danger"
              }
            ]
          }
        ]
      };
      sendMessageToSlackResponseURL(responseURL, message);
    }
  } else if (reqBody.callback_id === "button_tutorial") {
    res.status(200).end(); // best practice to respond with 200 status
    let actionJSONPayload = JSON.parse(req.body.payload); // parse URL-encoded payload JSON string
    let message = {
      text:
        actionJSONPayload.user.name +
        " clicked: " +
        actionJSONPayload.actions[0].name,
      replace_original: false
    };
    console.log(actionJSONPayload);
    sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);
  } else if (reqBody.message === true) {
    dbAuth
      .getByMemberId(reqBody.member_id)
      .then(data => {
        console.log(data);
        const botToken = data[0].bot_access_token;
        console.log(botToken);
        message = {
          // token: botToken,
          channel: "CG9EQ53QR",
          text: "Survey question from Mood Bot:"
          // attachments: [
          //   {
          //     title: "How do you feel?",
          //     actions: [
          //       {
          //         name: "feelings_list",
          //         type: "select",
          //         text: "Add a Feeling...",
          //         data_source: "static",
          //         options: [
          //           {
          //             text: "Launch Blocking",
          //             value: "launch-blocking"
          //           },
          //           {
          //             text: "Enhancement",
          //             value: "enhancement"
          //           },
          //           {
          //             text: "Bug",
          //             value: "bug"
          //           }
          //         ]
          //       },
          //       {
          //         name: "action",
          //         type: "button",
          //         text: "Submit",
          //         style: "",
          //         value: "complete"
          //       }
          //     ]
          //   }
          // ]
        };
        console.log(message);
        postMessage(message, botToken);
      })
      .catch(err => err);
  }
});

// router.post("/send-me-buttons", urlencodedParser, (req, res) => {
//   res.status(200).end(); // best practice to respond with 200 status
//   var actionJSONPayload = JSON.parse(req.body.payload); // parse URL-encoded payload JSON string
//   var message = {
//     text:
//       actionJSONPayload.user.name +
//       " clicked: " +
//       actionJSONPayload.actions[0].name,
//     replace_original: false
//   };
//   console.log(actionJSONPayload);
//   sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);
// });

router.post("/", (req, res) => {
  // let response = req;
  // console.log({response: response});
  // let postInfo = { slash: response };
  // db.insert(postInfo)
  //   .then(postSuccess(res))
  //   .catch(err => {
  //     res.status(422).json(err);
  //   });
  let userName = req.body.user_name;
  console.log(req.body);
  let botPayload = {
    response_type: "in_channel",
    text: `Hello ${userName}, welcome to the Moodbot Slack channel!!`
  };

  if (userName !== "slackbot") {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
});

router.post("/2", (req, res) => {
  // let response = req;
  // console.log({response: response});
  // let postInfo = { slash: response };
  // db.insert(postInfo)
  //   .then(postSuccess(res))
  //   .catch(err => {
  //     res.status(422).json(err);
  //   });
  let userName = req.body.user_name;
  console.log(req.body);
  let botPayload = {
    response_type: "in_channel",
    text: `${userName}, the mood is Great!!`
  };

  if (userName !== "slackbot") {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
});

// error: err,
module.exports = router;

// heroku logs --tail -a botsentiment
