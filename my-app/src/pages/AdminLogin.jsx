import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Lock, House, LoaderCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // The 'e' parameter is implicitly typed in a JS environment.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const success = await login(username, password);

    if (success) {
      navigate("/admin");
    } else {
      setError("Invalid username or password.");
    }
    setIsLoading(false);
  };

  return (
    // DESIGN: A neutral, off-white background creates a calm and focused environment.
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-4 font-sans">
      <Link
        to="/"
        className="absolute top-6 left-6 text-gray-400 hover:text-blue-600 transition-colors"
        aria-label="Go to Home"
      >
        <House size={24} />
      </Link>

      <div className="w-full max-w-sm text-center">
        {/* DESIGN: Strong, clear typography is the primary visual element. */}
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          Admin Portal
        </h1>
        <p className="text-gray-500 mt-3">
          Secure access for authorized personnel.        </p>

        <form onSubmit={handleSubmit} className="space-y-6 mt-10">
          {/* DESIGN: Understated inputs with a bottom border focus on the content. */}
          <div className="relative">
            <User className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-transparent border-b-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Username"
              required
              autoComplete="username"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-transparent border-b-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Password"
              required
              autoComplete="current-password"
            />
          </div>

          {/* DESIGN: The error message is direct and unobtrusive, integrated into the form's flow. */}
          {error && (
            <p className="text-red-600 text-sm font-medium pt-2">{error}</p>
          )}

          {/* DESIGN: The button uses a solid, confident color with minimal styling. */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 disabled:bg-blue-400"
          >
            {isLoading ? (
              <>
                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}