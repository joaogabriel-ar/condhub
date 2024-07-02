import express, { Request, Response } from "express";
import userRouter from "./routes/userRouter.js"
import authRouter from "./routes/authRouter.js"
import cors from "cors"
import Database from "./database/sequelize.js";
import authController from "./controllers/authController.js";

const database = new Database();

const app = express();
const port = 8005;

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.get("/protected", authController.authenticate, (req:Request, res: Response, next) => {

    res.json({text: "Protected ", userId: (req as any).userId});

})

app.listen(port, "localhost", () => console.log(`listening to port ${port}`));

database.getDatabaseConnection();