import { Router } from "express";
import {
  addProduct,
  deleteImage,
  deleteProduct,
  getProduct,
  getProducts,
  updateImage,
  updateProduct,
  uploadImage,
} from "../../controllers/admin/product.controller.js";

import upload from "../../middlewares/multer.middleware.js";

const router = Router();

router.patch("/uploadImage", upload.single("image"), uploadImage);

router.post("/addProduct", addProduct);

router.get("/all", getProducts);

router.get("/:id", getProduct);

router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.patch("/updateImage", updateImage);

router.patch("/deleteImage", deleteImage);

export default router;
