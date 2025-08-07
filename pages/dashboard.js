import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }
      
      setUser(user);
      
      // Get subscription status
      const { data: subscriptionData } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      setSubscription(subscriptionData);
      setLoading(false);
    };
    
    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Vibe Coding Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Logout
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Your Subscription</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              {subscription ? (
                <div>
                  <p className="mb-2">
                    <span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      subscription.status === 'trialing' ? 'bg-yellow-100 text-yellow-800' :
                      subscription.status === 'active' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {subscription.status}
                    </span>
                  </p>
                  {subscription.status === 'trialing' && (
                    <p className="text-sm text-gray-600">
                      Your free trial ends on {new Date(subscription.trial_end).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ) : (
                <p>No subscription found. Please sign up for a plan.</p>
              )}
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Your 7-Day Challenge</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <div key={day} className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                <div>
                  <h3 className="font-medium">Day {day}: Lesson Title</h3>
                  <p className="text-gray-600 text-sm">Brief description of the lesson</p>
                </div>
                <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200">
                  Start
                </button>
              </div>
            ))}
          </div>
          
          {subscription?.status !== 'active' && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Unlock Full 30-Day Challenge</h2>
              <p className="text-gray-600 mb-4">Get access to 23 additional lessons and advanced coding challenges.</p>
              <a href="/checkout" className="inline-block px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                Start 7-Day Free Trial
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
