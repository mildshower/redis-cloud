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

module.exports = { serveValue, setValue };
