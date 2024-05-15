import express from "express"
import controllers from "../controller/movement"
import authenticateToken from "../middleWare/authenticat"

const router = express.Router();
router.get("/",authenticateToken,controllers.getAllMovement);
router.get("/:id",authenticateToken,controllers.getMovementById);
router.delete("/:id",authenticateToken,controllers.deleteMovement)
router.put("/:id",authenticateToken,controllers.updateMovement)


export default router ;