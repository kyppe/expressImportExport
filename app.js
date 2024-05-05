import express from "express";
import ConnectToBd from "./bd.js";
import cors from "cors";
import userRouter from "./src/routes/user.js";
import fournisseursRouter from "./src/routes/fournisseur.js";
import articlesRouter from "./src/routes/article.js";
import movementRouter from "./src/routes/movement.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger_output.json" assert { type: "json" };


const app=express();
app.use(express.json());
const corsOpts = {
  origin: "*",
  methods: ["GET", "POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type"],
};
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { swaggerUrl: "/api-docs" })
);
app.use(cors(corsOpts));
app.use("/clients",userRouter);
app.use("/fournisseurs",fournisseursRouter);
app.use("/articles",articlesRouter);
app.use("/movements",movementRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { swaggerUrl: '/api-docs' }));


ConnectToBd();

app.listen(3000, () => 
{
    console.log("starting with port : 3000")
})