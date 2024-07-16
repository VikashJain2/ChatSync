/**
 * Import required modules
 */
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

/**
 * Create an instance of the Express app
 */
const app = express();

/**
 * Load environment variables from.env file
 */
dotenv.config();

/**
 * Enable CORS with specified options
 *
 * @example
 * // Allow requests from http://localhost:3000
 * origin: ["http://localhost:3000"]
 */
app.use(
  cors({
    credentials: true,
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
  })
);

/**
 * Parse cookies from incoming requests
 */
app.use(cookieParser());

/**
 * Set the port for the server to listen on
 *
 * @example
 * // Set port to 3001 if environment variable PORT is not set
 * const port = process.env.PORT || 3001;
 */
const port = process.env.PORT || 3001;

/**
 * Establish a connection to the database
 */
connectDB();

/**
 * Start the server and listen on the specified port
 *
 * @example
 * // Server started at port http://localhost:3001
 * app.listen(port, () => {
 *   console.log(`Server started at port http://localhost:${port}`);
 * });
 */
app.listen(port, () => {
  console.log(`Server started at port http://localhost:${port}`);
});