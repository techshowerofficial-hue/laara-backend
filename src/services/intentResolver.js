import fs from "fs";

const intents = JSON.parse(
  fs.readFileSync(new URL("../intentMap.json", import.meta.url))
);


export function detectIntent(text) {
  text = text.toLowerCase();

  for (let intent in intents) {
    for (let keyword of intents[intent]) {
      if (text.includes(keyword)) {
        return intent;
      }
    }
  }
  return null;
}
