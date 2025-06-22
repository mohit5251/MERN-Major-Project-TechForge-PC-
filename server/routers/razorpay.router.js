import express from "express";
import { createRazorPayOrder, displayAllOrders, displayOrders, placeCODOrder, verifyPayment } from "../controllers/razorpay.controller.js";

const router = express.Router();

router.route("/create-order").post(createRazorPayOrder);

router.route("/payment-verify").post(verifyPayment);

router.route("/order/cod").post(placeCODOrder);

router.route("/get-orders").get(displayOrders);

router.route("/all-orders").get(displayAllOrders);

export const razorpayRouter = router;