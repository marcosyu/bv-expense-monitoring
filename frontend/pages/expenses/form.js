import axios from "axios";
import { useEffect, useState } from "react";
import { API_TOKEN, BASE_API_URL, EXPENSES_URL } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

export default function ExpensesForm() {
  const router = useRouter();
  const api = axios.create({ baseURL: BASE_API_URL });
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const { token } = useAuth();
  const [error, setError] = useState("");
  const headers = {
    headers: {
      "X-Api-Token": API_TOKEN,
      Authorization: `Bearer ${token}`,
    },
  };
  const [expenseId, setExpenseId] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const { expensesId } = router.query;
      setExpenseId(expensesId || null);
    }
  }, [router.isReady, router.query]);

  const handlePopulate = async (expenseId) => {
    api
      .get(`/api/v1/expenses/${expenseId}`, headers)
      .then((res) => {
        const e = res.data;
        setTitle(e.title);
        setAmount(e.amount);
        setDate(e.date);
        setCategory(e.category);
      })
      .catch((err) => setError(err.response?.data?.errors || "Fetch failed"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (expenseId) {
        await api.patch(
          `${EXPENSES_URL}/${expenseId}`,
          { title, amount, date, category },
          headers
        );
      } else {
        await api.post(
          EXPENSES_URL,
          { title, amount, date, category },
          headers
        );
      }

    router.push("/expenses");
  } catch (error) {
    setError(error.response?.data?.errors || "Save failed");
  }
  };

  useEffect(() => {
    expenseId && handlePopulate(expenseId);
  }, [expenseId]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Add New Expense
        </h2>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Expense title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Date
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Category
            </label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            { expenseId ? "Update" : "Save" } Expense
          </button>
        </form>
      </div>
    </div>
  );
}
