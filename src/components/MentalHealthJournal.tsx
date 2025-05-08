
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';
import { CalendarIcon, Save, PenLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

interface JournalEntry {
  id: string;
  content: string;
  mood_rating: number;
  created_at: string;
}

const MentalHealthJournal: React.FC = () => {
  const [journalContent, setJournalContent] = useState('');
  const [moodRating, setMoodRating] = useState<number | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    fetchJournalEntries();
  }, []);

  const fetchJournalEntries = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (session?.session?.user) {
        const { data, error } = await supabase
          .from('mental_health_journal')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setEntries(data || []);
      }
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      toast({
        title: "Failed to load journal entries",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  const handleSaveEntry = async () => {
    if (!journalContent.trim()) {
      toast({
        title: "Cannot save empty entry",
        description: "Please write something in your journal",
        variant: "destructive"
      });
      return;
    }

    if (moodRating === null) {
      toast({
        title: "Mood rating required",
        description: "Please select how you're feeling today",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        throw new Error("User not authenticated");
      }
      
      const entryId = uuidv4();
      const { error } = await supabase
        .from('mental_health_journal')
        .insert({
          id: entryId,
          user_id: session.session.user.id,
          content: journalContent,
          mood_rating: moodRating,
          created_at: date ? date.toISOString() : new Date().toISOString()
        });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Journal Entry Saved",
        description: "Your thoughts have been recorded successfully",
      });
      
      setJournalContent('');
      setMoodRating(null);
      setDate(new Date());
      
      // Refresh entries
      fetchJournalEntries();
      
    } catch (error) {
      console.error('Error saving journal entry:', error);
      toast({
        title: "Failed to save entry",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setJournalContent(entry.content);
    setMoodRating(entry.mood_rating);
    setDate(new Date(entry.created_at));
  };

  const clearForm = () => {
    setSelectedEntry(null);
    setJournalContent('');
    setMoodRating(null);
    setDate(new Date());
  };

  const getMoodEmoji = (rating: number) => {
    if (rating <= 2) return '😢';
    if (rating <= 4) return '😕';
    if (rating <= 6) return '😐';
    if (rating <= 8) return '🙂';
    return '😄';
  };

  const getMoodColor = (rating: number) => {
    if (rating <= 2) return 'bg-red-100 text-red-700';
    if (rating <= 4) return 'bg-orange-100 text-orange-700';
    if (rating <= 6) return 'bg-yellow-100 text-yellow-700';
    if (rating <= 8) return 'bg-lime-100 text-lime-700';
    return 'bg-green-100 text-green-700';
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Mental Health Journal</CardTitle>
              <CardDescription>Record your thoughts and track your emotional state</CardDescription>
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-1"
              onClick={clearForm}
            >
              <PenLine className="h-4 w-4" />
              New Entry
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <div className="mb-2 flex justify-between items-center">
              <label className="text-sm font-medium">How are you feeling today?</label>
              {moodRating !== null && (
                <span className={`text-lg px-3 py-1 rounded-full ${getMoodColor(moodRating)}`}>
                  {getMoodEmoji(moodRating)} ({moodRating}/10)
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                <Button
                  key={rating}
                  type="button"
                  size="sm"
                  variant={moodRating === rating ? "default" : "outline"}
                  className={moodRating === rating ? "bg-facefit-purple" : ""}
                  onClick={() => setMoodRating(rating)}
                >
                  {rating}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">What's on your mind?</label>
            <Textarea
              value={journalContent}
              onChange={(e) => setJournalContent(e.target.value)}
              placeholder="Write your thoughts, feelings, and experiences..."
              className="min-h-[200px] resize-none"
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button
            onClick={handleSaveEntry}
            disabled={isLoading || !journalContent.trim() || moodRating === null}
            className="w-full bg-facefit-purple hover:bg-facefit-purple/90"
          >
            {isLoading ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                Saving Entry...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Journal Entry
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {entries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Previous Entries</CardTitle>
            <CardDescription>Review your past journal entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-3 border rounded-md cursor-pointer hover:bg-secondary"
                  onClick={() => selectEntry(entry)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">{format(new Date(entry.created_at), "PPP")}</p>
                    <span className={`px-2 py-0.5 rounded-full text-sm ${getMoodColor(entry.mood_rating)}`}>
                      {getMoodEmoji(entry.mood_rating)} {entry.mood_rating}/10
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {entry.content}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MentalHealthJournal;
