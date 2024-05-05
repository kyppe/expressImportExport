import express from "express"
import controllers from "../controller/movement.js"
import authenticateToken from "../MiddleWare/authenticate.js"

const router = express.Router();
router.get("/",authenticateToken,controllers.getAllMovement);
router.get("/:id",authenticateToken,controllers.getMovementById);
router.delete("/:id",authenticateToken,controllers.deleteMovement)
router.put("/:id",authenticateToken,controllers.updateMovement)


export default router ;