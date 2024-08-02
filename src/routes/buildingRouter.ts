import express from "express";
import buildingController from "../controllers/buildingController.js"

const router = express.Router();

router.post('/', buildingController.insert);
router.put('/', buildingController.update);
router.get('/', buildingController.getAll);
router.delete('/:id', buildingController.delete);

export default router;