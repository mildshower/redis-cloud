const generateFields = function (fields) {
  const params = [];
  Object.entries(fields).forEach((pair) => params.push(...pair));
  return params;
};

const selectDatabase = function (client, res, id, callback) {
  client.select(id, (err, value) => {
    if (err) res.json({ error: err });
    else callback(value);
  });
};

const serveValue = function (req, res) {
  const { databaseId, key } = req.params;
  selectDatabase(req.app.locals.client, res, databaseId, () => {
    req.app.locals.client.get(key, (err, value) => {
      res.json({ key, value, err });
    });
  });
};

const setValue = function (req, res) {
  const { key, value } = req.body;
  selectDatabase(req.app.locals.client, res, req.params.databaseId, () => {
    req.app.locals.client.set(key, value, (err, status) => {
      res.json({ key, value, err, status });
    });
  });
};

const serveKeys = function (req, res) {
  selectDatabase(req.app.locals.client, res, req.params.databaseId, () => {
    req.app.locals.client.keys("*", (err, keys) => {
      res.json({ keys, err });
    });
  });
};

const setTable = function (req, res) {
  const { tableName, fields } = req.body;
  selectDatabase(req.app.locals.client, res, req.params.databaseId, () => {
    req.app.locals.client.hset(
      tableName,
      ...generateFields(fields),
      (err, modificationCount) => {
        res.json({ err, modificationCount });
      }
    );
  });
};

const serveTable = function (req, res) {
  const { databaseId, tableName } = req.params;
  selectDatabase(req.app.locals.client, res, databaseId, () => {
    req.app.locals.client.hgetall(tableName, (err, table) => {
      res.json({ table, err });
    });
  });
};

const serveField = function (req, res) {
  const { databaseId, tableName, field } = req.params;
  selectDatabase(req.app.locals.client, res, databaseId, () => {
    req.app.locals.client.hget(tableName, field, (err, value) => {
      res.json({ tableName, field, value, err });
    });
  });
};

module.exports = {
  serveValue,
  setValue,
  serveKeys,
  setTable,
  serveTable,
  serveField,
};
