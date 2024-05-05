import mongoose from "mongoose";

const fournisseurSchema = new mongoose.Schema({
  nom: {
    type: String,
  },
});

export default mongoose.model("fournisseur", fournisseurSchema);
