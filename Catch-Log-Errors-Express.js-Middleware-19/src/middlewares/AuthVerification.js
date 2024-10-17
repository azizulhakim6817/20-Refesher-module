const { DecodeToken } = require("../utility/TokenHelper");

module.exports = (req, res, next) => {
  token = req.cookies["Token"];

  let decoded = DecodeToken(token);


  if (decoded === null) {
    return res.status(401).json({
      status: 401,
      message: "Invalid Token",
    });
  } else {
    // Set cookie
    let options = {
      maxAge: 1 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
    res.cookie("Token", decoded, options);
    let email = decoded["email"];
    req.headers.email = email;
    next();
  }
};
