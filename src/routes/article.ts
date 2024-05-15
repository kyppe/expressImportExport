import express from "express"
import controllers from "../controller/article"
import authenticateToken from "../MiddleWare/authenticat"

const router = express.Router();
router.get("/",authenticateToken,controllers.getAllArticle);
router.get("/:id",authenticateToken,controllers.getArticleById);
router.delete("/:id",authenticateToken,controllers.deleteArticle)
router.put("/:id",authenticateToken,controllers.updateArticle)


export default router ;