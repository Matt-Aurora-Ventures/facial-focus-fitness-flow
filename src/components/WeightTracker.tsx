
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale, Plus, Calendar, ChartLine } from "lucide-react";
import { format, subDays } from "date-fns";
import { toast } from "sonner";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WeightEntry {
  id: string;
  weight: number;
  date: Date;
  note?: string;
}

const WeightTracker: React.FC = () => {
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>(() => {
    // Try to load from localStorage on component mount
    const saved = localStorage.getItem('weightEntries');
    if (saved) {
      try {
        // Parse the saved data and convert date strings back to Date objects
        return JSON.parse(saved).map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }));
      } catch (e) {
        console.error('Failed to parse weight entries from localStorage', e);
        return generateMockData();
      }
    }
    return generateMockData();
  });
  
  const [currentWeight, setCurrentWeight] = useState("");
  const [note, setNote] = useState("");
  const [showForm, setShowForm] = useState(false);
  
  // Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('weightEntries', JSON.stringify(weightEntries));
  }, [weightEntries]);
  
  // Initial weight value is most recent entry or empty
  useEffect(() => {
    if (weightEntries.length > 0) {
      const latestEntry = [...weightEntries].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];
      setCurrentWeight(latestEntry.weight.toString());
    }
  }, []);
  
  const handleAddWeight = () => {
    const weightValue = parseFloat(currentWeight);
    
    if (isNaN(weightValue) || weightValue <= 0) {
      toast.error("Please enter a valid weight value");
      return;
    }
    
    const newEntry: WeightEntry = {
      id: Date.now().toString(),
      weight: weightValue,
      date: new Date(),
      note: note.trim() || undefined
    };
    
    setWeightEntries(prev => [newEntry, ...prev]);
    toast.success("Weight successfully recorded!");
    setNote("");
    setShowForm(false);
  };
  
  const getStartValue = () => {
    if (weightEntries.length === 0) return 0;
    return Math.min(...weightEntries.map(entry => entry.weight)) - 5;
  };
  
  const getEndValue = () => {
    if (weightEntries.length === 0) return 100;
    return Math.max(...weightEntries.map(entry => entry.weight)) + 5;
  };

  const chartData = [...weightEntries]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(entry => ({
      date: format(new Date(entry.date), 'MMM d'),
      weight: entry.weight
    }));
    
  // Calculate weight change metrics
  const calculateWeightChange = () => {
    if (weightEntries.length < 2) return { recent: 0, monthly: 0 };
    
    const sortedEntries = [...weightEntries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Most recent change
    const recentChange = sortedEntries.length >= 2 
      ? sortedEntries[0].weight - sortedEntries[1].weight 
      : 0;
      
    // Monthly change (closest to 30 days ago)
    const today = new Date();
    const monthAgo = subDays(today, 30);
    
    const closestToMonthAgo = sortedEntries.find(
      entry => new Date(entry.date) <= monthAgo
    );
    
    const monthlyChange = closestToMonthAgo 
      ? sortedEntries[0].weight - closestToMonthAgo.weight
      : 0;
      
    return { recent: recentChange, monthly: monthlyChange };
  };
  
  const weightChanges = calculateWeightChange();
  
  function generateMockData(): WeightEntry[] {
    // Generate some mock data for demo purposes
    const mockEntries: WeightEntry[] = [];
    const endDate = new Date();
    
    for (let i = 60; i >= 0; i -= 7) {
      const entryDate = subDays(endDate, i);
      // Weight that fluctuates a bit but trends downward
      const baseWeight = 185;
      const trendDecrease = i / 60 * 10; // Lose 10 pounds over 60 days
      const randomFluctuation = (Math.random() - 0.5) * 2; // +/- 1 pound random fluctuation
      
      mockEntries.push({
        id: `mock-${i}`,
        weight: Math.round((baseWeight - trendDecrease + randomFluctuation) * 10) / 10,
        date: entryDate,
      });
    }
    
    return mockEntries;
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-facefit-purple/20 flex items-center justify-center">
                <Scale className="w-5 h-5 text-facefit-purple" />
              </div>
              <div>
                <h3 className="font-medium">Current Weight</h3>
                <p className="text-sm text-muted-foreground">
                  Last updated {weightEntries.length > 0 ? format(new Date(weightEntries[0].date), 'MMM d, yyyy') : 'never'}
                </p>
              </div>
            </div>
            
            {!showForm && (
              <Button 
                onClick={() => setShowForm(true)} 
                className="bg-facefit-purple hover:bg-facefit-purple/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Weight
              </Button>
            )}
          </div>
          
          {showForm ? (
            <div className="space-y-4 bg-accent/30 p-4 rounded-lg">
              <div>
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input 
                  id="weight"
                  type="number" 
                  value={currentWeight} 
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  placeholder="Enter your current weight"
                />
              </div>
              
              <div>
                <Label htmlFor="note">Note (optional)</Label>
                <Input 
                  id="note"
                  value={note} 
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note about your weight entry"
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleAddWeight}
                  className="bg-facefit-purple hover:bg-facefit-purple/90"
                >
                  Save Weight
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {weightEntries.length > 0 && (
                <>
                  <div className="bg-accent/30 p-4 rounded-lg text-center">
                    <p className="text-muted-foreground text-sm mb-1">Current</p>
                    <p className="text-3xl font-semibold">{weightEntries[0].weight} lbs</p>
                  </div>
                  
                  <div className="bg-accent/30 p-4 rounded-lg text-center">
                    <p className="text-muted-foreground text-sm mb-1">Recent Change</p>
                    <p className={`text-xl font-semibold ${weightChanges.recent < 0 ? 'text-green-500' : weightChanges.recent > 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
                      {weightChanges.recent > 0 ? '+' : ''}
                      {weightChanges.recent.toFixed(1)} lbs
                    </p>
                  </div>
                  
                  <div className="bg-accent/30 p-4 rounded-lg text-center">
                    <p className="text-muted-foreground text-sm mb-1">30 Day Change</p>
                    <p className={`text-xl font-semibold ${weightChanges.monthly < 0 ? 'text-green-500' : weightChanges.monthly > 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
                      {weightChanges.monthly > 0 ? '+' : ''}
                      {weightChanges.monthly.toFixed(1)} lbs
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartLine className="h-5 w-5 text-facefit-purple" />
            Weight History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {weightEntries.length > 1 ? (
            <>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      domain={[getStartValue(), getEndValue()]}
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="#9b87f5" 
                      fill="#9b87f5" 
                      fillOpacity={0.3} 
                      activeDot={{ r: 6 }} 
                      name="Weight (lbs)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Recent Entries</h4>
                <div className="space-y-3 max-h-56 overflow-y-auto pr-2">
                  {weightEntries.slice(0, 10).map((entry, index) => (
                    <div key={entry.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{format(new Date(entry.date), 'MMM d, yyyy')}</p>
                          {entry.note && <p className="text-xs text-muted-foreground">{entry.note}</p>}
                        </div>
                      </div>
                      <p className="font-medium">{entry.weight} lbs</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Scale className="h-12 w-12 mx-auto text-muted-foreground/60" />
              <p className="mt-4 text-muted-foreground">No weight data yet</p>
              <Button 
                onClick={() => setShowForm(true)} 
                className="mt-4 bg-facefit-purple hover:bg-facefit-purple/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add First Entry
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WeightTracker;
