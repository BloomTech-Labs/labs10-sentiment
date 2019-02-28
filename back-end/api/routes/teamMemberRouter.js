const express = require("express");
const router = express.Router();
const db = require("../database/helpers/teamMembersDb");
const teamdb = require("../database/helpers/teamsDb");

const {
  postSuccess,
  serverErrorPost,
  getSuccess,
  serverErrorGet,
  serverErrorGetID,
  serverErrorGetEmail,
  serverErrorDelete404,
  serverErrorDelete500,
  serverErrorUpdate404,
  serverErrorUpdate500
} = require("./routeHelpers/helpers.js");

const type = "team member";
const type2 = "team";

router.post("/", (req, res) => {
  const postInfo = req.body;

  if (postInfo.type !== null || postInfo.team_id !== null) {
    res.status(400).json({ error: "Team Id or Type is not equal to null" });
  }

  // teamdb
  //   .get()
  //   .where("id", postInfo.team_id)
  //   .then(data => {
  //     if (data.length === 0) {
  //       res
  //         .status(404)
  //         .json({
  //           message: `${type2} with ID ${postInfo.team_id} does not exist.`
  //         });
  //     }
  //   });
  // db.get()
  //   .where("team_id", postInfo.team_id)
  //   .then(data => {
  //     if (data.length > 0) {
  //       res
  //         .status(406)
  //         .json({
  //           message: `${type2} with ID ${postInfo.team_id} contains a ${type}.`
  //         });
  //     }
  //   });

  db.get()
    .where("email", postInfo.email)
    .then(data => {
      if (data.length > 0) {
        res.status(406).json({
          message: `${type} with Email ${postInfo.email} already exists.`
        });
      }
    });

  db.insert(postInfo)
    .then(postSuccess(res))
    .catch(serverErrorPost(res));
});

router.get("/", (req, res) => {
  db.get()
    .then(getSuccess(res))
    .catch(serverErrorGet(res));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getID(id)
    .then(getSuccess(res))
    .catch(serverErrorGetID(res, type, id));
});

router.get("/team_member/:id", (req, res) => {
  const { id } = req.params;
  db.get().where({ team_id: id })
    .then(getSuccess(res))
    .catch(serverErrorGetID(res, type, id));
});

router.get("/Email/:email", (req, res) => {
  const { email } = req.params;
  db.getEmail(email)
    .then(getSuccess(res))
    .catch(serverErrorGetEmail(res, type, email));
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

router.put("/:id/join", (req, res) => {
  // on click of join team front end provides team code and id from params
  const { id } = req.params;
  const { team_code } = req.body;

  teamdb.getTeamCode(team_code).then(data => {
    if (data[0]) {
      // team id
      console.log(data[0]);
      const teamID = data[0].id;

      db.getID(id).then(data => {
        let member = data[0];
        if (member && member.team_id === null && member.type === null) {
          let updatedMember = {
            id: member.id,
            firstName: member.firstName,
            lastName: member.lastName,
            email: member.email,
            phone: member.phone,
            type: "team_member",
            team_id: teamID
          };
          db.update(id, updatedMember)
            .then(() => {
              db.get().then(getSuccess(res));
            })
            .catch(serverErrorUpdate500(res, type));
        } else {
          res
            .status(400)
            .json({
              error: `Team Member ${member.firstName} ${
                member.lastName
              } Is Already Assigned to Team Id ${member.team_id}`
            });
        }
      });
    } else {
      res
        .status(400)
        .json({ error: `Team with code ${team_code} Does not Exist` });
    }
  });
});

module.exports = router;
