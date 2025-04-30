import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import job from "./src/lib/cron.js";

import {connectDB} from "./lib/db.js";


const app = express();
const PORT = process.env.PORT || 10000;

job.start();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
  });
  