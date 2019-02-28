const express = require("express");
const router = express.Router();
const request = require("request");
const schedule = require("node-schedule");
const db = require("../database/helpers/surveysDb");

const teamMembersDb = require("../database/helpers/teamMembersDb");
const surveyDb = require("../database/helpers/surveysDb");
const surveyFeelingsDb = require("../database/helpers/surveysFeelingsDb");
const preFeelingsDb = require("../database/helpers/preFeelingsDb");
const feelingsdb = require("../database/helpers/feelingsDb");

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

const type = "survey";
const type2 = "Team Member";

// let timeInfo = {
//   dailyWeeklyMonthly: postInfo.dailyWeeklyMonthly, optional values are = daily/weekly/monthly
//   hour: postInfo.hour,
//   amPm: postInfo.amPm, / options AM/PM
//   timeZone: postInfo.timeZone / optional values PST/EST
// };

// let insertInfo = {
//   title: postInfo.title,
//   description: postInfo.description,
//   manager_id: postInfo.manager_id
// };

const surveyScheduler = (timeInfo, postInfo) => {
  let hour;
  let exTime = "";
  let manager_id = postInfo.manager_id;
  let title = postInfo.title;
  let description = postInfo.description;

  if (timeInfo.timeZone === "PST") {
    if (timeInfo.amPm === "AM") {
      hour = timeInfo.hour + 8;
    } else if (timeInfo.amPm === "PM") {
      hour = timeInfo.hour + 12 + 8;
      if (hour >= 24) {
        hour = hour - 24;
      }
    }
  } else if (timeInfo.timeZone === "EST") {
    if (timeInfo.amPm === "AM") {
      hour = timeInfo.hour + 5;
    } else if (timeInfo.amPm === "PM") {
      hour = timeInfo.hour + 12 + 5;
      if (hour >= 24) {
        hour = hour - 24;
      }
    }
  }

  if (timeInfo.dailyWeeklyMonthly === "daily") {
    exTime = `21 ${hour} * * *`; /////////////////////////////////////////////
  } else if (timeInfo.dailyWeeklyMonthly === "weekly") {
    exTime = `0 ${hour} * * 5`;
  } else if (timeInfo.dailyWeeklyMonthly === "monthly") {
    exTime = `0 ${hour} 1 * *`;
  }

  console.log("exTime", exTime);

  surveyDb
    .getManagerID(manager_id)
    .then(data => {
      console.log("survey data", data);
      let survey_id = data[data.length - 1].id; ///////////////
      console.log("survey id", survey_id);
      if (data.length === 0) {
        console.log({
          error: `Survey with Manager Id: ${manager_id} does not exist.`
        });
      } else {
        surveyFeelingsDb
          .getSurveyID(survey_id)
          .then(data => {
            console.log("survey feeling array", data);
            let feelingTextArray = [];

            for (let i = 0; i < data.length; i++) {
              let { feelings_id } = data[i];
              preFeelingsDb
                .getID(feelings_id)
                .then(data => {
                  console.log("pre feeling array", data);
                  if (data.length === 0) {
                    // res.status(404).json({
                    console.log({
                      error: `Pre Feeling with Id: ${feelings_id} does not exist.`
                    });
                  } else {
                    let { feeling_text } = data[0];
                    feelingTextArray.push(feeling_text);
                  }
                })
                .catch(err => console.log(err));
            }

            console.log(feelingTextArray);
            let botInfo = {
              message: true,
              member_id: manager_id,
              survey_id: survey_id,
              title: title,
              description: description,
              // channelID:
              options: feelingTextArray
            };

            console.log("botInfo", botInfo);

            schedule.scheduleJob(exTime, function() {
              console.log("Schedule Processed");
              let postOptions = {
                uri:
                  "https://botsentiment.herokuapp.com/api/slash/send-me-buttons",
                method: "POST",
                headers: {
                  "Content-type": "application/json"
                },
                json: botInfo
              };
              request(postOptions, (error, response, body) => {
                if (error) {
                  // handle errors as you see fit
                  res.json({ error: "Error." });
                }
              });
            });
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
};

// function sendMessageToSlackResponseURL(responseURL, JSONmessage) {
// let postOptions = {
//   uri: responseURL,
//   method: "POST",
//   headers: {
//     "Content-type": "application/json"
//   },
//   json: JSONmessage
// };
// request(postOptions, (error, response, body) => {
//   if (error) {
//     // handle errors as you see fit
//     res.json({ error: "Error." });
//   }
// });
// }

router.post("/", (req, res) => {
  const postInfo = req.body;
  // body = manager_id/ description/ title / time values

  teamMembersDb
    .get()
    .where("id", postInfo.manager_id)
    .then(data => {
      if (data.length === 0) {
        res.status(404).json({
          message: `${type2} with ID ${postInfo.manager_id} does not exist.`
        });
      } else {
        let insertInfo = {
          title: postInfo.title,
          description: postInfo.description,
          manager_id: postInfo.manager_id
        };

        let timeInfo = {
          dailyWeeklyMonthly: postInfo.dailyWeeklyMonthly,
          hour: postInfo.hour,
          amPm: postInfo.amPm,
          timeZone: postInfo.timeZone
        };

        let preFeelingIdsArray = postInfo.preFeelingIdsArray;

        db.insert(insertInfo)
          .then(() => {
            console.log({
              timeInfo: timeInfo,
              insertInfo: insertInfo
            });
            db.getManagerID(postInfo.manager_id)
              .then(data => {
                console.log("survey manager", data);
                for (let i = 0; i < preFeelingIdsArray.length; i++) {
                  let post = {
                    survey_id: data[data.length - 1].id,
                    feelings_id: preFeelingIdsArray[i]
                  };
                  surveyFeelingsDb
                    .insert(post)
                    .then(() => {
                      surveyScheduler(timeInfo, insertInfo);
                    })
                    .catch(serverErrorGet(res));
                }
              })
              .catch(serverErrorGet(res));
          })
          .catch(serverErrorPost(res));
      }
    });
});

router.get("/manager/:id", (req, res) => {
  const { id } = req.params;
  db.get()
    .where({ manager_id: id })
    .then(getSuccess(res))
    .catch(serverErrorGet(res));
});

// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   feelingsdb.get().where({ survey_id: id }).then(data => {
//     db.getID(id)
//     .then(response => {
//       res.status(200).json({ response, data})
//     })
//     .catch(serverErrorGetID(res, type, id));
//   })

// });

router.get("/:id", (req, res) => {
  const { id } = req.params;
  feelingsdb
    .get()
    .where({ survey_time_stamp: id })
    .then(data => {
      db.getID(id)
        .then(response => {
          res.status(200).json({ response, data });
        })
        .catch(serverErrorGetID(res, type, id));
    });
});

router.delete(`/:id`, (req, res) => {
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

router.put("/:id", (req, res) => {
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
