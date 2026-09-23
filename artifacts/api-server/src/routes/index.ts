import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contentRouter from "./content";
import studioRouter from "./studio";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contentRouter);
router.use(studioRouter);

export default router;
