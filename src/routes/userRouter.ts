import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get('/teste', (_:any,respose:any) => {
    respose.send("<h1>oiiiiiiiiiii</h2>")
});

router.get('/', userController.getAll);
router.post('/', userController.insert);
router.delete('/:id', userController.delete);
router.put('/', userController.update);
router.get('/teste', userController.teste);


export default router;