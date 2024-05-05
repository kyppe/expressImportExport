import mongoose from "mongoose";

const movementSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  type: { type: String },
  value:{type:Number},
  date: {
    type: Date, 
    default: Date.now
  },
  article: { type: mongoose.Schema.Types.ObjectId, ref: "article" },
});

export default mongoose.model("movement", movementSchema);
