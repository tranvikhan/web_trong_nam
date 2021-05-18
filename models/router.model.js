const mongoose = require("mongoose");

const RouterSchema = mongoose.model(
  "Router",
  new mongoose.Schema(
    {
      hardware_id: { type: String, require: true },
      name: { type: String, default: "Thiết bị" },
      is_on: { type: Boolean, default: false },
      house: { type: mongoose.Schema.Types.ObjectId, ref: "House" },
      activate_key: { type: String, default: "CUSC-ROUTER-DX00-23AF" },
    },
    { timestamps: true }
  )
);

export default mongoose.models.Router || mongoose.model("Router", RouterSchema);
