import express from "express";
import userRouter from "./routes/userRouter.js"
import cors from "cors"

import { tryConnection } from "./database/sequelize.js";

const app = express();
const port = 8005;

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

app.listen(port, "localhost", () => console.log(`listening to port ${port}`));

tryConnection();