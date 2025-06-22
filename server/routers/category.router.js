import express from "express";
import { upload } from "../middleware/upload.js";
import { deleteCategory, displayCategory, getSingleCategory, InfiniteCategory, InsertCategory, updateCategory } from "../controllers/categoty.controller.js";
import { registerValidation } from "../middleware/register_Validation.js";
import { categorySchema } from "../validator/category.validator.js";

const router = express.Router();

router.route("/addCategory").post(upload.single("image"), registerValidation(categorySchema), InsertCategory);

router.route("/category").get(displayCategory);

router.route("/infinteCategory").get(InfiniteCategory);

router.route("/deleteCategory/:id").delete(deleteCategory);

router.route("/getSingleCategory/:id").get(getSingleCategory);

router.route("/updateCategory/:id").put(upload.single("image"), registerValidation(categorySchema), updateCategory);

export const categoryRouter = router;