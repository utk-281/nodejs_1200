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

import { validate } from "../../middlewares/validate.middleware.js";
import {
  addProductSchema,
  deleteImageSchema,
  updateImageSchema,
  updateProductSchema,
} from "../../validations/product.validation.js";

const router = Router();

// router.patch("/uploadImage", upload.single("image"), uploadImage);

router.patch("/updateImage", validate(updateImageSchema), upload.single("image"), updateImage);
router.patch("/deleteImage", validate(deleteImageSchema), deleteImage);

router.post("/addProduct", validate(addProductSchema), upload.single("image"), addProduct);
router.get("/all", getProducts);
router.get("/:id", getProduct);
router.patch("/:id", validate(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
