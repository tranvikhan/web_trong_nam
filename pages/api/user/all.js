import connectDB from "../../../middleware/mongodb";
import User from "../../../models/user.model";
const result = require("../../../helper/result.helps");
async function handler(req, res) {
  User.find({}, "fullname username _id avatar email status").exec(
    (err, users) => {
      if (err) {
        result.ServerError(res, err);
        return;
      }
      if (users) result.Ok(res, { users: users });
    }
  );
}
export default connectDB(handler);
