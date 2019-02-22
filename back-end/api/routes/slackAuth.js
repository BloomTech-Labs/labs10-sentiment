require("dotenv").config();
const express = require("express");
const router = express.Router();
const request = require("request");
// const axios = require("axios");
const db = require("../database/helpers/slackAuthDb");
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

router.post("/slackAuth", (req, res) => {
  let postInfo = req.body;

  db.insert(postInfo)
    .then(postSuccess(res))
    .catch(serverErrorPost(res));
});

// router.get("/slackAuth", (req, res) => {
//   db.get()
//     .then(getSuccess(res))
//     .catch(serverErrorGet(res));
// });

// router.get("/button", (req, res) => {
//   axios
//     .get(
//       `https://slack.com/oauth/authorize?scope=commands,bot&client_id=553324377632.554405336645&redirect_uri=https://botsentiment.herokuapp.com/api/slackauth&state=id`
//     )
//     .then(data => {
//       console.log(data);
//     });
// });

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
      "https://botsentiment.herokuapp.com/api/slackauth",
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
      console.log(JSONresponse);
      console.log({state: req.query.state});
      res.send("Success!: \n" + JSON.stringify(JSONresponse));
    }
  });
});

// https://slack.com/oauth/authorize?scope=commands&client_id=553324377632.554405336645&redirect_uri=https://botsentiment.herokuapp.com/api/slackauth/teammember

router.get("/teammember", (req, res) => {
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
      "https://botsentiment.herokuapp.com/api/slackauth/teammember",
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
      console.log(JSONresponse);
      console.log({state: req.query.state});
      res.send("Success!: \n" + JSON.stringify(JSONresponse));
    }
  });
});

router.get("/slackAuth/:id", (req, res) => {
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

module.exports = router;
