const authenticationRouter = require("./authentication");
const projectRouter = require("./project");
const supplierRouter = require("./supplier");
const stockRouter = require("./stock");
const { url } = require("../../../utils");
const { pathRouterClient } = url;

const Routing = (app) => {
  app.use(pathRouterClient("auth"), authenticationRouter);
  app.use(pathRouterClient("project"), projectRouter);
  app.use(pathRouterClient("supplier"), supplierRouter);
  app.use(pathRouterClient("stock"), stockRouter);
};

module.exports = Routing;
