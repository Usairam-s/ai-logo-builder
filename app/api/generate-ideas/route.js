// Import `GoogleGenerative` from the package we installed earlier.
import { AiDesignIdeas } from "@/configs/AiModal";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Create an asynchronous function POST to handle POST
// request with parameters request and response.
export async function POST(req, res) {
  const { prompt } = await req.json();
  try {
    const result = await AiDesignIdeas.sendMessage(prompt);
    return NextResponse.json(JSON.parse(result.response.text()));
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
