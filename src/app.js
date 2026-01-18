import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./apps/auth/routes/auth.router.js";
import userRoutes from "./apps/user/routes/user.routes.js";
import addressRoutes from "./apps/address/routes/address.routes.js";
import productRoutes from "./apps/products/routes/produt.routes.js";
import categoryRoutes from "./apps/category/routes/category.routes.js";
import cartRoutes from "./apps/cart/routes/cart.routes.js";
import wishlistRoutes from "./apps/wishlist/routes/wishlist.routes.js";
import orderRoutes from "./apps/order/routes/order.routes.js";
import paymentRoutes from "./apps/payment/routes/payment.routes.js";


const app = express();

// app.use(cors({ origin: "*" }));
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

//auhentication routes
app.use("/api/auth", authRoutes);

//user routes
app.use("/api/user", userRoutes);

//address routes
app.use("/api/address", addressRoutes);

//products routes
app.use("/api/products", productRoutes);

//category routes
app.use("/api", categoryRoutes);

//cart routes
app.use("/api", cartRoutes);

//wishlist routes
app.use("/api", wishlistRoutes);

//order routes
app.use("/api", orderRoutes);

//payment routes
app.use("/api", paymentRoutes);

export default app;
