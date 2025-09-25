import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export async function POST(request: Request) {
  const { message, imageBase64, chatHistory } = await request.json();

  try {
    let contents;

    // Helper function to create parts array with optional image
    const createParts = (text: string, imageData?: string) => {
      const parts: any[] = [];
      
      if (text) {
        parts.push({ text });
      }
      
      if (imageData) {
        // Extract base64 data from data URI if present
        const base64Data = imageData.startsWith('data:') 
          ? imageData.split(',')[1] 
          : imageData;
        
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: "image/jpeg"
          }
        });
      }
      
      return parts;
    };

    if (chatHistory && chatHistory.length > 0) {
      // Map chat history with proper image handling
      contents = chatHistory.map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: createParts(msg.message, msg.image),
      }));

      // Add the new message
      contents.push({
        role: "user",
        parts: createParts(message, imageBase64),
      });
    } else {
      // New conversation
      contents = [
        {
          role: "user",
          parts: createParts(message, imageBase64),
        },
      ];
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    return Response.json({ responseMessage: response.text });
  } catch (error) {
    console.error("Gemini error: ", error);
    return Response.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
