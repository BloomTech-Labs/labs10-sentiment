require("dotenv").config();
const express = require("express");
const router = express.Router();
const request = require("request");
const axios = require("axios");
const db = require("../database/helpers/slackAuthDb");
const teamMembersDb = require("../database/helpers/teamMembersDb");

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

const type = "team";

// router.post("/", (req, res) => {
//   const postInfo = req.body;
//   db.insert(postInfo)
//     .then(postSuccess(res))
//     .catch(serverErrorPost(res));
// });

// https://slack.com/oauth/authorize?client_id=553324377632.554405336645&scope=bot,chat:write:bot,commands,emoji:read
// https://slack.com/oauth/authorize?scope=commands,bot&client_id=553324377632.554405336645&redirect_uri=https://botsentiment.herokuapp.com/api/slackauth&state=id2
// https://slack.com/oauth/authorize?scope=commands,bot&client_id=553324377632.554405336645&redirect_uri=https://botsentiment.herokuapp.com/api/slackauth&state=id2
// https://slack.com/oauth/authorize?scope=commands,bot&client_id=553324377632.554405336645&redirect_uri=http://localhost:5002/api/slackauth&state=id

// let uri = "http://localhost:5002/api/slackauth";
// let uri2 = "http://localhost:5002/api/slackauth/slack-btn/1";
let uri = "https://botsentiment.herokuapp.com/api/slackauth";

// router.get("/slackbtn/:id", (req, res) => {
//   // console.log(req.query.code);
//   const { id } = req.params;
//   console.log(id);
//   const options = {
//     uri:
//       "https://slack.com/oauth/authorize?" +
//       "scope=" +
//       "commands,bot" +
//       "&client_id=" +
//       "553324377632.554405336645" +
//       "&redirect_uri=" +
//       uri +
//       "&state=" +
//       id,
//     method: "GET"
//   };
//   request(options, (error, response, body) => {
//     let JSONresponse = JSON.parse(body);
//     if (!JSONresponse.ok) {
//       console.log(JSONresponse);
//       res
//         .send("Error encountered: \n" + JSON.stringify(JSONresponse))
//         .status(200)
//         .end();
//       // } else {
//       console.log("response", body);
//       // console.log({ state: req.query.state });
//       // const memberID = req.query.state;
//     }
//   });
// });

// function sendToAuthorization() {
//   let postOptions = {
//     uri: "https://sentimentbot.netlify.com/authorization",
//     method: "GET"
//   };
//   request(postOptions, (error, response, body) => {
//     if (error) {
//       // handle errors as you see fit
//       res.json({ error: "Error." });
//     }
//   });
// }

router.get("/", (req, res) => {
  console.log(req.query.code);
  const options = {
    uri:
      "https://slack.com/api/oauth.access?code=" +
      req.query.code +
      "&client_id=" +
      "553324377632.554405336645" +
      "&client_secret=" +
      "934d342145ffd799890140ec512feac3" +
      "&redirect_uri=" +
      uri,
    method: "GET"
  };
  request(options, (error, response, body) => {
    let JSONresponse = JSON.parse(body);
    if (!JSONresponse.ok) {
      console.log(JSONresponse);
      res
        .send("Error encountered: \n" + JSON.stringify(JSONresponse))
        .status(200)
        .end();
    } else {
      console.log("JSONresponse auth", JSONresponse);
      console.log({ state: req.query.state });
      let memberID = req.query.state;
      memberID = Number(memberID);
      console.log(memberID);
      console.log('JSONresponse.bot.bot_user_id',JSONresponse.bot);
      db.getByMemberId(memberID)
        .then(data => {
          console.log("data", data);
          let postInfo;
          if (!data[0]) {
            /////change so will update instead/////////
            if (!JSONresponse.bot) {
              postInfo = {
                access_token: JSONresponse.access_token,
                user_id: JSONresponse.user_id,
                team_name: JSONresponse.team_name,
                team_id: JSONresponse.team_id,
                bot_user_id: null,
                bot_access_token: null,
                member_id: memberID,
                channel_id: ""
              };
            } else if (JSONresponse.bot.bot_user_id) {
              postInfo = {
                access_token: JSONresponse.access_token,
                user_id: JSONresponse.user_id,
                team_name: JSONresponse.team_name,
                team_id: JSONresponse.team_id,
                bot_user_id: JSONresponse.bot.bot_user_id,
                bot_access_token: JSONresponse.bot.bot_access_token,
                member_id: memberID,
                channel_id: ""
              };
            }
            console.log("postInfo", postInfo);
            db.insert(postInfo)
              .then(() => {
                res.redirect("https://sentimentbot.netlify.com/profile");
              })
              .catch(serverErrorPost(res));
          } else {
            let { id } = data[0];
            let updateInfo;
            console.log("id", id);
            if (!JSONresponse.bot) {
              updateInfo = {
                access_token: JSONresponse.access_token,
                user_id: JSONresponse.user_id,
                team_name: JSONresponse.team_name,
                team_id: JSONresponse.team_id,
                bot_user_id: null,
                bot_access_token: null,
                member_id: memberID,
                channel_id: ""
              };
            } else if (JSONresponse.bot.bot_user_id) {
              updateInfo = {
                access_token: JSONresponse.access_token,
                user_id: JSONresponse.user_id,
                team_name: JSONresponse.team_name,
                team_id: JSONresponse.team_id,
                bot_user_id: JSONresponse.bot.bot_user_id,
                bot_access_token: JSONresponse.bot.bot_access_token,
                member_id: memberID,
                channel_id: ""
              };
            }
            console.log("postInfo2", updateInfo);
            db.update(id, updateInfo)
              .then(() => {
                // sendToAuthorization();
                res.redirect("https://sentimentbot.netlify.com/profile");
              })
              .catch(serverErrorUpdate500(res, "Auth"));
            // res.status(400).json({
            //   error: `Member with Id ${memberID} is already authorized`  /////change so will update instead/////////
            // });
          }
        })
        .catch(err => console.log(err));
    }
  });
});

router.get("/all", (req, res) => {
  db.get()
    .then(getSuccess(res))
    .catch(serverErrorGet(res));
});

// router.post("/test", (req, res) => {
//   let postInfo3 = {
//     "access_token": "",
//     "user_id": "", 
//     "team_name": "", 
//     "team_id": "TG99JB3JL", 
//     "bot_user_id": "", 
//     "bot_access_token": "", 
//     "member_id": 1, 
//     "channel_id": ""
//   };
//   db.insert(postInfo3)
//     .then(getSuccess(res))
//     .catch(serverErrorGet(res));
// });

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getID(id)
    .then(getSuccess(res))
    .catch(serverErrorGetID(res, type, id));
});

router.delete("/slackAuth/:id", (req, res) => {
  const { id } = req.params;
  db.getID(id)
    .then(data => {
      if (data) {
        db.remove(id).then(() => {
          db.get().then(getSuccess(res));
        });
      } else {
        serverErrorDelete404(res, type, id);
      }
    })
    .catch(() => {
      serverErrorDelete500(res, type);
    });
});

router.put("/slackAuth/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.getID(id).then(data => {
    if (data) {
      db.update(id, changes)
        .then(() => {
          db.get().then(getSuccess(res));
        })
        .catch(() => {
          serverErrorUpdate500(res, type);
        });
    } else {
      serverErrorUpdate404(res, type, id);
    }
  });
});

router.get("/single/:id", (req, res) => {
  const { id } = req.params;
  db.get().where({ member_id: id })
    .then(getSuccess(res))
    .catch(serverErrorGetID(res, type, id));
});

module.exports = router;
