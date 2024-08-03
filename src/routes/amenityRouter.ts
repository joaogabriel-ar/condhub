import express from "express";
import amenityController from "../controllers/amenityController.js";

const router = express.Router();

router.post('/', amenityController.insert);
router.get('/', amenityController.getAll);
router.put('/', amenityController.update);
router.delete('/:id', amenityController.delete);

export default router;