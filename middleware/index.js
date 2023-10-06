const { url } = require("../utils");
const expressip = require("express-ip");
const { pathImage } = require("../utils/url");

const Middleware = ({ app, bodyParser, cors, express }) => {
  app.use(cors());

  app.options("*", cors());
  app.use(bodyParser.urlencoded());
  app.use(bodyParser.json());

  app.use(expressip().getIpInfoMiddleware);

  app.use(pathImage, express.static("./uploads/project"));
};

module.exports = Middleware;
