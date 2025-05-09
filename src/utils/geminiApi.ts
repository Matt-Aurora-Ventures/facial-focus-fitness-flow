
import { supabase } from "@/integrations/supabase/client";

export type GeminiModel = 'gemini-1.5-pro' | 'gemini-1.5-flash' | 'gemini-1.0-pro';

export interface GeminiTextRequest {
  model: GeminiModel;
  prompt: string;
  temperature?: number;
  maxOutputTokens?: number;
}

export interface GeminiImageRequest {
  model: GeminiModel;
  prompt: string;
  image: string; // base64 encoded image
  temperature?: number;
  maxOutputTokens?: number;
}

export interface GeminiResponse {
  text: string;
  error?: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

/**
 * Calls the Gemini API with a text prompt
 */
export const generateTextWithGemini = async (
  request: GeminiTextRequest
): Promise<GeminiResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke("gemini-generate", {
      body: {
        model: request.model,
        prompt: request.prompt,
        temperature: request.temperature || 0.7,
        maxOutputTokens: request.maxOutputTokens || 1024,
      },
    });

    if (error) {
      console.error("Error generating text with Gemini:", error);
      return { text: "", error: error.message };
    }

    return { text: data.text || "" };
  } catch (error) {
    console.error("Exception when generating text with Gemini:", error);
    return { text: "", error: error instanceof Error ? error.message : String(error) };
  }
};

/**
 * Calls the Gemini API with a text prompt and an image
 */
export const generateTextFromImageWithGemini = async (
  request: GeminiImageRequest
): Promise<GeminiResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke("gemini-vision", {
      body: {
        model: request.model,
        prompt: request.prompt,
        image: request.image,
        temperature: request.temperature || 0.7,
        maxOutputTokens: request.maxOutputTokens || 1024,
      },
    });

    if (error) {
      console.error("Error generating text from image with Gemini:", error);
      return { text: "", error: error.message };
    }

    return { text: data.text || "" };
  } catch (error) {
    console.error("Exception when generating text from image with Gemini:", error);
    return { text: "", error: error instanceof Error ? error.message : String(error) };
  }
};

/**
 * Generates a response with exponential backoff retry logic
 */
export const generateWithRetry = async (
  generateFn: () => Promise<GeminiResponse>,
  maxRetries = MAX_RETRIES,
  delay = RETRY_DELAY
): Promise<GeminiResponse> => {
  let retries = 0;
  let lastError: string | undefined;

  while (retries < maxRetries) {
    const response = await generateFn();
    
    if (!response.error) {
      return response;
    }
    
    lastError = response.error;
    retries++;
    
    if (retries < maxRetries) {
      // Exponential backoff with jitter
      const jitter = Math.random() * 0.3 * delay;
      const backoffDelay = delay * Math.pow(2, retries - 1) + jitter;
      await new Promise(resolve => setTimeout(resolve, backoffDelay));
    }
  }
  
  return { text: "", error: `Failed after ${maxRetries} attempts. Last error: ${lastError}` };
};
