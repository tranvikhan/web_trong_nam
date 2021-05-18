const mongoose = require("mongoose");

const NotificationSchema = mongoose.model(
  "Notification",
  new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      content: { type: String },
      type: { type: String },
      ref: { type: String },
      obj_id: { type: mongoose.Schema.Types.ObjectId },
    },
    { timestamps: true }
  )
);
// type: SUCCESS | WARNING | INFO | DANGER
// ref: Report | Access | ...
export default mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
