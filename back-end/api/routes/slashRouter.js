////
require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../database/helpers/slashDb");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const request = require("request");
const dbAuth = require("../database/helpers/slackAuthDb");
const dbFeelings = require("../database/helpers/feelingsDb");
const dbSurveys = require("../database/helpers/surveysDb");
const dbTeamMembers = require("../database/helpers/teamMembersDb");
const surveyFeelingsDb = require("../database/helpers/surveysFeelingsDb");
const preFeelingsDb = require("../database/helpers/preFeelingsDb");

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
      Authorization: `Bearer ${token}`
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

// '1551240654.863992',
//  message_ts: '1551240449.011400',

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

router.post("/connect-channel-to-survey", urlencodedParser, (req, res) => {
  // res.status(200).end(); // best practice to respond with empty 200 status code
  let reqBody = req.body;
  console.log("reqBody", reqBody);
  let { channel_id, user_id } = reqBody;
  console.log({ channel_id: channel_id, user_id: user_id });

  dbAuth
    .getBySlackUserId(user_id)
    .then(data => {
      console.log({ data: data });
      let { id, member_id } = data[0];
      console.log({ id: id });
      let post = {
        channel_id: channel_id
      };
      dbTeamMembers
        .getID(member_id)
        .then(data => {
          if(data[0].type !== "manager"){
            res.status(400).json({error: "Team Members Do not require channel connection!"});
          }else{
            dbAuth
            .update(id, post)
            .then(() => {
              res.status(200).json({
                message: `Updated Auth ID: ${id} with slack channel ID: ${channel_id}.`
              });
            })
            .catch(serverErrorDelete500(res, "Auth", member_id));
          }
        })
        .catch(serverErrorGetID(res, "Auth", ));
    })
    .catch(
      serverErrorDelete404(() => {
        res.status(400).json({
          error: `Slack User with user_id: ${user_id} does not exist in the database.`
        });
      })
    );
});

let surveyIdDep;

