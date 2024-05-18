import { Request, Response } from 'express';
import { User } from '../models/User';
import { Article } from '../models/Article';
import { Movement } from '../models/Movement';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import vars from "../../config/conf"
// Get all users
const getAllUsers = async (req: Request, res: Response)=> {
  try {
    const users = await User.findAll({
      include: {
        model: Movement,
        include: [Article],
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(400).json("can't find any User");
  }
};

// Get user by ID
const getUserById = async (req: Request, res: Response)=> {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "User not found" });
  }
};

// Add a new user
const addUser = async (req: Request, res: Response)=> {
  try {
    console.log(req.body);
    
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to add user" });
  }
};

// Delete a user
const deleteUser = async (req: Request, res: Response)=> {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.json("deleted");
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to delete user" });
  }
};

// Update a user
const updateUser = async (req: Request, res: Response)=> {
  try {
    const { id } = req.params;
    console.log(id);
    console.log(req.body);
    
    let updatedUser = await User.findByPk(id);
    
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      updatedUser.set(req.body)
      console.log(updatedUser);

      await updatedUser.save()
      
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// Login
const login = async (req: Request, res: Response)=> {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ message: "No email provided" });
    } else {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(400).json({ message: "Email not found" });
      } else {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
          const accessToken = jwt.sign(user.toJSON(), vars.ACCESS_TOKEN_SECRET);
          res.status(200).json({ token: accessToken, user });
        } else {
          res.status(400).json({ message: "Incorrect password" });
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

// Register
const register = async (req: Request, res: Response)=> {
  try {
    const { email, password, nom, role,prenom ,phone} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, nom, role ,prenom,phone});
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register user" });
  }
};

// Add Article
const addArt = async (req: Request, res: Response)=> {
  try {
    const { code, name, qte ,fournisseurId} = req.body;
    const userId = req.body.User?.id;  // Assuming you have set req.user in middleware
    console.log(userId);
    
    let article = await Article.findOne({ where: { code } });
    if (!article) {
      article = await Article.create({ code, name });
    }
    article.qte += qte;
    await article.save();

    const movement = await Movement.create({ userId, type: "reception", articleId: article.id, value: qte, fournisseurId:fournisseurId});
    const user = await User.findByPk(userId);
    if (user) {
      await user.$add('movements', movement);
      res.status(201).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

// Subtract Article
const subtractArt = async (req: Request, res: Response)=> {
  try {
    const { code, name, qte } = req.body;
    const userId = req.body.User?.id;  // Assuming you have set req.user in middleware
    console.log(userId);
    
    let article = await Article.findOne({ where: { code } });
    if (!article) {
      article = await Article.create({ code, name });
    }
    article.qte = Math.max(0, article.qte - qte);
    await article.save();

    const movement = await Movement.create({ userId, type: "expedition", articleId: article.id, value: qte });
    const user = await User.findByPk(userId);
    if (user) {
      await user.$add('movements', movement);
      res.status(201).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

export default {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  register,
  login,
  addArt,
  subtractArt
};
