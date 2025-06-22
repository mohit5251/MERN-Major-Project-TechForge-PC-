import express from "express";
import { addToCart, deleteCartItem, displayCart, updateCart } from "../controllers/addToCart.controller.js";

const router = express.Router();

router.route("/addToCart").post(addToCart);

router.route("/displayCart").get(displayCart);

router.route("/delete-cart-item/:id").delete(deleteCartItem);

router.route("/update-cart/:itemId").patch(updateCart);

export const addToCartRouter  = router;