router.post("/send-me-buttons", urlencodedParser, (req, res) => {
  res.status(200).end(); // best practice to respond with empty 200 status code
  let reqBody = req.body;
  console.log("reqBody", reqBody);

  if (reqBody.command === "/send-me-buttons") {
    let responseURL = reqBody.response_url;
    if (reqBody.token != process.env.VERIFCATION_TOKEN) {
      res.status(403).end("Access forbidden");
    } else {
      let user_id = reqBody.user_id;
      dbAuth
        .getBySlackUserId(user_id)
        .then(data => {
          if (data.length === 0) {
            console.log({ error: "User is not Authorized" });
          } else {
            let member_id = data[0].member_id; ///// team_member_id
            dbTeamMembers
              .getID(member_id)
              .then(data => {
                if (data.length === 0) {
                  console.log({ error: "User does not exist" });
                } else {
                  let team_id = data[0].team_id;
                  dbTeamMembers
                    .getManager(team_id)
                    .then(data => {
                      if (data.length === 0) {
                        console.log({
                          error: "Manager does not exist for this team"
                        });
                      } else {
                        let manager_id = data[0].id;
                        dbSurveys
                          .getManagerID(manager_id)
                          .then(data => {
                            // let title = data[data.length - 1].title;
                            // let description = data[data.length - 1].description;

                            let survey_id = Math.max.apply(
                              Math,
                              data.map(function(o) {
                                return o.id;
                              })
                            );
                            let title = data.map(item => {
                              if (item.id === survey_id) {
                                return item.title;
                              }
                            });
                            let description = data.map(item => {
                              if (item.id === survey_id) {
                                return item.description;
                              }
                            });

                            console.log("survey id", survey_id);
                            if (data.length === 0) {
                              console.log({
                                error: `Survey with Manager Id: ${manager_id} does not exist.`
                              });
                            } else {
                              surveyFeelingsDb
                                .getSurveyID(survey_id)
                                .then(data => {
                                  // console.log(
                                  //   "survey feeling array slash",
                                  //   data
                                  // );
                                  let feelingTextArray = [];
                                  for (let j = 0; j < data.length; j++) {
                                    let { feelings_id } = data[j];
                                    let max = data.length - 1;
                                    // console.log("feelings_id", feelings_id);
                                    preFeelingsDb
                                      .getID(feelings_id)
                                      .then(data => {
                                        // console.log("pre feeling array", data);
                                        if (data.length === 0) {
                                          console.log({
                                            error: `Pre Feeling with Id: ${feelings_id} does not exist.`
                                          });
                                        } else if (
                                          data.length !== 0 &&
                                          j < max
                                        ) {
                                          let feeling_text =
                                            data[0].feeling_text;
                                          feelingTextArray.push(feeling_text);
                                        } else if (
                                          data.length !== 0 &&
                                          j === max
                                        ) {
                                          let feeling_text =
                                            data[0].feeling_text;
                                          feelingTextArray.push(feeling_text);
                                          // console.log(
                                          //   "feelingTextArray",
                                          //   feelingTextArray
                                          // );

                                          let arrayOptions = [];
                                          for (
                                            let t = 0;
                                            t < feelingTextArray.length;
                                            t++
                                          ) {
                                            let max2 =
                                              feelingTextArray.length - 1;
                                            if (t === max2) {
                                              let value = {
                                                name: feelingTextArray[t],
                                                text: feelingTextArray[t],
                                                type: "button",
                                                value: feelingTextArray[t]
                                              };
                                              // console.log("value", value);
                                              arrayOptions.push(value);
                                              ///////////////////////////////////////////////////////////////////

                                              console.log(
                                                "arrayOptions",
                                                arrayOptions
                                              );
                                              let message = {
                                                text: `${title}`,
                                                attachments: [
                                                  {
                                                    text: `${description}`,
                                                    fallback:
                                                      "Shame... buttons aren't supported in this land",
                                                    callback_id:
                                                      "button_tutorial",
                                                    color: "#3AA3E3",
                                                    attachment_type: "default",
                                                    actions: arrayOptions
                                                  }
                                                ]
                                              };
                                              // console.log("message", message);
                                              sendMessageToSlackResponseURL(
                                                responseURL,
                                                message
                                              );

                                              ///////////////////////////////////////////////////////////////////
                                            } else {
                                              let value = {
                                                name: feelingTextArray[t],
                                                text: feelingTextArray[t],
                                                type: "button",
                                                value: feelingTextArray[t]
                                              };
                                              // console.log("value", value);
                                              arrayOptions.push(value);
                                            }
                                          }
                                        }
                                      })
                                      .catch(err => console.log(err));
                                  }
                                  //     })
                                  //     .then(data => {
                                  //       // console.log("data", data);
                                  //     })
                                  //     .then(() => {})
                                  //     .catch(err => console.log(err));
                                  // }
                                })
                                .catch(err => console.log(err));
                            }
                          })
                          .catch(err => console.log(err));
                      }
                    })
                    .catch(err => console.log(err));
                }
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
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
    // console.log("actionJSONPayload", actionJSONPayload);
    sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);
  } else if (reqBody.message === true) {
    let surveyId = reqBody.survey_id;
    // console.log("surveyId", surveyId);
    surveyIdDep = surveyId;
    console.log("surveyIdDep test", surveyIdDep);
    let title = reqBody.title;
    let description = reqBody.description;
    let options = reqBody.options;
    // console.log("options", options);
    let arrayOptions = [];
    for (let i = 0; i < options.length; i++) {
      let value = {
        text: options[i],
        value: options[i]
      };
      // console.log("value", value);
      arrayOptions.push(value);
    }
    // console.log("arrayOptions", arrayOptions);

    dbAuth
      .getByMemberId(reqBody.member_id)
      .then(data => {
        // const botToken = data[0].access_token;
        const botToken = data[0].bot_access_token;
        console.log("botToken", botToken);
        const { channel_id } = data[0];
        console.log("channel_id", channel_id);
        if (channel_id === "") {
          res.status(404).json("channel id is equall to null");
        } else {
          let message = {
            channel: channel_id, //////////////////////////////make dynamic team_id
            text: `${title}`,
            as_user: false,
            attachments: [
              {
                text: `${description}`,
                fallback:
                  "If you could read this message, you'd be picking a feeling right now.",
                color: "#3AA3E3",
                attachment_type: "default",
                callback_id: "feeling_menu",
                actions: [
                  {
                    name: "feeling_list",
                    text: "Pick a feeling...",
                    type: "select",
                    options: arrayOptions
                  }
                ]
              }
            ]
          };
          // console.log(message);

          postMessage(message, botToken);
        }
      })
      .catch(err => err);
  } else if (reqBody.payload) {
    let jsonPayload = JSON.parse(reqBody.payload);
    console.log("jsonPayload", jsonPayload);
    /////////////////////////////////////////////

    console.log("jsonPayload time stamp", jsonPayload.message_ts);
    console.log("surveyIdDep", surveyIdDep);

    dbAuth
      .getBySlackUserId(jsonPayload.user.id)
      .then(data => {
        let id = data.member_id;
        dbTeamMembers
          .getID(id)
          .then(data => {
            if (data.type === "manager") {
              res.status(400).json({ message: "manager responded to survey" });
            } else {
              dbSurveys
                .getID(surveyIdDep)
                .then(data => {
                  if (data.length > 0) {
                    console.log("data survey id for time", data);
                    let putInfo;
                    let survey_time_stamp;
                    if (data[0].survey_time_stamp === null) {
                      //////////////////////////
                      putInfo = {
                        survey_time_stamp: jsonPayload.message_ts
                      };
                      survey_time_stamp = jsonPayload.message_ts;
                    } else {
                      putInfo = {
                        survey_time_stamp: data[0].survey_time_stamp
                      };
                      survey_time_stamp = data[0].survey_time_stamp;
                    }

                    dbSurveys
                      .update(surveyIdDep, putInfo)
                      .then(() => {
                        ////////////////////////////////
                        let userIdSlack = jsonPayload.user.id;
                        let callbackIDSlash = jsonPayload.callback_id;

                        dbAuth
                          .getBySlackUserId(userIdSlack)
                          .then(data => {
                            console.log("data slack user id", data[0]);
                            let team_member_id = data[0].member_id;
                            console.log("team_member_id", team_member_id);
                            let postFeel;
                            if (callbackIDSlash === "button_tutorial") {
                              postFeel = {
                                feeling_text: jsonPayload.actions[0].value,
                                team_member_id: team_member_id,
                                survey_time_stamp: survey_time_stamp
                              };
                            } else {
                              postFeel = {
                                feeling_text:
                                  jsonPayload.actions[0].selected_options[0]
                                    .value,
                                team_member_id: team_member_id,
                                survey_time_stamp: survey_time_stamp
                              };
                            }

                            console.log("postFeel", postFeel);
                            dbFeelings
                              .getByMemberAndSurveyTimeStamp(
                                team_member_id,
                                survey_time_stamp
                              )
                              .then(data => {
                                console.log("data mem sur", data);
                                // if (data.length === 0) {
                                dbFeelings
                                  .insert(postFeel)
                                  .then(() => {
                                    res.redirect(
                                      "https://sentimentbot.netlify.com/authorization"
                                    );
                                  })
                                  .catch(serverErrorPost(res));
                                // } else {
                                //   res.status(400).json({
                                //     error: "Feeling Exists for Team Member and Survey"
                                //   });
                                // }
                              })
                              .catch(serverErrorGet(res));
                          })
                          .catch(serverErrorGet(res));
                        ////////////////////////////////
                      })
                      .catch(err => console.log(err));
                  } else {
                    console.log({ error: "survey does not exist" });
                  }
                })
                .catch(err => console.log(err));
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

    ///////////////////////////////////
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
