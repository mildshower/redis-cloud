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
  removeField,
  flushDB,
  verifyRequest,
  addToLeft,
  popFromRight,
} = require("./handlers");

const app = express();

app.locals.client = client;

app.use(express.json({ limit: "200kb" }));
app.use(morgan("combined"));

app.use(verifyRequest);
app.get("/get/:databaseId/:key", serveValue);
app.post("/set/:databaseId", setValue);
app.get("/keys/:databaseId", serveKeys);
app.post("/setTable/:databaseId", setTable);
app.get("/getTable/:databaseId/:tableName", serveTable);
app.get("/getField/:databaseId/:tableName/:field", serveField);
app.post("/delFields/:databaseId", removeField);
app.post("/flush/:databaseId", flushDB);
app.post("/lpush/:databaseId", addToLeft);
app.get("/rpop/:databaseId/:listName", popFromRight);

module.exports = app;
