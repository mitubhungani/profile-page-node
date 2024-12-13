const { Router } = require("express");
const {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getSignupPage,
  getLoginPage,
  loginUser,
} = require("../controller/user.controller");
const upload = require("../utils/imgUpload");
// const requireFild = require('../middleware/user.middleware')

const userRouter = Router();

userRouter.get("/login", getLoginPage);
userRouter.get("/signup", getSignupPage);

userRouter.get("/", getUser);
userRouter.get("/:userId", getUserById);
userRouter.post("/signup", upload.single("img"), createUser);
userRouter.patch("/updateuser/:userId", updateUser);
userRouter.delete("/deleteuser/:userId", deleteUser);

userRouter.post("/login", loginUser);

module.exports = userRouter;
