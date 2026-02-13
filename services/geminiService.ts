import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateLoveMessage = async (mood: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment.";
  }

  try {
    const prompt = `
      Ты — романтический помощник. Напиши короткое, душевное и очень милое поздравление 
      или признание в любви для девушки по имени Анна на тему "${mood}". 
      Это подарок на 14 февраля. 
      Я её очень люблю. 
      Текст должен быть на русском языке, эмоциональным, но не слишком длинным (максимум 3-4 предложения).
      Используй эмодзи.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for faster simple responses
        temperature: 0.8,
      }
    });

    return response.text || "Анна, я люблю тебя больше всего на свете! ❤️";
  } catch (error) {
    console.error("Error generating message:", error);
    return "Анна, ты — самое дорогое, что у меня есть. С Днем Святого Валентина! ❤️";
  }
};