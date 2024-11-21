import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { requestLogger } from "./middleware/requestMiddleware.js";
import logger from "./utils/logger.js";

// Load environment variables
dotenv.config();

const app = express();

// Request timing
app.use((req, res, next) => {
   req._startTime = Date.now();
   next();
});

// Middleware
app.use(
   cors({
      origin: ["https://http-dogs.netlify.app"],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
   })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(requestLogger);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/lists", listRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB
connectDB()
   .then(() => {
      logger.info("MongoDB connected successfully");
   })
   .catch((error) => {
      logger.error("MongoDB connection error:", error);
      process.exit(1);
   });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   logger.info(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
   );
});
