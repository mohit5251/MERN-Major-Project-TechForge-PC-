import express from "express";
import { deleteProducts, getSingleProduct, infiniteProducts, infiniteProductsAdmin, insertProducts, totalProducts, updateProduct } from "../controllers/product.controller.js";
import { upload } from "../middleware/upload.js";
import { registerValidation } from "../middleware/register_Validation.js";
import { productSchema } from "../validator/product.validator.js";

const router = express.Router();

router.route("/insertProducts").post(upload.single("image"), registerValidation(productSchema) , insertProducts);

router.route("/infinityProducts/:subCategory").get(infiniteProducts);

router.route("/infinityProductsAdmin").get(infiniteProductsAdmin);

router.route("/deleteProducts/:id").delete(deleteProducts);

router.route("/totalProducts").get(totalProducts);

router.route("/getSingleProduct/:id").get(getSingleProduct);

router.route("/updateProduct/:id").put(upload.single("image"), registerValidation(productSchema) , updateProduct);

export const productRouter = router;