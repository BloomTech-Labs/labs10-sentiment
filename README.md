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

 Notable APIs in use are Stripe.

 Hosted on heroku.

## Authors

* **Austin Blake**  - [dyiar](https://github.com/dyiar)
* **Joseph Eastman** - [josepheastman](https://github.com/josepheastman)
* **Samuel Partner**  - [Zatara-Wrought](https://github.com/Zatara-Wrought)
* **Thomas Claydon**  - [gittc100](https://github.com/gittc100)
* **Tyrone CartWright**  - [Tyrone-Cartwright](https://github.com/Tyrone-Cartwright)
* **Michelle Okagbue**  - [Mokagbue](https://github.com/Mokagbue)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Endpoints

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
