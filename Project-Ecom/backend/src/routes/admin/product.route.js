import { Router } from "express";
import {
  addProduct,
  deleteImage,
  deleteProduct,
  getProduct,
  getProducts,
  updateImage,
  updateProduct,
} from "../../controllers/admin/product.controller.js";

import upload from "../../middlewares/multer.middleware.js";

const router = Router();

// router.patch("/uploadImage", upload.single("image"), uploadImage);
router.patch("/updateImage", upload.single("image"), updateImage);
router.patch("/deleteImage", deleteImage);

router.post("/addProduct", upload.single("image"), addProduct);
router.get("/all", getProducts);
router.get("/:id", getProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
