import express from "express";
import auth from "./middlewares/auth.js";
import userRouter from "./routes/userRouter.js"
import authRouter from "./routes/authRouter.js"
import apartmentRouter from "./routes/apartmentRouter.js"
import amenityRouter from "./routes/amenityRouter.js"
import buildingRouter from "./routes/buildingRouter.js"
import amenityReservationRouter from "./routes/amenityReservationRouter.js"
import cors from "cors"
import Database from "./database/sequelize.js";


const database = new Database();

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.use("/users", 
    auth.authenticate,
    auth.checkIsSyndic,
    userRouter);

app.use("/buildings", auth.authenticate,
     auth.checkIsAdmin, 
     buildingRouter);
     
app.use("/apartments", 
    auth.authenticate, 
    auth.checkIsSyndic,
    apartmentRouter);

app.use("/amenities",
    auth.authenticate,
    auth.checkIsSyndic,
    amenityRouter);

app.use("/amenity/reservations",
    auth.authenticate,
    auth.checkIsSyndic,
    amenityReservationRouter);

app.use("/auth", authRouter);

const server = app.listen(port, "0.0.0.0", () => console.log(`listening to port ${port}`));

database.tryDatabaseConnection();
database.getDatabaseConnection();