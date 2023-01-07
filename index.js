const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const errorHandler = require("./middleware/errorHandleMiddleware");
const tokenHandler = require("./middleware/authorizationMiddleware");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const port = process.env.NODE_ENV || 3000;

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.options("*", (req, res) => {
  res.sendStatus(200);
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/health", (req, res) => res.send({ message: "ok" }));

app.use("/api/v1", require("./routes"));

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

const server = app.listen(port, () => {
  console.log(`THM App running on port ${port}.`);
});
module.exports = server;
