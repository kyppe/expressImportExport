import User from "../model/user.js";
import vars from "../../config/conf.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Article from "../model/article.js";
import Movement from "../model/movement.js"
const getAllUsers = async (req, res) => {
  try {
    const c = await User.find().populate({path :"movements",populate:"article"});
    console.log(c);
    res.status(200).json(c);
  } catch (e) {
    console.log(e);
    res.status(400).json("can't find any User");
  }
};
const getUserById = async (req, res) => {
  try {
    const c = await User.findById(req.params.id);
    res.json(c);
  } catch (e) {
    res.status(404).json({ error: "User not found" });
  }
};

const addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to add user" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  await User.findOneAndDelete(id);
  return res.json("deleted");
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user" });
  }
};
const login = async (req, res) => {
  try {
    if (!req.body.email) {
      res.status(400).json({ mesg: "no email" });
    } else {
      const user = await User.findOne({ email: req.body.email });
      console.log(req.body.email);
      console.log(req.body.password);
      console.log(user);

      if (!user) {
        res.status(400).json({ mesg: "email not found" });
      } else {
        if (await bcrypt.compare(req.body.password, user.password)) {
          const accessToken = jwt.sign(user.toJSON(), vars.ACCESS_TOKEN_SECRET);

          res.status(200).json({ token: accessToken, user });
        } else {
          res.status(400).json({ mesg: "the password is wrong" });
        }
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ mesg: "there is an error" });
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body.password);
    const hasedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      email: req.body.email,
      password: hasedPassword,
      nom: req.body.nom,
      role: req.body.role,
    });

    console.log(user);
    const Newclient = await user.save();
    res.status(201).json(Newclient);
  } catch (e) {
    res.status(500);
  }
};
const addArt = async (req, res) => {
  try {
   let art=await Article.findOne({code:req.body.code})
    if (!art) {
      art=await Article.create({code:req.body.code,name:req.body.name})
    }
    art.qte=art.qte+req.body.qte
    await art.save()
    const mvt = new Movement({user:req.User,type:"add",article:art,value:req.body.qte}) 
    await mvt.save()
    console.log(req.User);
    
    let user = await User.findById(req.User._id);
    user.movements.push(mvt)
    user.save()
    res.status(201).json(user);

  } catch (error) {
    console.log(error);
    res.status(500).json({ mesg: "there is an error" });
  }
}
const subtractArt = async (req, res) => {
  try {
   let art=await Article.findOne({code:req.body.code})
    if (!art) {
      art=await Article.create({code:req.body.code,name:req.body.name})
    }
    art.qte=art.qte-req.body.qte
    if(art.qte<0)
      {
        art.qte=0;
      }
    await art.save()
    const mvt = new Movement({user:req.User,type:"subtract",article:art,value:req.body.qte}) 
    await mvt.save()
    console.log(req.User);
    
    let user = await User.findById(req.User._id);
    user.movements.push(mvt)
    user.save()
    res.status(201).json(user);

  } catch (error) {
    console.log(error);
    res.status(500).json({ mesg: "there is an error" });
  }
}
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
