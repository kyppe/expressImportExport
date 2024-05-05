import Article from "../model/article.js";
import vars from "../../config/conf.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getAllArticle = async (req, res) => {
  try {
    const c = await Article.find();
    console.log(c);
    res.status(200).json(c);
  } catch (e) {
    console.log(e);
    res.status(400).json("can't find any Article");
  }
};
const getArticleById = async (req, res) => {
  try {
    const c = await Article.findById(req.params.id);
    res.json(c);
  } catch (e) {
    res.status(404).json({ error: "Article not found" });
  }
};


const deleteArticle = async (req, res) => {
  const id = req.params.id;
  await Article.findOneAndDelete(id);
  return res.json("deleted");
};
const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedArticle = await Article.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(updatedArticle);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to update Article" });
  }
};



export default {
  getAllArticle,
  getArticleById,
  deleteArticle,
  updateArticle,
};
