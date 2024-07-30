import express from "express";
import auth from "../middlewares/auth.js";
import buildingController from "../controllers/buildingController.js"

const router = express.Router();

// router.get('/', buildingController.getAll);
router.post('/', auth.authenticate, auth.checkIsAdmin, buildingController.insert);
// router.delete('/:id', buildingController.delete);
// router.put('/', buildingController.update);

export default router;