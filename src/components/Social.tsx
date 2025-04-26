
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Trophy, Gift, Search, Plus, Heart, MessageSquare, Repeat, User, UserPlus, Award } from "lucide-react";

const Social: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'friends' | 'challenges' | 'activity'>('friends');
  
  // Mock data
  const friends = [
    { id: 1, name: "Alex Johnson", username: "@alexfit", lastActive: "Just now", image: "/placeholder.svg" },
    { id: 2, name: "Maria Rodriguez", username: "@mariaworkout", lastActive: "2h ago", image: "/placeholder.svg" },
    { id: 3, name: "John Smith", username: "@johnsmith", lastActive: "5h ago", image: "/placeholder.svg" },
  ];
  
  const challenges = [
    { 
      id: 1, 
      title: "10K Steps Daily", 
      creator: "Alex Johnson",
      participants: 8,
      prize: "$50 Gift Card",
      status: "In Progress",
      daysLeft: 3,
      joined: true
    },
    { 
      id: 2, 
      title: "30 Day Push-up Challenge", 
      creator: "Workout Group",
      participants: 15,
      prize: "FaceFit Premium",
      status: "Upcoming",
      daysLeft: 5,
      joined: false
    },
  ];
  
  const activities = [
    { 
      id: 1, 
      user: "Alex Johnson", 
      action: "completed a workout",
      detail: "Upper Body Strength",
      time: "15m ago",
      image: "/placeholder.svg" 
    },
    { 
      id: 2, 
      user: "Maria Rodriguez", 
      action: "joined challenge",
      detail: "30 Day Push-up Challenge",
      time: "2h ago",
      image: "/placeholder.svg"
    },
    { 
      id: 3, 
      user: "John Smith", 
      action: "hit personal record",
      detail: "Bench Press: 225lbs",
      time: "Yesterday",
      image: "/placeholder.svg"
    },
  ];

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 mb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Social</h2>
        <Button className="bg-facefit-purple hover:bg-facefit-purple/90">
          <Plus className="h-4 w-4 mr-2" />
          Create Challenge
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button 
          className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'friends' ? 'border-b-2 border-facefit-purple text-facefit-purple' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('friends')}
        >
          <Users className="h-4 w-4" />
          Friends
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'challenges' ? 'border-b-2 border-facefit-purple text-facefit-purple' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('challenges')}
        >
          <Trophy className="h-4 w-4" />
          Challenges
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'activity' ? 'border-b-2 border-facefit-purple text-facefit-purple' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('activity')}
        >
          <Heart className="h-4 w-4" />
          Activity
        </button>
      </div>

      {/* Friends Tab Content */}
      {activeTab === 'friends' && (
        <div className="space-y-6">
          {/* Search Friends */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search friends..."
              className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background"
            />
          </div>
          
          {/* Friends List */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                My Friends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">{friend.name}</h4>
                        <p className="text-xs text-muted-foreground">{friend.username} • {friend.lastActive}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Message
                    </Button>
                  </div>
                ))}
                
                <Button className="w-full" variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Find Friends
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Friend Suggestions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Friend Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2].map((id) => (
                  <div key={id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">Suggested User {id}</h4>
                        <p className="text-xs text-muted-foreground">5 mutual friends</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-facefit-purple hover:bg-facefit-purple/90">
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Challenges Tab Content */}
      {activeTab === 'challenges' && (
        <div className="space-y-6">
          {/* Active Challenges */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-facefit-purple" />
                Active Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {challenges.filter(c => c.joined).map((challenge) => (
                  <div key={challenge.id} className="p-4 border rounded-lg bg-accent/30">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{challenge.title}</h4>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {challenge.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Created by {challenge.creator}</p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Participants: </span>
                        <span className="font-medium">{challenge.participants}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Days left: </span>
                        <span className="font-medium">{challenge.daysLeft}</span>
                      </div>
                      <div className="text-sm col-span-2">
                        <span className="text-muted-foreground">Prize: </span>
                        <span className="font-medium flex items-center gap-1">
                          <Gift className="h-3.5 w-3.5 text-facefit-purple" />
                          {challenge.prize}
                        </span>
                      </div>
                    </div>
                    
                    <Button className="w-full">View Challenge</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Available Challenges */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Available Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {challenges.filter(c => !c.joined).map((challenge) => (
                  <div key={challenge.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{challenge.title}</h4>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {challenge.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Created by {challenge.creator}</p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Participants: </span>
                        <span className="font-medium">{challenge.participants}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Days left: </span>
                        <span className="font-medium">{challenge.daysLeft}</span>
                      </div>
                      <div className="text-sm col-span-2">
                        <span className="text-muted-foreground">Prize: </span>
                        <span className="font-medium flex items-center gap-1">
                          <Gift className="h-3.5 w-3.5 text-facefit-purple" />
                          {challenge.prize}
                        </span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-facefit-purple hover:bg-facefit-purple/90">Join Challenge</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Activity Tab Content */}
      {activeTab === 'activity' && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-facefit-purple" />
                Friend Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent flex-shrink-0 flex items-center justify-center">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{activity.user}</span>
                        <span className="text-muted-foreground">{activity.action}</span>
                      </div>
                      <p className="text-sm font-medium">{activity.detail}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                        <div className="flex gap-2">
                          <button className="text-muted-foreground hover:text-foreground">
                            <Heart className="h-4 w-4" />
                          </button>
                          <button className="text-muted-foreground hover:text-foreground">
                            <MessageSquare className="h-4 w-4" />
                          </button>
                          <button className="text-muted-foreground hover:text-foreground">
                            <Award className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Achievements */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {name: "5K Steps Day", icon: "🏃‍♂️", date: "Today"},
                  {name: "Workout Streak: 5 Days", icon: "🔥", date: "Yesterday"},
                  {name: "First Challenge Completed", icon: "🏆", date: "3 days ago"},
                ].map((achievement, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-lg">
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{achievement.name}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Social;
