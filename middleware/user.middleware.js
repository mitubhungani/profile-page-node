const isLogin = (req, res, next) => {
  let { email, password } = req.cookies.User;
  // console.log("middleware", req.cookies.User.email);

  // console.log("uid", email, password);

  if (email && password) {
    next();
  } else {
    res.redirect("/user/login");
  }
};

module.exports = isLogin;
