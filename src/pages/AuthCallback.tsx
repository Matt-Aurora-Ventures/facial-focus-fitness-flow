
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Process the OAuth callback
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Auth callback error:", error);
        navigate('/auth');
        return;
      }

      // If we have a user, update their terms acceptance
      if (data.session?.user) {
        await supabase
          .from('profiles')
          .update({ 
            terms_accepted: true,
            terms_accepted_at: new Date().toISOString()
          })
          .eq('id', data.session.user.id);
      }
      
      navigate('/');
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg">Completing authentication, please wait...</p>
    </div>
  );
};

export default AuthCallback;
