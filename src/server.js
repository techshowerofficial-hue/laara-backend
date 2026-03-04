import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
// import connectDB from "./src/config/db.js";
import laaraRoutes from "./routes/laara.routes.js"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// 🔥 MongoDB connect
// connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/audio", express.static("audio", {
  setHeaders: (res) => {
    res.set("Content-Type", "audio/mpeg");
  }
}));
// 🔥 Serve audio folder
app.use("/intents", express.static(path.join(__dirname, "intents")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/laara", laaraRoutes);

app.get("/", (req, res) => {
  res.send("Laara is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port http://10.22.10.238:${PORT}`);
});
