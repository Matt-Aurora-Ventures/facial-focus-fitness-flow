
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { audioData, userId } = await req.json();
    
    if (!audioData) {
      return new Response(
        JSON.stringify({ error: "Missing audio data" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // For now, we'll use a mock analysis since we're not actually calling Hugging Face API yet
    // In a real implementation, you would call the HF API here
    const mockAnalysisResults = generateMockAnalysis();
    
    return new Response(
      JSON.stringify(mockAnalysisResults),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Mock function to generate analysis results
function generateMockAnalysis() {
  const emotionalStates = [
    "Mostly calm with some underlying tension",
    "Mild anxiety detected",
    "Generally positive with moments of stress",
    "Balanced emotional state",
    "Signs of mental fatigue"
  ];
  
  const recommendations = [
    "Consider practicing mindfulness for 10 minutes daily",
    "Ensure you're getting adequate sleep (7-8 hours)",
    "Maintain social connections for emotional support",
    "Try deep breathing exercises when feeling stressed",
    "Consider a short nature walk to clear your mind",
    "Limit screen time before bed to improve sleep quality",
    "Practice gratitude journaling for positive mindset",
    "Incorporate light physical activity into your daily routine"
  ];
  
  // Select 2-3 random recommendations
  const selectedRecommendations = [];
  const numRecommendations = Math.floor(Math.random() * 2) + 2; // 2-3 recommendations
  
  for (let i = 0; i < numRecommendations; i++) {
    const randomIndex = Math.floor(Math.random() * recommendations.length);
    selectedRecommendations.push(recommendations[randomIndex]);
    // Remove selected recommendation to avoid duplicates
    recommendations.splice(randomIndex, 1);
  }
  
  return {
    emotionalState: emotionalStates[Math.floor(Math.random() * emotionalStates.length)],
    stressLevel: Math.floor(Math.random() * 70) + 10, // 10-80
    confidence: Math.floor(Math.random() * 20) + 75, // 75-95
    recommendations: selectedRecommendations
  };
}
