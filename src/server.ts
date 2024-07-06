import express, { Request, Response } from "express";
import userRouter from "./routes/userRouter.js"
import authRouter from "./routes/authRouter.js"
import cors from "cors"
import Database from "./database/sequelize.js";
import auth from "./middlewares/auth.js";

const database = new Database();

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.get("/protected", auth.authenticate, (req:Request, res: Response, next) => {

    res.json({text: "Protected ", userId: (req as any).userId});

})

app.listen(port, "0.0.0.0", () => console.log(`listening to port oi Pelo amor de deussssssssssssssss ${port}`));

database.tryDatabaseConnection();
database.getDatabaseConnection();