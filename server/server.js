import express from "express";
import { connection_db } from "./util/db.js";
import { userRouter } from "./routers/user.router.js";
import cookieParser from "cookie-parser";
import { error_Middleware } from "./middleware/error_Middleware.js";
import cors from "cors";
import { authUser } from "./middleware/auth_middleware.js";
import { categoryRouter } from "./routers/category.router.js";
import { productRouter } from "./routers/products.router.js";
import { pcRouter } from "./routers/preBuildPc.router.js";
import { addToCartRouter } from "./routers/addToCart.router.js";
import { checkoutRouter } from "./routers/checkoutProcess.router.js";
import { razorpayRouter } from "./routers/razorpay.router.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // or whatever your frontend runs on
  credentials: true
}));

app.use(express.json());
app.use(cookieParser())

//authentication logic globally
app.use(authUser);

app.use("/",userRouter);
app.use("/",categoryRouter);
app.use("/",productRouter);
app.use("/",pcRouter);
app.use("/",addToCartRouter);
app.use("/",checkoutRouter);
app.use("/",razorpayRouter);

//for handling global error
app.use(error_Middleware);

connection_db().then(() => {
    app.listen(process.env.PORT, () => {
    console.log(`server is running on port : ${process.env.PORT}`);
    });
});

