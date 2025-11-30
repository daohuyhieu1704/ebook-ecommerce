import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import moment from "moment";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
import router from "../src/routes/index.js";
import "../src/database/init.mysqldb.js";

const app = express();
const { config } = dotenv;
config();

app.use(bodyParser.raw({ inflate: true, type: "application/json" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

app.use(cors());

// init routes
app.get("/", function (req, res) {
  res.send("Server is running!");
});

app.use("", router);

export default app;
