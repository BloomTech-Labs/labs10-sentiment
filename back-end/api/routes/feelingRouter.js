// Feeling Router
const express = require("express");
const router = express.Router();
const db = require("../database/helpers/feelingsDb");
const teamMemberDb = require("../database/helpers/teamMembersDb");

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

const type = "feeling";
const type2 = "team member";

// POST
router.post("/", (req, res) => {
  const postInfo = req.body;

  teamMemberDb
    .get()
    .where("id", postInfo.team_member_id)
    .then(data => {
      if (data.length === 0) {
        res.status(404).json({
          message: `${type2} with ID ${postInfo.team_member_id} does not exist.`
        });
      }
    });

  db.insert(postInfo)
    .then(postSuccess(res))
    .catch(serverErrorPost(res));
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
// GET BY TEAM ID
router.get("/:team_id", (req, res) => {
  const { team_id } = req.params;
  db.getByTeamId(team_id)
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
// PUT & UPDATE
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

//Get All By 1 Person
router.get("/myfeelings/:id", (req, res) => {
  const { id } = req.params;
  db.get().where({ team_member_id: id })
    .then(getSuccess(res))
    .catch(serverErrorGetID(res, type, id));
});


module.exports = router;
