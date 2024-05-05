import Movement from "../model/movement.js";
import vars from "../../config/conf.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getAllMovement = async (req, res) => {
  try {
    const c = await Movement.find().populate("user").populate("article");
    console.log(c);
    res.status(200).json(c);
  } catch (e) {
    console.log(e);
    res.status(400).json("can't find any Movement");
  }
};
const getMovementById = async (req, res) => {
  try {
    const c = await Movement.findById(req.params.id);
    res.json(c);
  } catch (e) {
    res.status(404).json({ error: "Movement not found" });
  }
};


const deleteMovement = async (req, res) => {
  const id = req.params.id;
  await Movement.findOneAndDelete(id);
  return res.json("deleted");
};
const updateMovement = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovement = await Movement.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMovement) {
      return res.status(404).json({ message: "Movement not found" });
    }
    res.status(200).json(updatedMovement);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to update Movement" });
  }
};



export default {
  getAllMovement,
  getMovementById,
  deleteMovement,
  updateMovement,
};
