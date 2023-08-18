const stockRouter = require("./stock");
const { url } = require("../../../utils");
const { pathRouterClient } = url;

const Routing = (app) => {
  app.use(pathRouterClient("stock"), stockRouter);
};

module.exports = Routing;
