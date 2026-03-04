import { exec } from "child_process";
import fs from "fs";

export const generateSpeech = (text) => {

  return new Promise((resolve, reject) => {

    // ensure audio folder exists
    if (!fs.existsSync("audio")) {
      fs.mkdirSync("audio");
    }

    const id = Date.now();

    const audioFile = `audio_${id}.mp3`;
    const textFile = `audio/${id}.txt`;

    fs.writeFileSync(textFile, text);

exec(`python3 -m edge_tts --file ${textFile} --voice en-IN-NeerjaNeural --write-media audio/${audioFile}`, (err) => {

      if (err) {
        reject(err);
      } else {

        fs.unlinkSync(textFile); // delete temp txt
        resolve(`audio/${audioFile}`);

      }

    });

  });

};