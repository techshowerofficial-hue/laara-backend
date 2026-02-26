import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function pickAudio(intent) {

  // 🔥 Correct relative path from services folder
  const dir = path.join(__dirname, "../intents", intent);

  console.log("Correct Path:", dir);

  if (!fs.existsSync(dir)) {
    console.log("Folder NOT found");
    return null;
  }

  const files = fs.readdirSync(dir).filter(file =>
    file.endsWith(".mp3") || file.endsWith(".wav")
  );

  if (!files.length) {
    console.log("No audio files inside folder");
    return null;
  }

  const randomFile = files[Math.floor(Math.random() * files.length)];

  return `/intents/${intent}/${randomFile}`;
}