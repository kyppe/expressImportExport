import express from "express"
import controllers from "../controller/article.js"
import authenticateToken from "../MiddleWare/authenticate.js"

const router = express.Router();
router.get("/",authenticateToken,controllers.getAllArticle);
router.get("/:id",authenticateToken,controllers.getArticleById);
router.delete("/:id",authenticateToken,controllers.deleteArticle)
router.put("/:id",authenticateToken,controllers.updateArticle)


export default router ;