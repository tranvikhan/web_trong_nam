const mongoose = require("mongoose");

const SeasonSchema = mongoose.model(
  "Season",
  new mongoose.Schema(
    {
      house: { type: mongoose.Schema.Types.ObjectId, ref: "House" },
      start_day: { type: Date, default: new Date() },
      steps: [
        {
          info: {
            name: { type: String, require: true },
            day: { type: Number, min: 1 },
            ignored: { type: Boolean, default: false },
          },
          environments: {
            temperature: [Number],
            humidity: [Number],
          },
        },
      ],
      is_active: { type: Boolean, default: true },
    },

    { timestamps: true }
  )
);

//role = Manager | Owner | Viewer
export default mongoose.models.Season || mongoose.model("Season", SeasonSchema);
