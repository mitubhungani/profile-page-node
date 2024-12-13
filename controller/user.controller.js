const User = require("../model/user.model");

const getUser = async (req, res) => {
  try {
    let user = await User.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    let { userId } = req.params;
    let user = await User.findById(userId);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createUser = async (req, res) => {

  console.log("request",req.file);
  if(req.file){
    req.body.img = req.file.path;
  }
  try {
    let { username, email, password, img } = req.body;
    if (!username || !email || !password || !img ) {
      return res.status(400).json({ error: "All fields are required" });
    } else {
      let { email } = req.body;
      let isExist = await User.findOne({ email: email });
      if (isExist) {
        return res.status(400).json({ error: "Email already exists" });
      } else {
        let user = await User.create(req.body);
        res.status(200).send(user);
      }
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    let { userId } = req.params;
    let user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    let { userId } = req.params;
    let user = await User.findByIdAndDelete(userId);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let isExist = await User.findOne({ email: email });

    if (!isExist) {
      return res.send("Not Found");
    }
    if (isExist.password != password) {
      return res.send("Invalid password");
    }

    let user= {username: isExist.username,email:isExist.email, password: isExist.password,img: isExist.img}
    console.log('img',user.img);
    
    res.cookie('User',user)
    // res.cookie("username", isExist.username);
    // res.cookie("email", isExist.email);
    // res.cookie("img", isExist.img);
    // res.cookie("userId", isExist.id);
    // console.log(isExist.id);
    return res.redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getSignupPage = (req, res) => {
  res.render("signup");
};

const getLoginPage = (req, res) => {
  res.render("login");
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getSignupPage,
  getLoginPage,
};
