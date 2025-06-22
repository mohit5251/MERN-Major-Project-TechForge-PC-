import express from "express";
import { deletePc, detailsOfall, getSinglePc, infinitePCs, InsertPC, searchProducts, updatePc } from "../controllers/PreBuildPc.controller.js";
import { upload } from "../middleware/upload.js";
import { registerValidation } from "../middleware/register_Validation.js";
import { pcSchema } from "../validator/pc.validator.js";

const router = express.Router();

router.route("/insertPC").post(upload.single("image"), registerValidation(pcSchema), InsertPC);

router.route("/infintePCDisplay").get(infinitePCs);

router.route("/deletePc/:id").delete(deletePc);

router.route("/getSinglePc/:id").get(getSinglePc);

router.route("/updatePc/:id").put(upload.single("image"), registerValidation(pcSchema), updatePc);


//Deatils of ALL products
router.route("/details/:name").get(detailsOfall);

//Search Data Globally
router.route("/search").get(searchProducts);

export const pcRouter = router;