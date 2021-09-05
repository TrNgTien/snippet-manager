const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const snippetRoutes = require("./routers/snippetRouter.js");
app.use(express.json());

app.listen(5000, () => console.log("Welcome to the app snippet"));
// Connect to the database
mongoose.connect(
  process.env.MDB_CONNECT_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to the database");
    }
  }
);
app.use("/snippet", snippetRoutes);
