import { Router } from "express";
import {
  getProduct,
  getProducts,
  searchProductByKeyword,
} from "../../controllers/shop/product.controller.js";

const router = Router();

router.get("/all", getProducts);
router.get("/search", searchProductByKeyword);
router.get("/:id", getProduct);

export default router;
