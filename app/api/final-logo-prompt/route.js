// Import `GoogleGenerative` from the package we installed earlier.
import { AiDesignIdeas, FinalLogoPrompt } from "@/configs/AiModal";
import { db } from "@/configs/FirebaseConfig";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// Create an asynchronous function POST to handle POST
// request with parameters request and response.
export async function POST(req, res) {
  const { prompt, email, title, desc } = await req.json();
  try {
    const result = await FinalLogoPrompt.sendMessage(prompt);
    const finalAiPrompt = JSON.parse(result.response.text()).prompt;

    //call huggin face model
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA",
      finalAiPrompt,
      {
        headers: {
          Authorization: "Bearer " + process.env.HUGGING_FACE_TOKEN,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    const buffer = Buffer.from(response.data, "binary");

    const base64Image = buffer.toString("base64");
    const base64ImageWithMime = `data:image/png;base64,${base64Image}`;
    // console.log(base64ImageWithMime);

    //save data in firestore
    try {
      // Correct way to save to Firestore
      const docRef = doc(db, "users", email, "logos", new Date().toISOString());
      await setDoc(docRef, {
        image: base64ImageWithMime,
        title: title,
        desc: desc,
      });
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
    return NextResponse.json({ image: base64ImageWithMime });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
