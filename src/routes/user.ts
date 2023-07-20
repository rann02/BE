import { Router } from "express";
import { Controller } from "../controllers/userController/index";
import { authentication } from "../middleware/authen";
const router = Router();

router.post("/register", Controller.createUser);
router.post("/login", Controller.login);
router.use(authentication);
router.get("/me", Controller.getUser);

export default router;
