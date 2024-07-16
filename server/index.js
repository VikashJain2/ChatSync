import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
const app = express();
dotenv.config();
app.use(
  cors({
    credentials: true,
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
const port = process.env.PORT || 3001;

connectDB();
app.listen(port, () => {
  console.log(`Server started at port http://localhost:${port}`);
});
