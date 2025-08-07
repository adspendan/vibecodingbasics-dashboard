import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const { user, subscription, loading, signOut } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    // Fetch projects if authenticated
    if (user) {
      fetchProjects();
    }
  }, [user, loading, router]);

  const fetchProjects = async () => {
    try {
      // Fetch projects based on subscription status
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id');
      
      if (error) throw error;
      
      // Filter projects based on subscription status
      const accessibleProjects = subscription?.status === 'active' || subscription?.status === 'trialing'
        ? data
        : data.filter(project => project.is_free);
      
      setProjects(accessibleProjects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.email}</p>
          </div>
          <div className="flex items-center space-x-4">
            {subscription && (
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {subscription.status === 'trialing' ? 'Free Trial' : 'Active Subscription'}
              </div>
            )}
            <button
              onClick={handleSignOut}
              className="bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Your Projects</h2>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-lg mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.is_free 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {project.is_free ? 'Free' : 'Premium'}
                    </span>
                    <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                      Start Project
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No projects available. Check back soon!</p>
          )}
        </div>

        {!subscription && (
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-2">Upgrade to Access All Projects</h2>
            <p className="mb-4">Join our weekly community and get access to all 30 AI coding projects.</p>
            <button className="bg-white text-purple-700 font-medium py-2 px-4 rounded-md hover:bg-gray-100">
              Upgrade Now - $49/month
            </button>
          </div>
        )}
      </div>
    </div>
  );
}