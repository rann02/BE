import express from "express";
import UserRoutes from "./user";
const router = express.Router();

router.use("/api", UserRoutes);

export default router;
