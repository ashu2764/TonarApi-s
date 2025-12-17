import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./apps/auth/routes/auth.router.js";


const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);


export default app;
