import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";
import { detectIntent } from "../services/intentResolver.js";
import { pickAudio } from "../services/audioPicker.js";
import { generateSpeech } from "../services/tts.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const receiveText = async (req, res) => {
  try {

    const { text } = req.body;

    console.log("📩 Received:", text);

    if (!text) {
      return res.json({ status: "no_text" });
    }

    const intent = detectIntent(text);

    // Intent response
    if (intent) {

      const audioUrl = pickAudio(intent);

      return res.json({
        status: "intent",
        intent,
        audioUrl
      });

    }

    // AI response
    const ai = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are LAARA, a friendly AI robot. Reply very short (1–2 sentences) and speak like a human."
        },
        {
          role: "user",
          content: text
        }
      ]
    });

    const reply = ai.choices[0].message.content;

const audioFile = await generateSpeech(reply);

return res.json({
  status: "ai_reply",
  reply,
  audioUrl: `/${audioFile}`
});

  } catch (err) {

    console.error("❌ Laara Error:", err);
    res.status(500).json({ error: "Laara failed" });

  }
};