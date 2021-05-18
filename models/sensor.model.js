const mongoose = require("mongoose");

const SensorSchema = mongoose.model(
  "Sensor",
  new mongoose.Schema(
    {
      hardware_id: { type: String, require: true },
      name: { type: String, default: "Cảm biến" },
      type: ["temperature", "humidity"],
      router: { type: mongoose.Schema.Types.ObjectId, ref: "Router" },
      is_on: { type: Boolean, default: false },
      activate_key: { type: String, default: "CUSC-SENSOR-DX00-23AF" },
    },
    { timestamps: true }
  )
);
export default mongoose.models.Sensor || mongoose.model("Sensor", SensorSchema);
