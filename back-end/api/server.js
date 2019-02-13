const express = require('express');
const configureMiddleware = require('./middleware/middleware.js');
const managerRouter = require('./routes/managerRouter.js');
const teamMemberRouter = require('./routes/teamMemberRouter.js');
const teamRouter = require('./routes/teamRouter.js');
const surveyRouter = require('./routes/surveyRouter.js');
const feelingRouter = require('./routes/feelingRouter.js');

const server = express();

configureMiddleware(server);

server.use('/api/managers', managerRouter);
server.use('/api/team_members', teamMemberRouter);
server.use('/api/teams', teamRouter);
server.use('/api/surveys', surveyRouter);
server.use('/api/feelings', feelingRouter);

module.exports = server;