const authenticationRouter = require("./authentication");
const projectRouter = require("./project");
const supplierRouter = require("./supplier");
const stockRouter = require("./stock");
const tukangRouter = require("./tukang");
const approvalRouter = require("./approvalProject");
const progressProjectRouter = require("./progressProject");
const payRouter = require("./pay");
const { url } = require("../../../utils");
const { pathRouterClient } = url;

const Routing = (app) => {
  app.use(pathRouterClient("auth"), authenticationRouter);
  app.use(pathRouterClient("project"), projectRouter);
  app.use(pathRouterClient("supplier"), supplierRouter);
  app.use(pathRouterClient("stock"), stockRouter);
  app.use(pathRouterClient("tukang"), tukangRouter);
  app.use(pathRouterClient("approval"), approvalRouter);
  app.use(pathRouterClient("progress"), progressProjectRouter);
  app.use(pathRouterClient("pay"), payRouter);
};

module.exports = Routing;
