
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dumbbell, Goal, Calendar } from "lucide-react";

const Goals: React.FC = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [goals, setGoals] = React.useState([
    {
      id: 1,
      title: "Grow Bigger Biceps",
      timeline: "1 month",
      target: "Increase bicep size by 1 inch",
      startDate: "2024-04-24",
    }
  ]);

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-facefit-purple/20 p-2">
            <Goal className="h-4 w-4 text-facefit-purple" />
          </div>
          <CardTitle>Fitness Goals</CardTitle>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowForm(!showForm)}
          className="gap-2"
        >
          <Goal className="h-4 w-4" />
          Add Goal
        </Button>
      </CardHeader>
      <CardContent>
        {showForm && (
          <div className="mb-6 p-4 border rounded-lg bg-muted/50">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input id="title" placeholder="e.g., Grow Bigger Biceps" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timeline">Timeline</Label>
                <Input id="timeline" type="text" placeholder="e.g., 1 month" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="target">Target</Label>
                <Input id="target" placeholder="e.g., Increase bicep size by 1 inch" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" />
              </div>
              <Button className="w-full bg-facefit-purple hover:bg-facefit-purple/90">
                Set Goal
              </Button>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          {goals.map(goal => (
            <div 
              key={goal.id} 
              className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="rounded-full bg-facefit-purple/20 p-2 mt-1">
                <Dumbbell className="h-4 w-4 text-facefit-purple" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{goal.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{goal.target}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{goal.timeline} (Started: {goal.startDate})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Goals;
