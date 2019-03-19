# Labs10-Sentiment

## Front End

##### Front end was built with create-react-app. To run a local server,

##### yarn start must be run inside of the sentiment bot file.

##### Redux is being used to manage state.

##### Notable APIs in use are Stripe, Auth0, and Slack.

##### Hosted on Netlify.

## Back End

##### Backend built with Express and NodeJS

##### Notable APIs in use are Stripe.

## Hosted on heroku.

### GET : [

| Method | Endpoint      | Description                                                                                                                                                                                                                                                                                         |
| ------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /api/managers   | responds with [[{data}]                   |
| GET    | /api/members/:id | responds with [[{data}] |
| GET    | /api/team_members - responds with    | responds with [[{data}] |
| GET    | /api/team_members/:id | responds with [[{data}] |
| GET    | /api/team_members/Email/:email | responds with [[{data}] |
| GET    | /api/teams  | responds with [[{data}]  |
| GET    | /api/teams/:id | responds with [[{data}] |
| GET    | /api/surveys | responds with [[{data}]  |
| GET    | /api/surveys/:id |  responds with [[{data}]  |
| GET    | /api/feelings| responds with [[{data}]  |
| GET    | /api/feelings/:id | responds with [[{data}]  |
| GET    | /api/survey_feelings | responds with [[{data}]  |
| GET    | /api/survey_feelings/:id | responds with [[{data}] |

### POST : [

| Method | Endpoint      | Description                                                                                                                                                                                                                                                                                         |
| ------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST    | /api/feelings | responds with: [{}]  |
| POST    | /api/managers | responds with: [{}]  |

### PUT : [

| Method | Endpoint      | Description                                                                                                                                                                                                                                                                                         |
| ------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PUT    | /api/feelings/:id | responds with [[{data}]  |

### DELETE : [

| Method | Endpoint      | Description                                                                                                                                                                                                                                                                                         |
| ------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DELETE    | /api/feelings/:id | responds with [[{data}]  |
