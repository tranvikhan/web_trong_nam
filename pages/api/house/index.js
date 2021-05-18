import connectDB from "../../../middleware/mongodb";
import VerifyToken from "../../../middleware/auth.middleware";
import House from "../../../models/house.model";
import Access from "../../../models/access.model";
const result = require("../../../helper/result.helps");
const mongoose = require("mongoose");

async function handler(req, res) {
  console.log(mongoose.models);
  if (req.method === "POST") {
    let new_house = new House(req.body);
    new_house.save((error, house) => {
      if (error) {
        result.BadRequest(res, err);
        return;
      }
      let new_access = new Access({
        house: house._id,
        user: req.user_id,
        role: "Owner",
        accepted: true,
      });
      new_access.save((error, access) => {
        if (error) {
          result.BadRequest(res, err);
          return;
        }
        result.Ok(res, { house: house });
      });
    });
  }
}

export default connectDB(VerifyToken(handler));
