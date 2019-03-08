// Survey Feelings
const express = require("express");
const router = express.Router();
const db = require("../database/helpers/surveysFeelingsDb");
const surveysdb = require("../database/helpers/surveysDb");
const feelingsdb = require("../database/helpers/preFeelingsDb");

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

const type = "survey_feeling";
const type2 = "survey";
const type3 = "feeling";

//Routes for the custom emoji's (feelings) that managers will use to gauge feedback with//
// POST
router.post("/", (req, res) => {
  const postInfo = req.body;
  surveysdb
    .get()
    .where("id", postInfo.survey_id)
    .then(data => {
      if (data.length === 0) {
        res.status(404).json({
          message: `${type2} with ID ${postInfo.survey_id} does not exist.`
        });
      }
    });

  feelingsdb
    .get()
    .where("id", postInfo.feelings_id)
    .then(data => {
      if (data.length === 0) {
        res.status(404).json({
          message: `${type3} with ID ${postInfo.feelings_id} does not exist.`
        });
      } else {
        db.getSurveyAndFeelingID(postInfo.survey_id, postInfo.feelings_id)
          .then(data => {
            if (data.length > 0) {
              res.status(400).json({ error: `Pre Set Feeling with Id: ${postInfo.feelings_id} is already associated with Survey Id ${postInfo.survey_id}` });
            } else {
              db.insert(postInfo)
                .then(postSuccess(res))
                .catch(serverErrorPost(res));
            }
          })
          .catch(serverErrorGet(res));
      }
    });
});

// GET ALL
router.get("/", (req, res) => {
  db.get()
    .then(getSuccess(res))
    .catch(serverErrorGet(res));
});

// GET ONE
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getID(id)
    .then(getSuccess(res))
    .catch(serverErrorGetID(res, type, id));
});

// DELETE
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

// PUT/Update
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
