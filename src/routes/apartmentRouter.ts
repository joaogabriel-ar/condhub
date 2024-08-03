import express from "express";
import apartmentController from "../controllers/apartmentController.js"

const router = express.Router();

router.post('/', apartmentController.insert);
router.get('/', apartmentController.getAll);
router.put('/', apartmentController.update);
router.delete('/:id', apartmentController.delete);

export default router;