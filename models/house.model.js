const mongoose = require("mongoose");

const HouseSchema = mongoose.model(
  "House",
  new mongoose.Schema(
    {
      name: { type: String, require: true },
      description: { type: String, default: "" },

      size: {
        x: { type: Number, min: 1 },
        y: { type: Number, min: 1 },
      },

      grid_size: { type: Number, default: 10, min: 1 },
      structure: [
        {
          sensor: { type: mongoose.Schema.Types.ObjectId, ref: "Sensor" },
          location: {
            x: { type: Number, require: true },
            y: { type: Number, require: true },
          },
        },
      ],
      door: {
        show: { type: Boolean, default: true },
        direction: { type: String, default: "A" },
      },
    },

    { timestamps: true }
  )
);

export default mongoose.models.House || mongoose.model("House", HouseSchema);
