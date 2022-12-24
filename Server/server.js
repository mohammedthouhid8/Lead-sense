
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Task3: Importing todo model//
let todoRouter = require("./router/todo.router");
let userRouter = require("./router/user.router");

dotenv.config();
const PORT = process.env.PORT;
const MONGODBUSER = process.env.MONGODB_USER;
const MONGODBPWD  = process.env.MONGODB_PWD;
const MONGODBHOST = process.env.MONGODB_HOST;
const MONGODB = process.env.MONGODB_DB;

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Setting up router PATH for external URL//
// app.use("/todos", todoRouter);
app.use("/users", userRouter);

mongoose.connect(
  //   "mongodb+srv://abhi2001:EY9mTZJA4oQimX5O@cluster0.kh3fq.mongodb.net/test",
  `mongodb+srv://${MONGODBUSER}:${MONGODBPWD}@${MONGODBHOST}/${MONGODB}`,
       { useNewUrlParser: true }
  );

const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection Established");
});


app.listen(PORT, () =>
  console.log(`Server application listening on port  ${PORT} `)
);
