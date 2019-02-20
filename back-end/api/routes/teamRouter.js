const express = require("express");
const router = express.Router();
const db = require("../database/helpers/teamsDb");
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

router.post("/", (req, res) => {
  let postInfo = req.body;
  db.get().then(team => {
    if (team.length === 0) {
      postInfo.team_code = 10000;
    } else if (team.length > 0) {
      let num = 0;
      for(let i = 0; i < team.length;i++){
        if(num < team[i].team_code){
          num = team[i].team_code;
        }
      }
      num ++;
      postInfo.team_code = num;
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
