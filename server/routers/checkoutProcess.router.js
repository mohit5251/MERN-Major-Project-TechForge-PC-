import express from "express";
import { registerValidation } from "../middleware/register_Validation.js";
import { shippingAddressSchema } from "../validator/shippingAddress.validator.js";
import { addShippingAddress, getShippingAddress, updateShippingAddress } from "../controllers/checkoutProcess.controller.js";

const router = express.Router();

router.route("/add-shipping-address").post( registerValidation(shippingAddressSchema), addShippingAddress );

router.route("/get-shipping-address").get(getShippingAddress);

router.route("/update-shipping-address").put( registerValidation(shippingAddressSchema), updateShippingAddress);

export const checkoutRouter = router;