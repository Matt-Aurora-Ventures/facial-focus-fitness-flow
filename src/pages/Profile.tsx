
import React from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userProfile && (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-500">Full Name</label>
                  <p className="mt-1">{userProfile.full_name || 'Not provided'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="mt-1">{userProfile.email}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Terms Acceptance</label>
                  <p className="mt-1">
                    {userProfile.terms_accepted 
                      ? `Accepted on ${new Date(userProfile.terms_accepted_at).toLocaleDateString()}` 
                      : 'Not accepted'}
                  </p>
                </div>
                
                <div className="pt-4 flex flex-col gap-2 sm:flex-row sm:justify-between">
                  <Button variant="outline" onClick={() => navigate('/terms')} className="sm:w-auto">
                    View Terms & Conditions
                  </Button>
                  <Button variant="destructive" onClick={signOut} className="sm:w-auto">
                    Sign Out
                  </Button>
                </div>
              </>
            )}
            
            {!userProfile && (
              <div className="text-center py-8">
                <p>Loading profile information...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Navigation />
    </div>
  );
};

export default Profile;
