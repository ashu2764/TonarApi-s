import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./apps/auth/routes/auth.router.js";
import userRoutes from "./apps/user/routes/user.routes.js";
import addressRoutes from "./apps/address/routes/address.routes.js";
import productRoutes from "./apps/products/routes/produt.routes.js";
import categoryRoutes from "./apps/category/routes/category.routes.js";


const app = express();

app.use(cors({ origin: "*" }));
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

export default app;
