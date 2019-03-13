const express = require("express");
const router = express.Router();
const db = require("../database/helpers/surveysActiveDb");

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

const type = "active_surveys";

router.get("/", (req, res) => {
  db.get()
    .then(getSuccess(res))
    .catch(serverErrorGet(res));
});

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;

//   db.getID(id).then(data => {
//     if (data) {
//       db.update(id, changes)
//         .then(() => {
//           db.get().then(getSuccess(res));
//         })
//         .catch(() => {
//           serverErrorUpdate500(res, type);
//         });
//     } else {
//       serverErrorUpdate404(res, type, id);
//     }
//   });
// });

module.exports = router;
