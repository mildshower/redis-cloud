const express = require("express");
const morgan = require("morgan");
const client = require("redis").createClient();
const { setValue, serveValue } = require("./handlers");

const app = express();

app.locals.client = client;

app.use(express.json({ limit: "200kb" }));
app.use(morgan("combined"));

app.get("/get/:databaseId/:key", serveValue);
app.post("/set/:databaseId", setValue);

module.exports = app;
