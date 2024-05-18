import { Request, Response } from 'express';
import { Fournisseur } from '../models/Fournisseur';

// Get all fournisseurs
const getAllFournisseur = async (req: Request, res: Response)=> {
  try {
    const fournisseurs = await Fournisseur.findAll();
    console.log(fournisseurs);
    res.status(200).json(fournisseurs);
  } catch (error) {
    console.error(error);
    res.status(400).json("can't find any Fournisseur");
  }
};

// Get fournisseur by ID
const getFournisseurById = async (req: Request, res: Response)=> {
  try {
    const fournisseur = await Fournisseur.findByPk(req.params.id);
    if (fournisseur) {
      res.json(fournisseur);
    } else {
      res.status(404).json({ error: "Fournisseur not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Fournisseur not found" });
  }
};

// Add a new fournisseur
const addFournisseur = async (req: Request, res: Response)=> {
  try {
    const newFournisseur = await Fournisseur.create(req.body);
    res.status(200).json(newFournisseur);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to add Fournisseur" });
  }
};

// Delete fournisseur
const deleteFournisseur = async (req: Request, res: Response)=> {
  try {
    const id = req.params.id;
    const deletedFournisseur = await Fournisseur.destroy({ where: { id } });
    if (deletedFournisseur) {
      res.json("deleted");
    } else {
      res.status(404).json({ message: "Fournisseur not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to delete Fournisseur" });
  }
};

// Update fournisseur
const updateFournisseur = async (req: Request, res: Response)=> {
  try {
    const { id } = req.params;
    console.log(id);
    console.log(req.body)
  let updatedFournisseur = await Fournisseur.findByPk(id);
    
    if (!updatedFournisseur) {
      res.status(404).json({ message: "Fournisseur not found" });
    } else {
      updatedFournisseur.set(req.body)
      await updatedFournisseur.save()
      res.status(200).json(updatedFournisseur);
    }
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
