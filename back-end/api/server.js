const express = require("express");
const configureMiddleware = require("./middleware/middleware.js");
const managerRouter = require("./routes/managerRouter.js");
// const teamMemberRouter = require("./routes/teamMemberRouter.js");
// const teamRouter = require("./routes/teamRouter.js");
// const surveyRouter = require("./routes/surveyRouter.js");
// const feelingRouter = require("./routes/feelingRouter.js");
const surveyDB = require("./database/dbConfig.js");
const server = express();

configureMiddleware(server);

server.use('/api/managers', managerRouter);
// server.use('/api/team_members', teamMemberRouter);
// server.use('/api/teams', teamRouter);
// server.use('/api/surveys', surveyRouter);
// server.use('/api/feelings', feelingRouter);

server.get("/", (req, res) => {
  res.status(200).json("ITS WORKING");
  console.log("ITS WORKING!!!");
});

const postSuccess = res => id => {
  res.status(201).json(id);
};
const serverErrorPost = res => err => {
  res.status(422).json(err);
};

const getSuccess = res => data => {
  res.status(200).json(data);
};

const serverErrorGet = res => err => {
  res.status(500).json(err);
};

server.post("/api/surveys", (req, res) => {
  const postInfo = req.body;
  surveyDB("surveys")
    .insert(postInfo)
    .then(postSuccess(res))
    .catch(serverErrorPost(res));
});

server.get("/api/surveys", (req, res) => {
  surveyDB("surveys")
    .then(getSuccess(res))
    .catch(serverErrorGet(res));
});

server.post("/api/managers", (req, res) => {
  const postInfo = req.body;
  surveyDB("managers")
    .insert(postInfo)
    .then(postSuccess(res))
    .catch(serverErrorPost(res));
});

server.get("/api/managers", (req, res) => {
  surveyDB("managers")
    .then(getSuccess(res))
    .catch(serverErrorGet(res));
});

server.post("/api/teams", (req, res) => {
  const postInfo = req.body;
  surveyDB("teams")
    .insert(postInfo)
    .then(postSuccess(res))
    .catch(serverErrorPost(res));
});

server.get("/api/teams", (req, res) => {
  surveyDB("teams")
    .then(getSuccess(res))
    .catch(serverErrorGet(res));
});

// server.get("/api/test", (req, res) => {
//   surveyDB("surveys")
//     .then(data=>{
//       console.log(data);
//     })
//     .catch(err=>{
//       res.status(500).json(err);
//     });
// });

module.exports = server;
