import { detectIntent } from "../services/intentResolver.js";
import { pickAudio } from "../services/audioPicker.js";

export const receiveText = async (req, res) => {
  try {
    const { text } = req.body;

    console.log("📩 Received:", text);

    if (!text) {
      return res.json({ status: "no_text" });
    }

    const intent = detectIntent(text);

    if (!intent) {
      return res.json({ status: "no_intent" });
    }

    const audioUrl = pickAudio(intent);

    if (!audioUrl) {
      return res.json({ status: "no_audio", intent });
    }

    console.log("🧠 Intent:", intent);
    console.log("🔊 Audio:", audioUrl);

    return res.json({
      status: "ok",
      intent,
      audioUrl
    });

  } catch (err) {
    console.error("❌ Laara Error:", err);
    res.status(500).json({ error: "Laara failed" });
  }
};