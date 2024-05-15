import { Request, Response } from 'express';
import { Article } from '../models/Article';

// Get all articles
const getAllArticle = async (req: Request, res: Response) => {
  try {
    const articles = await Article.findAll();
    console.log(articles);
    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(400).json("can't find any Article");
  }
};

// Get article by ID
const getArticleById = async (req: Request, res: Response) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Article not found" });
  }
};

// Delete article
const deleteArticle = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedArticle = await Article.destroy({ where: { id } });
    if (deletedArticle) {
      res.json("deleted");
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to delete Article" });
  }
};

// Update article
const updateArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updatedRows, [updatedArticle]] = await Article.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updatedRows === 0) {
      res.status(404).json({ message: "Article not found" });
    } else {
      res.status(200).json(updatedArticle);
    }
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
