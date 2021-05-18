const mongoose = require("mongoose");

const DeviceSchema = mongoose.model(
  "Device",
  new mongoose.Schema(
    {
      hardware_id: { type: String, require: true },
      name: { type: String, default: "Thiết bị" },
      is_on: { type: Boolean, default: false },
      port: { type: Number, require: true },
      router: { type: mongoose.Schema.Types.ObjectId, ref: "Router" },
    },
    { timestamps: true }
  )
);
export default mongoose.models.Device || mongoose.model("Device", DeviceSchema);
