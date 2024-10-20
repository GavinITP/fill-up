import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
const { xss } = require("express-xss-sanitizer");

import connectDB from "./config/db";

//Import Route file
import waterStationRouter from "./routes/waterStation.routes";

//load env vars
dotenv.config({ path: "./src/config/config.env" });

//Connect to database
connectDB();

const app = express();

app.use(express.json());

//Enable API Security
app.use(cors());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100,
});
app.use(limiter);
app.use(hpp());

//mount routers
app.use("/", waterStationRouter);

//Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
    console.log(
        "Server running in ", process.env.NODE_ENV,
        " mode on port ", PORT
    )
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error, promise: Promise<any>) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
