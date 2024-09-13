import express from "express";
import proxy from "express-http-proxy";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const MAIL_SERVICE_URL = process.env.MAIL_SERVICE_URL || "";
const REPORT_SERVICE_URL = process.env.REPORT_SERVICE_URL || "";
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "";
const WATER_STATION_SERVICE_URL = process.env.WATER_STATION_SERVICE_URL || "";

app.use("/mail", proxy(MAIL_SERVICE_URL));
app.use("/report", proxy(REPORT_SERVICE_URL));
app.use("/user", proxy(USER_SERVICE_URL));
app.use("/water-station", proxy(WATER_STATION_SERVICE_URL));

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
