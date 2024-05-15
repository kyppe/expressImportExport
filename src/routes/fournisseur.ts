import express from "express"
import controllers from "../controller/fournisseur"
import authenticateToken from "../MiddleWare/authenticat"

const router = express.Router();
router.get("/",authenticateToken,controllers.getAllFournisseur);
router.get("/:id",authenticateToken,controllers.getFournisseurById);
router.delete("/:id",authenticateToken,controllers.deleteFournisseur)
router.put("/:id",authenticateToken,controllers.updateFournisseur)
router.post("/",controllers.addFournisseur)


export default router ;