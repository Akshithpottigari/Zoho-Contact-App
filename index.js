import express from "express";
import router from "./routes/routes.js";

const app = express();
const PORT = 3000;

// static
app.use(express.static("public"));

// setting up view engine
app.set("view engine", "hbs");
app.set("views", "public/views");

// Routes
app.get("/", router);
app.get("/user", router);
app.get("/createuser", router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
