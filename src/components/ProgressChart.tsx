
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChartLine } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressChart: React.FC = () => {
  // Mock data - in a real app this would come from the user's history
  const data = [
    { date: 'Week 1', score: 65, weight: 187 },
    { date: 'Week 2', score: 68, weight: 186 },
    { date: 'Week 3', score: 72, weight: 185 },
    { date: 'Week 4', score: 74, weight: 185 },
    { date: 'Week 5', score: 78, weight: 184 },
    { date: 'Week 6', score: 75, weight: 183 },
    { date: 'Week 7', score: 80, weight: 182 },
    { date: 'Week 8', score: 82, weight: 180 }
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-facefit-purple/20 flex items-center justify-center">
              <ChartLine className="w-4 h-4 text-facefit-purple" />
            </div>
            <h3 className="font-medium">Progress Trends</h3>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                yAxisId="left"
                orientation="left"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                domain={[50, 100]}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="score" 
                stroke="#9b87f5" 
                fill="#9b87f5" 
                fillOpacity={0.3} 
                activeDot={{ r: 6 }} 
                name="Wellness Score"
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="weight" 
                stroke="#0EA5E9" 
                fill="#0EA5E9" 
                fillOpacity={0.1} 
                activeDot={{ r: 6 }}
                name="Weight (lbs)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
