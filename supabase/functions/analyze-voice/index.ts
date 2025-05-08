
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
    const { audioData, userId, journalMoodTrend } = await req.json();
    
    if (!audioData) {
      return new Response(
        JSON.stringify({ error: "Missing audio data" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // In a real implementation, you would call the HF API here for voice analysis
    // For now, we'll use a mock analysis that integrates journal data if available
    const mockAnalysisResults = generateMockAnalysis(journalMoodTrend);
    
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

// Mock function to generate analysis results, now considering journal mood trends
function generateMockAnalysis(journalMoodTrend = null) {
  const emotionalStates = [
    "Mostly calm with some underlying tension",
    "Mild anxiety detected",
    "Generally positive with moments of stress",
    "Balanced emotional state",
    "Signs of mental fatigue",
    "Emotionally resilient",
    "Experiencing mild emotional fluctuations"
  ];
  
  const baseRecommendations = [
    "Consider practicing mindfulness for 10 minutes daily",
    "Ensure you're getting adequate sleep (7-8 hours)",
    "Maintain social connections for emotional support",
    "Try deep breathing exercises when feeling stressed",
    "Consider a short nature walk to clear your mind",
    "Limit screen time before bed to improve sleep quality",
    "Practice gratitude journaling for positive mindset",
    "Incorporate light physical activity into your daily routine",
    "Try a guided meditation session focused on emotional awareness",
    "Consider speaking with a mental health professional if symptoms persist"
  ];
  
  // Additional recommendations based on journal trends
  const journalBasedRecommendations = [];
  if (journalMoodTrend === 'declining') {
    journalBasedRecommendations.push(
      "Your mood seems to be declining based on journal entries. Consider reviewing what factors might be contributing to this change.",
      "Scheduling an activity you enjoy might help improve your emotional state."
    );
  } else if (journalMoodTrend === 'improving') {
    journalBasedRecommendations.push(
      "Your mood appears to be improving according to your journal. Continue with the positive changes you've been making.",
      "Reflect on what strategies have been working well for you recently."
    );
  } else if (journalMoodTrend === 'fluctuating') {
    journalBasedRecommendations.push(
      "Your emotional state shows some fluctuation. Establishing a consistent daily routine might help stabilize your mood.",
      "Consider tracking specific triggers that may be causing mood changes."
    );
  }
  
  // Combine base and journal-based recommendations
  const allRecommendations = [...baseRecommendations, ...journalBasedRecommendations];
  
  // Select 2-3 random recommendations
  const selectedRecommendations = [];
  const numRecommendations = Math.floor(Math.random() * 2) + 2; // 2-3 recommendations
  
  for (let i = 0; i < numRecommendations; i++) {
    const randomIndex = Math.floor(Math.random() * allRecommendations.length);
    selectedRecommendations.push(allRecommendations[randomIndex]);
    // Remove selected recommendation to avoid duplicates
    allRecommendations.splice(randomIndex, 1);
  }
  
  // Add a journal-specific recommendation if available and not already selected
  if (journalBasedRecommendations.length > 0 && !selectedRecommendations.some(rec => journalBasedRecommendations.includes(rec))) {
    selectedRecommendations.push(journalBasedRecommendations[0]);
  }
  
  return {
    emotionalState: emotionalStates[Math.floor(Math.random() * emotionalStates.length)],
    stressLevel: Math.floor(Math.random() * 70) + 10, // 10-80
    confidence: Math.floor(Math.random() * 20) + 75, // 75-95
    recommendations: selectedRecommendations
  };
}
