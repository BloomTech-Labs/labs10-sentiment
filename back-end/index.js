require("dotenv").config();
const { server } = require("./api/server.js");

let port;

if (process.env.DB_ENV === "development") {
  port = 5000;
} else if (process.env.DB_ENV === "production") {
  port = process.env.PORT;
}

server.listen(port, () => {
  console.log(`Server listening ${port}`);
});
