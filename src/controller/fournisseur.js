import Fournisseur from "../model/fournisseur.js";
import vars from "../../config/conf.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getAllFournisseur = async (req, res) => {
  try {
    const c = await Fournisseur.find();
    console.log(c);
    res.status(200).json(c);
  } catch (e) {
    console.log(e);
    res.status(400).json("can't find any Fournisseur");
  }
};
const getFournisseurById = async (req, res) => {
  try {
    const c = await Fournisseur.findById(req.params.id);
    res.json(c);
  } catch (e) {
    res.status(404).json({ error: "Fournisseur not found" });
  }
};

const addFournisseur = async (req, res) => {
  try {
    const fournisseur = new Fournisseur(req.body);
    const newFournisseur = await fournisseur.save();
    res.status(200).json(newFournisseur);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to add Fournisseur" });
  }
};

const deleteFournisseur = async (req, res) => {
  const id = req.params.id;
  await Fournisseur.findOneAndDelete(id);
  return res.json("deleted");
};
const updateFournisseur = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFournisseur = await Fournisseur.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedFournisseur) {
      return res.status(404).json({ message: "Fournisseur not found" });
    }
    res.status(200).json(updatedFournisseur);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to update Fournisseur" });
  }
};



export default {
  getAllFournisseur,
  getFournisseurById,
  addFournisseur,
  deleteFournisseur,
  updateFournisseur,
};
