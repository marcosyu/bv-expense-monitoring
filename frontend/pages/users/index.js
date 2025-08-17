import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import { API_TOKEN, BASE_API_URL, USERS_URL } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { user, token, reviewer } = useAuth();
  const api = axios.create({ baseURL: BASE_API_URL });
  const router = useRouter();
  const headers = {
    headers: {
      "X-Api-Token": API_TOKEN,
      Authorization: `Bearer ${token}`,
    },
  };

  if (!user) router.push("/login");
  if (!reviewer) router.push("/expenses");

  useEffect(() => {
    fetchUsers();
  }, [router.asPath]);

  const fetchUsers = async () => {
    try {
      const res = await api.get(USERS_URL, headers);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    }
  };

  const handleDestroy = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`/api/users/${id}`);
      toast.success("User deleted successfully");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user");
    }
  };
  const renderEditBtn = (userId) => {
    return (
      <a
        href={`/users/form?userId=${userId}`}
        className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5m-2.414-9.414a2 2 0 112.828 2.828L11 17l-4 1 1-4 9.586-9.586z"
          />
        </svg>
      </a>
    );
  };

  const renderDeleteBtn = (userId) => {
    return (
      <button
        onClick={() => handleDelete(userId)}
        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
          />
        </svg>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start p-6">
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <h1 className="text-2xl text-white font-bold">Users</h1>
        <Link href="/users/form">
          <a className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
            Create User
          </a>
        </Link>
      </div>

      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-center px-6 py-3 text-left text-sm font-medium text-gray-300">
                Email
              </th>
              <th className="text-center px-6 py-3 text-left text-sm font-medium text-gray-300">
                First Name
              </th>
              <th className="text-center px-6 py-3 text-left text-sm font-medium text-gray-300">
                Last Name
              </th>
              <th className="text-center px-6 py-3 text-left text-sm font-medium text-gray-300">
                Role
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-t border-gray-700">
                  <td className="text-center px-6 py-4 text-gray-200">
                    {user.email}
                  </td>
                  <td className="text-center px-6 py-4 text-gray-200">
                    {user.first_name}
                  </td>
                  <td className="text-center px-6 py-4 text-gray-200">
                    {user.last_name}
                  </td>

                  <td className="capitalize text-center px-6 py-4 text-gray-200">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 flex justify-between">
                    {renderEditBtn(user.id)}
                    {renderDeleteBtn(user.id)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-gray-400 italic"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
