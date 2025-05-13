
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

const Terms: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <Card className="border shadow-sm max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Terms and Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">Medical Disclaimer</h2>
              
              <p className="mb-4">
                The information provided by Insightly ("we," "us," or "our") on this application is for general informational purposes only. All information on the application is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the application.
              </p>
              
              <h3 className="text-lg font-medium mb-2">Medical Consultation Required</h3>
              
              <p className="mb-4">
                <strong>THIS APPLICATION SHOULD NOT BE USED AS A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT.</strong> Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this application.
              </p>
              
              <h3 className="text-lg font-medium mb-2">No Medical Advice</h3>
              
              <p className="mb-4">
                The content of this application, including text, graphics, images, and information obtained from third-party sources, is for informational purposes only. The content is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
              </p>
              
              <h3 className="text-lg font-medium mb-2">User Acknowledgment</h3>
              
              <p className="mb-4">
                By using this application, you acknowledge and agree that:
              </p>
              
              <ul className="list-disc pl-6 mb-4">
                <li>You should always consult with a qualified healthcare professional before starting any diet, exercise, or supplementation program.</li>
                <li>You should always consult with a qualified healthcare professional before using any information from this application.</li>
                <li>Information on this application may not be suitable for your specific health situation.</li>
                <li>Any action you take based on the information found on this application is strictly at your own risk.</li>
                <li>This application is not intended to diagnose, treat, cure, or prevent any disease.</li>
              </ul>
              
              <h3 className="text-lg font-medium mb-2">No Liability</h3>
              
              <p className="mb-4">
                IN NO EVENT SHALL THE APPLICATION PROVIDERS, ITS OFFICERS, DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE APPLICATION.
              </p>
              
              <h3 className="text-lg font-medium mb-2">Accuracy of Information</h3>
              
              <p className="mb-4">
                While we make reasonable efforts to provide accurate and up-to-date information, we make no warranties or representations about the accuracy or completeness of the application's content. Any reliance you place on such information is strictly at your own risk.
              </p>
              
              <p className="font-semibold">
                By creating an account and using this application, you confirm that you have read, understood, and agree to these terms and conditions, and acknowledge that this application should only be used in conjunction with proper medical consultation.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate(-1)}>
              Return
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
