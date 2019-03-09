const express = require("express");
const router = express.Router();
const db = require("../database/helpers/teamsDb");
const dbMembers = require("../database/helpers/teamMembersDb");
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

// POST Team
router.post("/", (req, res) => {
  // front end provide team name and current member id
  // {
  //   "name": "name",
  //   "memberId": number
  // }
  let postInfo = req.body;
  let num = 0;
  // get existing teams
  db.get()
    .then(team => {
      for (let i = 0; i < team.length; i++) {
        if (team[i].name === postInfo.name) {
          res.status(400).json({ error: "Team Name Already Exists" });
        }
      }
      // if there are no teams use 10000 as first team code
      if (team.length === 0) {
        postInfo.team_code = 10000;
      } else if (team.length > 0) {
        for (let i = 0; i < team.length; i++) {
          if (num < team[i].team_code) {
            num = team[i].team_code;
          }
        }
        num++;
        postInfo.team_code = num;
      }
      const teamInsert = {
        name: postInfo.name,
        team_code: postInfo.team_code
      };
      // create team
      db.insert(teamInsert)
        .then(() => {
          // get newly created team by team code
          db.getTeamCode(postInfo.team_code) //// team code ///////////////////////////////////////////////////////////////////
            .then(data => {
              // team id
              const teamID = data[0].id;
              // manager id provided by front end
              const memberID = postInfo.memberId; /////////////
              dbMembers
                .getID(memberID)
                .then(data => {
                  if (data[0].team_id !== null) {
                    db.remove(teamID)
                      .then(() => {
                        res
                          .status(400)
                          .json({ error: `Manager Contains A Team Id!` });
                      })
                      .catch(serverErrorDelete500(res));
                  }
                  console.log(data);
                  const managerUpdate = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    type: "manager",
                    team_id: teamID
                  };
                  dbMembers
                    .update(memberID, managerUpdate)
                    .then(getSuccess(res))
                    .catch(serverErrorPost(res));
                })
                .catch(serverErrorPost(res));
            })
            .catch(serverErrorPost(res));
        })
        .catch(serverErrorPost(res));
    })
    .catch(serverErrorPost(res));
});

router.get("/", (req, res) => {
  db.get()
    .then(getSuccess(res))
    .catch(serverErrorGet(res));
});

// GET Team By ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get()
    .where({ id: id })
    .then(getSuccess(res))
    .catch(serverErrorGetID(res, type, id));
});

router.delete("/:id", (req, res) => {
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
