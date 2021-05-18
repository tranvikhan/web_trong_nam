import connectDB from "../../../middleware/mongodb";
import User from "../../../models/user.model";
const result = require("../../../helper/result.helps");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

async function handler(req, res) {
  const user = new User({
    fullname: req.body.fullname ? req.body.fullname : req.body.username,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }
    user.password = null;
    result.Ok(res, { user: user });
  });
}
export default connectDB(handler);
