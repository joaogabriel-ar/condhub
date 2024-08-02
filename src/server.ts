import express from "express";
import auth from "./middlewares/auth.js";
import userRouter from "./routes/userRouter.js"
import authRouter from "./routes/authRouter.js"
import apartmentRouter from "./routes/apartmentRouter.js"
import buildingRouter from "./routes/buildingRouter.js"
import cors from "cors"
import Database from "./database/sequelize.js";

const database = new Database();

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.use("/users", 
    auth.authenticate, 
    userRouter);

app.use("/buildings", auth.authenticate,
     auth.checkIsAdmin, 
     buildingRouter);
     
app.use("/apartments", 
    auth.authenticate, 
    auth.checkIsSyndic,
    apartmentRouter);

app.use("/auth", authRouter);
// app.get("/protected", auth.authenticate, (req:Request, res: Response, next) => {

//     res.json({text: "Protected ", userId: (req as any).userId});

// });

// process.on('uncaughtException', (err) => {
//     console.error('There was an uncaught error', err);
//     server.close(() => {
//         process.exit(1); // Exit with a 'failure' code
//     });
// });

// process.on('unhandledRejection', (reason, promise) => {
//     console.error('Unhandled Rejection at:', promise, 'reason:', reason);
//     server.close(() => {
//         process.exit(1); // Exit with a 'failure' code
//     });
// });

const server = app.listen(port, "0.0.0.0", () => console.log(`listening to port oi Pelo amor de deussssssssssssssss ${port}`));

database.tryDatabaseConnection();
database.getDatabaseConnection();