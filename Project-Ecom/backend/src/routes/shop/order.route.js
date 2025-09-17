import { Router } from "express";
import {
  captureOrder,
  createOrder,
  getOrder,
  getOrders,
} from "../../controllers/shop/order.controller.js";

const router = Router();

router.post("/create", createOrder);
router.post("/capture", captureOrder);
router.get("/all", getOrders);
router.get("/:id", getOrder);

export default router;
