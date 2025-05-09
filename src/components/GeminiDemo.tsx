
import React, { useState } from 'react';
import { generateTextWithGemini, GeminiModel } from '@/utils/geminiApi';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GeminiDemo: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [model, setModel] = useState<GeminiModel>('gemini-1.5-pro');
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt to generate text",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setResponse('');

    try {
      const result = await generateTextWithGemini({
        model: model,
        prompt: prompt,
        temperature: 0.7,
        maxOutputTokens: 1024
      });

      if (result.error) {
        toast({
          title: "Error generating response",
          description: result.error,
          variant: "destructive"
        });
      } else {
        setResponse(result.text);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to Gemini API",
        variant: "destructive"
      });
      console.error("Error calling Gemini API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gemini AI Assistant</CardTitle>
        <CardDescription>
          Ask Gemini AI a question and get an intelligent response
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="model" className="text-sm font-medium">Model</label>
            <Select value={model} onValueChange={(value) => setModel(value as GeminiModel)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
                <SelectItem value="gemini-1.0-pro">Gemini 1.0 Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <label htmlFor="prompt" className="text-sm font-medium">Your question</label>
          <Textarea
            id="prompt"
            placeholder="Ask something..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || !prompt.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              Generating...
            </>
          ) : "Ask Gemini"}
        </Button>

        {response && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <h3 className="text-sm font-medium mb-2">Gemini's response:</h3>
            <div className="text-sm whitespace-pre-wrap">{response}</div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Powered by Google Gemini API
      </CardFooter>
    </Card>
  );
};

export default GeminiDemo;
