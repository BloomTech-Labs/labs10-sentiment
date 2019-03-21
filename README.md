# Labs10-Sentiment

Mood is an application that Creates a non-confrontational yet engaging way for employees to communicate with their managers. It Provides an effective method for teams to generate actionable feedback to improve working conditions, company culture, and productivity.

## Front End

 Front end was built with create-react-app. To run a local server,

 yarn start must be run inside of the sentiment bot file.

 Redux is being used to manage state.

 Notable APIs in use are Stripe, Auth0, and Slack.

 Hosted on Netlify.

## Back End

 Backend built with Express and NodeJS

 Notable APIs in use are Stripe and Slack.

 Hosted on Heroku.

## Data Base

Local created with knex.js and sqlite3

Production created with knex.js and Heroku PostgresSQL

## Authors

* **Austin Blake**  - [dyiar](https://github.com/dyiar)
* **Joseph Eastman** - [josepheastman](https://github.com/josepheastman)
* **Samuel Partner**  - [Zatara-Wrought](https://github.com/Zatara-Wrought)
* **Thomas Claydon**  - [gittc100](https://github.com/gittc100)
* **Tyrone CartWright**  - [Tyrone-Cartwright](https://github.com/Tyrone-Cartwright)
* **Michelle Okagbue**  - [Mokagbue](https://github.com/Mokagbue)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Useful Info

Using Heroku CLI:
Migration Latest Command: heroku run knex --knexfile=./back-end/knexfile.js  migrate:latest -a botsentiment
Migration Rollback Command: heroku run knex --knexfile=./back-end/knexfile.js  migrate:rollback -a botsentiment
Veiw Real Time Production Logs: heroku logs --tail -a botsentiment

Notes:
Changes Heroku Time Zone to Eastern Standard for momnet.js day light savings
Command: heroku config:add TZ="America/New_York" -a botsentiment

## Endpoints

### GET : [

| Method | Endpoint      | Description                                                                   |
| ------ | ------------- | ----------------------------------------------------------------------------- |
| GET    | /api/team_members | responds with all team members and managers [{data}] |
| GET    | /api/team_members/:id | responds with the team member/manager acossiated with the specified id [{data}] |
| GET    | /api/team_members/Email/:email | responds with the team member/manager acossiated with the specified email [{data}] |
| GET    | /api/teams  | responds with all teams [{data}]  |
| GET    | /api/teams/:id | responds with a team acossiated with the specified id [{data}] |
| GET    | /api/surveys/manager/:id | responds with all survey's [{data}]  |
| GET    | /api/surveys/:id |  responds with a survey acossiated with the specified id [{data}]  |
| GET    | /api/surveys/changeActivity/:id |  changes the activity of a survey to inactive acossiated with the specified id [{data}] |
| GET    | /api/survey_active | responds with all survey's activity info in the Data Base [{data}]  |      
| GET    | /api/survey_feelings | responds with all survey feelings in the Data Base [{data}]  |
| GET    | /api/survey_feelings/:id | responds with survey feeling acossiated with specified survey feeling id [{data}] |   
| GET    | /api/slackauth | Process for Slack Authorization Returns to Netlify |   
| GET    | /api/slackauth/all | responds with all Slack Auth Table's in the Data Base [{data}]  | 
| GET    | /api/slackauth/:id | responds with slack auth acossiated with specified slack auth id [{data}] |  
| GET    | /api/slackauth/single/:id | responds with slack auth acossiated with specified slack auth member_id [{data}] |  
| GET    | /api/pre-set-feelings | responds with all pre set feelings in the  Data Base [{data}]  |
| GET    | /api/pre-set-feelings/:id | responds with pre set feeling acossiated with specified pre set feeling id [{data}] |   
| GET    | /api/feelings| responds with all feelings in the Data Base [{data}]  |
| GET    | /api/feelings/:id | responds with feeling acossiated with specified feeling id [{data}]  |
| GET    | /api/feelings/:team_id | responds with feelings acossiated with specified team id [{data}]  |
| GET    | /api/feelings/myfeelings/:id | responds with all feelings acossiated with specified team-member [{data}] |



### POST : [

| Method | Endpoint      | Description                                                                   | body                  |
| ------ | ------------- | ----------------------------------------------------------------------------- | --------------------- |

| POST    | /api/team_members | Creates a new team member during initial registration, type and team_id to be determined later | {"firstName": "string", "lastName": "string", "email": "string", "phone": "string", "type": null, "team_id": null}|
| POST    | /api/teams | Creates a new team |{"name": "string", "memberId": integer}|
| POST    | /api/surveys | Creates a new survey with a recurring schedule |{"title": "string", "description": "string", "manager_id": integer, "dailyWeeklyMonthly": "string", "hour": integer, "amPm": "string", "timeZone": "string", "min": integer, "preFeelingIdsArray": [ integers ]}|
| POST    | /api/survey_feelings | Creates a new survey-feeling this is an intermediate table acossiating a survey to a pre set feeling |{"survey_id": integer, "feelings_id": integer}|
| POST    | /api/slash/connect-channel-to-survey | when you place the slash command /connect-channel-to-survey inside the slack channel you will update your users slack auth with the appropriate slack channel id| ---|
| POST    | /api/slash/send-me-buttons | this is route containing the process for posting surveys to slack, use slash command /send-me-buttons inorder to respond to active survey's | ---|
| POST    | /api/pre-set-feelings | Creates a new pre set feeling |{"feeling_text": "string"}|
| POST    | /api/feelings | Creates a new feeling |{"feeling_text": "string", "team_member_id": integer}|


### PUT : [

| Method | Endpoint      | Description                                                                   | body                  |
| ------ | ------------- | ----------------------------------------------------------------------------- | --------------------- |
| PUT    | /api/team_members/:id | Update team member acossiated with specified id |{ "firstName": "string", "lastName": "string", "email": "string", "phone": "string", "type": "string", "team_id": integer }|
| PUT    | /api/team_members/:id/join | Update team member acossiated with specified team id (During Join a Team Process) |{ "team_code": integer }|
| PUT    | /api/teams/:id | Update team acossiated with specified id |{"name": "string", "team_code": integer}|
| PUT    | /api/surveys/:id | Update survey acossiated with specified id |{"title": "string", "description": "string", "manager_id": integer}|
| PUT    | /api/survey_feelings/:id | Update survey_feeling acossiated with specified id |{"survey_id": integer, "feelings_id": integer}|
| PUT    | /api/slackauth/slackAuth/:id | Not Implemented |
| PUT    | /api/pre-set-feelings/:id | Update pre set feeling acossiated with specified id |{"feeling_text": "string"}|
| PUT    | /api/feelings/:id | Update feeling acossiated with specified id |{"feeling_text": "string", "team_member_id": integer}|

### DELETE : [

| Method | Endpoint      | Description                                                                   |
| ------ | ------------- | ----------------------------------------------------------------------------- |
| DELETE    | /api/team_members/:id | Deletes member with acossiated id |
| DELETE    | /api/teams/:id | Deletes team with acossiated id |
| DELETE    | /api/surveys/:id | Deletes survey with acossiated id |
| DELETE    | /api/survey_feelings/:id | Deletes survey_feeling with acossiated id |
| DELETE    | /api/slackauth/slackAuth/:id | Deletes slack auth with acossiated id |
| DELETE    | /api/pre-set-feelings/:id | Deletes pre set feeling with acossiated id |
| DELETE    | /api/feelings/:id | Deletes feeling with acossiated id |
