import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  nom: {
    type: String,
  },
  role: {
    type: String,
    enum: ["expediteur", "recepteur", "admin"],
  },
  movements: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "movement" }],
    default: []
  },
});

export default mongoose.model("user", userSchema);
