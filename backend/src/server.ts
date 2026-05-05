import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { linkRoutes } from "./routes/link.routes";
import { errorHandler } from "./middlewares/error-handler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(linkRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});