import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
  },
  qte: {
    type: Number,
    default: 0
  },
});

export default mongoose.model("article", articleSchema);
