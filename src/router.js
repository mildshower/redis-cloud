const express = require("express");
const morgan = require("morgan");
const client = require("redis").createClient(process.env.REDIS_URL);
const { setValue, serveValue, serveKeys } = require("./handlers");

const app = express();

app.locals.client = client;

app.use(express.json({ limit: "200kb" }));
app.use(morgan("combined"));

app.get("/get/:databaseId/:key", serveValue);
app.post("/set/:databaseId", setValue);
app.get("/keys/:databaseId", serveKeys);

module.exports = app;
