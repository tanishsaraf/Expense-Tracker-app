import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";

dotenv.config({ path: "./config/config.env" });
const app = express();

const port = process.env.PORT;

// Connect to Database
connectDB();

// Allowed origins for CORS
const allowedOrigins = [
  "https://main.d1sj7cd70hlter.amplifyapp.com",
  "https://expense-tracker-app-three-beryl.vercel.app",
  // Add more origins as needed
];

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Helmet configuration
app.use(morgan("dev")); // Logging HTTP requests
app.use(bodyParser.json()); // Parse JSON body
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded body

// Routers
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
