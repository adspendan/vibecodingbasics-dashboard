// pages/dashboard.js (Updated)
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const { user, subscription, loading, signOut, resendConfirmationEmail } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    // Check if email is confirmed
    if (user && !user.email_confirmed_at) {
      return; // Don't fetch projects until email is confirmed
    }

    // Fetch projects if authenticated and email confirmed
    if (user && user.email_confirmed_at) {
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

  const handleResendEmail = async () => {
    try {
      await resendConfirmationEmail(user.email);
      setEmailSent(true);
    } catch (error) {
      console.error('Error resending confirmation email:', error);
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

  // Show email verification screen if email not confirmed
  if (!user.email_confirmed_at) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Verify Your Email</h2>
            <p className="mt-2 text-gray-600">
              We've sent a verification link to <span className="font-medium">{user.email}</span>
            </p>
            
            {emailSent ? (
              <div className="mt-6 bg-green-50 p-4 rounded-md">
                <p className="text-green-800">Email sent! Please check your inbox.</p>
              </div>
            ) : (
              <div className="mt-6">
                <button
                  onClick={handleResendEmail}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
                >
                  Resend Verification Email
                </button>
              </div>
            )}
            
            <div className="mt-6">
              <button
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                Sign out
              </button>
            </div>
            
            <p className="mt-4 text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or contact support.
            </p>
          </div>
        </div>
      </div>
    );
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