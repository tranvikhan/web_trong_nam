const mongoose = require("mongoose");

const ReportSchema = mongoose.model(
  "Report",
  new mongoose.Schema(
    {
      house: { type: mongoose.Schema.Types.ObjectId, ref: "House" },
      ref: { type: String },
      obj_id: { type: mongoose.Schema.Types.ObjectId },
      content: { type: String },
      value: {},
    },
    { timestamps: true }
  )
);
// ref: Device | Sensor | Season
export default mongoose.models.Report || mongoose.model("Report", ReportSchema);
