import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./apps/auth/routes/auth.router.js";
import userRoutes from "./apps/user/routes/user.routes.js";


const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());

//auhentication routes
app.use("/api/auth", authRoutes);

//user routes
app.use("/api/user", userRoutes);


export default app;
