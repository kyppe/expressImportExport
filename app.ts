import express from "express";
import cors from "cors";
import userRouter from "./src/routes/user";
import fournisseursRouter from "./src/routes/fournisseur";
import articlesRouter from "./src/routes/article";
import movementRouter from "./src/routes/movement";

import sequelize from "./database";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const corsOpts = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], // Add Authorization header
};
app.use(cors(corsOpts));

// Swagger Documentation

// Routes
app.use("/clients", userRouter);
app.use("/fournisseurs", fournisseursRouter);
app.use("/articles", articlesRouter);
app.use("/movements", movementRouter);

// Start server and sync database
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
