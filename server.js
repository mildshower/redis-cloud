const app = require("./src/router");

const main = function (port1, port2) {
  const PORT = port1 || port2 || 9000;
  app.listen(PORT, () => {
    console.log(`I am listening on ${PORT}`);
  });
};

main(+process.argv[2], +process.env.PORT);
