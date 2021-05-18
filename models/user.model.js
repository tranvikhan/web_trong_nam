const mongoose = require("mongoose");

const UserSchema = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      username: { type: String, require: true, unique: true },
      email: { type: String, require: true, unique: true },
      password: { type: String, require: true },

      fullname: { type: String, default: "" },
      phone: { type: String, default: "" },
      dateOfBirth: { type: Date, default: Date.now, max: Date.now },
      gender: { type: String, default: "Male" },

      address: { type: String, default: "" },
      status: { type: String, default: "offline" },
      avatar: { type: String, default: null },
    },
    { timestamps: true }
  )
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
