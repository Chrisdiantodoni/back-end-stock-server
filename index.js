const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const Middleware = require("./middleware");
const Database = require("./database");
const RoutingClient = require("./src/client/routing");

// Midleware ====

Middleware({ app, bodyParser, cors, express });
//  end Middleware ====

RoutingClient(app);
// RoutingAdmin(app);
// RoutingSuperAdmin(app);
// RoutingPublic(app);
// end Routing =====

// app.get('/', async (req, res) => {
//   try {
//     const result = await mst_city.findAll()
//     res.json({
//       data:result
//     })
//   } catch (error) {
//     res.json({
//       data:error.message
//     })
//   }
// });

Database.authenticate()
  .then((res) => {
    try {
      console.log("berhasil terkoneksi dengan database", res);
    } catch (error) {
      console.log(`Something Error ${error.message}`);
    }
  })
  .catch((err) => {
    console.log("err", err);
  });

Database.sync({
  alter: false,
  force: false,
});

const port = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

app.listen(port, () => {
  console.log(`server sudah jalan di port ${port} ${NODE_ENV}`);
});
