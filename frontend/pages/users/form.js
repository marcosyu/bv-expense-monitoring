import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { API_TOKEN, BASE_API_URL, USERS_URL } from "../../constants/index";
import toast from "react-hot-toast";

export default function UserForm() {
  const { token, user, reviewer } = useAuth();
  const router = useRouter();
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");
  const api = axios.create({ baseURL: BASE_API_URL });
  const headers = {
    headers: {
      "X-Api-Token": API_TOKEN,
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = async (e) => {
    const params = {
      first_name: firstName,
      last_name: lastName,
      email,
      role,
    };

    if(password){
      params["password"] = password;
    }

    e.preventDefault();
    try {
      if (userId) {
        await api.patch(`${USERS_URL}/${userId}`, params, headers);
      } else {
        await api.post(USERS_URL, params, headers);
      }
      if(reviewer) {
        router.push(`/users`);
      } else {
        router.push(`/users/form?userId=${user}`);
      }
      setError("");
      toast.success("Save successfully!");
    } catch (error) {
      setError("Save failed");
    }
  };

  const fetchUser = async (userId) => {
    await api
      .get(`${USERS_URL}/${userId}`, headers)
      .then((res) => {
        setEmail(res.data.email);
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setRole(res.data.role);
      })
      .catch((error) => {
        setError(error.response?.data?.errors || "Fetch failed");
      });
  };

  useEffect(() => {
    if (router.isReady) {
      const { userId } = router.query;
      setUserId(userId || null);
      userId && fetchUser(userId);
    }
  }, [token, router.isReady, router.query]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {`${userId ? "Update" : "Create"} your account`}
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
              required={!userId}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>
          {reviewer && (<div>
            <label className="block text-sm font-medium text-gray-300">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="employee">Employee</option>
              <option value="reviewer">Reviewer</option>
            </select>
          </div>)}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            {`${userId ? "Update" : "New"} User`}
          </button>
        </form>
      </div>
    </div>
  );
}
