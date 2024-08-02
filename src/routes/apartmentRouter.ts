import express from "express";
import auth from "../middlewares/auth.js";
import apartmentController from "../controllers/apartmentController.js"

const router = express.Router();

router.post('/', apartmentController.insert);
// router.put('/', auth.authenticate, auth.checkIsAdmin, apartmentController.update);
// router.get('/', auth.authenticate, auth.checkIsAdmin, apartmentController.getAll);
// router.delete('/:id', auth.authenticate, auth.checkIsAdmin, apartmentController.delete);
// router.delete('/:id', apartmentController.delete);

export default router;