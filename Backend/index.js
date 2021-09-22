const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

global.__basedir = __dirname;

dotenv.config();

//Database connection
const connection = require("./db");
connection();

const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

const initRoutes = require("./Routes/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
