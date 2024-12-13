const express = require("express");
const path = require("path");
const Cookies = require("cookie-parser");
const DBConnect = require("./config/db");
const userRouter = require("./router/user.route");
const isLogin = require("./middleware/user.middleware");

const app = express();
app.use(Cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", isLogin, (req, res) => {
  let { username, email, img } = req.cookies.User;
  
  res.render("index", { username, email, img });
});

app.use("/user", userRouter);

app.listen(8090, () => {
  console.log("Server is running on port 8090");
  DBConnect();
});