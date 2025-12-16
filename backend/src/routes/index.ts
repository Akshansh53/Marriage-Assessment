import { Router } from "express";
import authRouter from "./authroute";
import venueRouter from "./venueRoute";
import imageRouter from "./imageRoute";

const router = Router();

router.use("/auth", authRouter);
router.use("/venues",venueRouter)
router.use(imageRouter);
export default router;
