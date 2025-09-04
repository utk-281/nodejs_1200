import { Router } from "express";

import {
  addAddress,
  deleteAddress,
  getAddress,
  getAddresses,
  updateAddress,
} from "../../controllers/shop/address.controller.js";

import { authenticate } from "../../middlewares/auth.middleware.js";

import { validate } from "../../middlewares/validate.middleware.js";

import {
  addAddressValidation,
  updateAddressValidation,
} from "../../validations/address.validation.js";

const router = Router();

router.post("/", authenticate, validate(addAddressValidation), addAddress);
router.get("/", authenticate, getAddresses);
router.get("/:id", authenticate, getAddress);
router.patch("/:id", authenticate, validate(updateAddressValidation), updateAddress);
router.delete("/:id", authenticate, deleteAddress);

export default router;
