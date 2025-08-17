import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const { signup } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("marcosyu26@gmail.com");
  const [password, setPassword] = useState("P@ssw0rd");
  const [firstName, setFirstName] = useState("Marcos");
  const [lastName, setLastName] = useState("Yu");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const userParams = {
      email,
      password,
      firstName,
      lastName,
    }

    try {
      await signup(userParams);
      router.push("/login");
    } catch (error) {
      setError(error.response?.data?.errors || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create your account
        </h2>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              First Name
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="John"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Sign Up
          </button>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full py-2 px-4 mt-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Back to Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
