import { Request, Response } from 'express';
import { Movement } from '../models/Movement';
import { User } from '../models/User';
import { Article } from '../models/Article';

// Get all movements
const getAllMovement = async (req: Request, res: Response) => {
  try {
    const movements = await Movement.findAll({
      include: [User, Article]
    });
    console.log(movements);
    res.status(200).json(movements);
  } catch (error) {
    console.error(error);
    res.status(400).json("can't find any Movement");
  }
};

// Get movement by ID
const getMovementById = async (req: Request, res: Response) => {
  try {
    const movement = await Movement.findByPk(req.params.id);
    if (movement) {
      res.json(movement);
    } else {
      res.status(404).json({ error: "Movement not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Movement not found" });
  }
};

// Delete movement
const deleteMovement = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedMovement = await Movement.destroy({ where: { id } });
    if (deletedMovement) {
      res.json("deleted");
    } else {
      res.status(404).json({ message: "Movement not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to delete movement" });
  }
};

// Update movement
const updateMovement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updatedRows, [updatedMovement]] = await Movement.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updatedRows === 0) {
      res.status(404).json({ message: "Movement not found" });
    } else {
      res.status(200).json(updatedMovement);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to update movement" });
  }
};

export default {
  getAllMovement,
  getMovementById,
  deleteMovement,
  updateMovement,
};
