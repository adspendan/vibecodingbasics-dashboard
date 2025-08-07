export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-purple-800">Vibe Coding Basics Dashboard</h1>
        <p className="text-gray-600 text-center mb-8">Welcome to your dashboard! Please log in or sign up to continue.</p>
        <div className="flex flex-col space-y-4">
          <a href="/login" className="bg-purple-600 text-white text-center py-2 px-4 rounded-md hover:bg-purple-700">Log In</a>
          <a href="/signup" className="bg-white border border-purple-600 text-purple-600 text-center py-2 px-4 rounded-md hover:bg-purple-50">Sign Up</a>
        </div>
      </div>
    </div>
  );
}
