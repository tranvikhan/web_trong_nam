const mongoose = require("mongoose");

const AccessSchema = mongoose.model(
  "Access",
  new mongoose.Schema(
    {
      house: { type: mongoose.Schema.Types.ObjectId, ref: "House" },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      role: { type: String, default: "Manager" },
      accepted: { type: Boolean, default: false },
    },

    { timestamps: true }
  )
);

//role = Manager | Owner | Viewer
export default mongoose.models.Access || mongoose.model("Access", AccessSchema);
