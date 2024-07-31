import express from "express";
import auth from "../middlewares/auth.js";
import buildingController from "../controllers/buildingController.js"

const router = express.Router();

router.post('/', auth.authenticate, auth.checkIsAdmin, buildingController.insert);
router.put('/', auth.authenticate, auth.checkIsAdmin, buildingController.update);
router.get('/', auth.authenticate, auth.checkIsAdmin, buildingController.getAll);
router.delete('/:id', auth.authenticate, auth.checkIsAdmin, buildingController.delete);
// router.delete('/:id', buildingController.delete);

export default router;