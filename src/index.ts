import { Request, Response } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import { AppConf } from "./conf";
const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
const webpackConfig = require("../webpack.config.js");
const compiler = webpack(webpackConfig);
const instance = middleware(compiler, {
  hot: true,
  stats: {
    colors: true
  }
});
const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(instance);
app.use(require("webpack-hot-middleware")(compiler));

const PORT = AppConf.get("APP_PORT") || 8009;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
console.log("--------------", AppConf.get("APP_PORT"));
