
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from 'lucide-react';

const GeminiPricing: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Google Gemini API Pricing</CardTitle>
            <a 
              href="https://ai.google.dev/gemini-api/docs/pricing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              Official Pricing <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
          <CardDescription>
            Current pricing information for Google Gemini API models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Text Models</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model</TableHead>
                    <TableHead>Input (per 1K characters)</TableHead>
                    <TableHead>Output (per 1K characters)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Gemini 1.5 Pro</TableCell>
                    <TableCell>$0.0005</TableCell>
                    <TableCell>$0.0015</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gemini 1.5 Flash</TableCell>
                    <TableCell>$0.00025</TableCell>
                    <TableCell>$0.0005</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gemini 1.0 Pro</TableCell>
                    <TableCell>$0.000125</TableCell>
                    <TableCell>$0.000375</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-2">Image Input Pricing</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model</TableHead>
                    <TableHead>Price per image</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Gemini 1.5 Pro</TableCell>
                    <TableCell>$0.0002</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gemini 1.5 Flash</TableCell>
                    <TableCell>$0.0002</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gemini 1.0 Pro Vision</TableCell>
                    <TableCell>$0.0025</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-2">Video Input Pricing</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model</TableHead>
                    <TableHead>Price per second</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Gemini 1.5 Pro</TableCell>
                    <TableCell>$0.00025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gemini 1.5 Flash</TableCell>
                    <TableCell>$0.00025</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-2">Audio Input Pricing</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model</TableHead>
                    <TableHead>Price per second</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Gemini 1.5 Pro</TableCell>
                    <TableCell>$0.00025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gemini 1.5 Flash</TableCell>
                    <TableCell>$0.00025</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <div className="text-sm text-gray-500 mt-4">
              <p>* Pricing as of May 2025. Please check the official Google AI documentation for the most up-to-date pricing.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeminiPricing;
