const express = require("express");
const morgan = require("morgan");
const client = require("redis").createClient(process.env.REDIS_URL);
// if (process.env.REDISTOGO_URL) {
//   const rtg = require("url").parse(process.env.REDISTOGO_URL);
//   client = require("redis").createClient(rtg.port, rtg.hostname);
//   client.auth(rtg.auth.split(":")[1]);
// } else {
//   client = require("redis").createClient();
// }
const { setValue, serveValue } = require("./handlers");

const app = express();

app.locals.client = client;

app.use(express.json({ limit: "200kb" }));
app.use(morgan("combined"));

app.get("/get/:databaseId/:key", serveValue);
app.post("/set/:databaseId", setValue);

module.exports = app;
