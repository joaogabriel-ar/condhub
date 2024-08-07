import express from "express";
import amenityReservationController from "../controllers/amenityReservationController.js";

const router = express.Router();

router.post('/', amenityReservationController.insert);
router.get('/', amenityReservationController.getAll);
router.put('/', amenityReservationController.update);
router.delete('/:id', amenityReservationController.delete);

export default router;