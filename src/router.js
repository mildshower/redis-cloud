const express = require("express");
const morgan = require("morgan");
const client = require("redis").createClient(process.env.REDIS_URL);
const {
  setValue,
  serveValue,
  serveKeys,
  setTable,
  serveTable,
  serveField,
} = require("./handlers");

const app = express();

app.locals.client = client;

app.use(express.json({ limit: "200kb" }));
app.use(morgan("combined"));

app.get("/get/:databaseId/:key", serveValue);
app.post("/set/:databaseId", setValue);
app.get("/keys/:databaseId", serveKeys);
app.post("/setTable/:databaseId", setTable);
app.get("/getTable/:databaseId/:tableName", serveTable);
app.get("/getField/:databaseId/:tableName/:field", serveField);

module.exports = app;
