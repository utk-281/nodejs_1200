import { Router } from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
} from "../../controllers/shop/cart.controller.js";

const router = Router();

router.post("/add", addToCart);
router.get("/", getCart);
router.patch("/remove", removeFromCart);
router.patch("/clear", clearCart);

export default router;
