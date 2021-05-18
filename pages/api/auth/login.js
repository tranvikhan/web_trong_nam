import connectDB from "../../../middleware/mongodb";
import User from "../../../models/user.model";

const result = require("../../../helper/result.helps");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

async function handler(req, res) {
  User.findOne(
    {
      username: req.body.username,
    },
    ""
  ).exec((err, user) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }
    if (!user) {
      result.NotFound(res, "Tài khoản không tồn tại");
      return;
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      result.BadRequest(res, "Sai mật khẩu");
      return;
    }

    var token = jwt.sign(
      { id: user.id },
      process.env.AUTH_SECRET_KEY || "CUSC",
      {
        expiresIn: 86400, // 24 hours
      }
    );

    user.password = null;
    result.Ok(res, { user: user, accessToken: token });
    return;
  });
}

export default connectDB(handler);
