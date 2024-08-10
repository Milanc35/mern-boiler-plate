import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import config from "./config/config";
import { errorHandler } from "./utils/ErrorHandler";
//import { v2 as cloudinary } from "cloudinary";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import logger from "./utils/logger";
import connection from "./config/db";

//cloudinary.config(Config.getConfig('cloudinary') as Object);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: config.getConfig('frontendUrl', '') as string,
        credentials: true,
    })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);



app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!errorHandler.isTrustedError(err)) {
        next(err);
    }
    await errorHandler.handleError(err);
});

process.on('uncaughtException', (error: Error) => {
    errorHandler.handleError(error);
    if (!errorHandler.isTrustedError(error)) {
        process.exit(1);
    }
});

const db = connection.then(() => {
    logger.debug("DB Connected successfully")
});

app.listen(config.getConfig('port', 7000) as number, () => {
    logger.debug("Server started successfully, PORT: " + config.getConfig('port', 7000).toString())
});