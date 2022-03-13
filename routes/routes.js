import express from "express";
import mongoose from "mongoose";
import Tank from "./models/schema.js";
import bodyParser from "body-parser";
import dotenv from "dotenv/config";

const SECRET_KEY = process.env.SECRET_KEY;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Db connection

const connection_url = `mongodb+srv://<username>:<password>@cluster0.eib1q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  // useCreateIndex : true,
  useUnifiedTopology: true,
});

// routes
const router = express.Router();

// index route
router.get("/", (req, res) => {
  res.render("index");
});

// createUser route
router.get("/createuser", (req, res) => {
  const newUser = {
    name: req.query.Name,
    email: req.query.email,
    phno: req.query.phno,
  };
  console.log(req.query);
  Tank.create(newUser, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.render("create", { data: data });
    }
  });
});

// get all users route
router.get("/user", (req, res) => {
  Tank.find().then((data) => {
    res.render("table", { data: data });
  });
});

export default router;
