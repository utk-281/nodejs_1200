import { Router } from "express";

import {
  addAddress,
  deleteAddress,
  getAddress,
  getAddresses,
  updateAddress,
} from "../../controllers/shop/address.controller.js";

import { validate } from "../../middlewares/validate.middleware.js";

import {
  addAddressValidation,
  updateAddressValidation,
} from "../../validations/address.validation.js";

const router = Router();

router.post("/", validate(addAddressValidation), addAddress);
router.get("/", getAddresses);
router.get("/:id", getAddress);
router.patch("/:id", validate(updateAddressValidation), updateAddress);
router.delete("/:id", deleteAddress);

export default router;
