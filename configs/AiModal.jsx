import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const AiDesignIdeas = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Based on Logo of type Cartoon Logo Generate a text prompt to create Logo for Logo title/Brand name : baby land with description: a band where we have all things for babies and referring to prompt: Create a set of vibrant, playful logo designs featuring cartoon-style characters with puns or witty text. Each logo should include a cute anthropomorphic object, animal, or food item with expressive features like sunglasses, hats, or smiles, combined with a short, pun-based slogan. Use bold colors, clean lines, and retro aesthetics, ensuring the design is eye-catching and cheerful. Place each logo against a dark background to make the colors pop. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format with ideas field, mean an array with ideas texts do not create single object inside ideas array",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "ideas": [\n    "Smiling sun with baby hat",\n    "Playful cloud wearing diaper",\n    "Happy milk bottle shades",\n    "Giggling bear with rattle",\n        "Winking star in onesie"\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

export const FinalLogoPrompt = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a text prompt to create Logo for Logo Title/Brand name : codecamp,with description: website or coding, with Color combination of Soft Purples, also include the Glowing circuit paths and include App Logo design idea and Referring to this Logo Prompt:Create a vibrant and playful 3D logo for an app. The design should feature bold, colorful text with a glossy finish. Include an icon relevant to the apps theme above the text and a background that complements the concept, such as a bright outdoor scene with natural elements like green grass, a blue sky, and fluffy white clouds. Use a rounded square frame with a yellow border and subtle shadows for a polished and inviting look  Give me result in JSON portal with prompt field only",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "prompt": "Create a logo for the brand \\"codecamp\\" related to website or coding. The logo should use a color combination of soft purples and incorporate glowing circuit paths. Include an app logo design idea. The overall style should be vibrant and playful, inspired by the following: Create a vibrant and playful 3D logo for an app. The design should feature bold, colorful text with a glossy finish. Include an icon relevant to the apps theme above the text and a background that complements the concept, such as a bright outdoor scene with natural elements like green grass, a blue sky, and fluffy white clouds. Use a rounded square frame with a yellow border and subtle shadows for a polished and inviting look. The \\"codecamp\\" logo text should be prominent, and the glowing circuit paths should feel integrated and energetic, emphasizing the technology aspect.  Consider a stylized coding symbol as an icon above or incorporated into the \\"codecamp\\" text.  Think rounded, modern forms with a subtle 3D effect to achieve the playful and professional balance."\n}\n```\n',
        },
      ],
    },
  ],
});

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());
