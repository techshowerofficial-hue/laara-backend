import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import connectDB from "./src/config/db.js";
import laaraRoutes from "./routes/laara.routes.js"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// 🔥 MongoDB connect
// connectDB();

const app = express();

app.use(cors());
app.use(express.json());


// 🔥 Serve audio folder
app.use("/intents", express.static(path.join(__dirname, "intents")));
app.use("/laara", laaraRoutes);

app.get("/", (req, res) => {
  res.send("Laara is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port http://10.22.10.238:${PORT}`);
});
