import express from "express";
import controllers from "../controller/user";
import authenticateToken from "../middleWare/authenticat";

const router = express.Router();

router.get("/", authenticateToken, controllers.getAllUsers);
router.get("/:id", authenticateToken, controllers.getUserById);
router.post("/", controllers.register);
router.post("/addArt", authenticateToken, controllers.addArt);
router.post("/subtractArt", authenticateToken, controllers.subtractArt);
router.post("/login", controllers.login);
router.delete("/:id", authenticateToken, controllers.deleteUser);
router.put("/:id", authenticateToken, controllers.updateUser);

export default router;
