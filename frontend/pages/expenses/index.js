import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { API_TOKEN, BASE_API_URL, EXPENSES_URL } from "../../constants";

export default function Expenses() {
  const { user, token, reviewer } = useAuth();
  const router = useRouter();
  const api = axios.create({ baseURL: BASE_API_URL });
  const [expenses, setExpenses] = useState([]);
  const [expensesFetchDone, setExpensesFetchDone] = useState(false);
  const [error, setError] = useState("");
  const headers = {
    headers: {
      "X-Api-Token": API_TOKEN,
      Authorization: `Bearer ${token}`,
    },
  };
  const convertStatus = {
    drafted: "Draft",
    submitted: "Submitted",
    approved: "Approved",
    rejected: "Rejected",
  };

  const fetchExpenses = async () => {
    try {
      const res = await api.get(EXPENSES_URL, headers);
      setExpenses(res.data.expenses);
      setExpensesFetchDone(true);
    } catch (error) {
      setError(error.response?.data?.errors || "Fetch failed");
    }
  };

  const handleSubmit = async (expenseId) => {
    try {
      const res = await api.post(
        `${EXPENSES_URL}/${expenseId}/submit`,
        {},
        headers
      );
      setExpenses(res.data.expenses);
    } catch (error) {
      setError(error.response?.data?.errors || "Fetch failed");
    }
  };

  const handleApproval = async (expenseId) => {
    try {
      const res = await api.post(
        `${EXPENSES_URL}/${expenseId}/approve`,
        {},
        headers
      );
      setExpenses(res.data.expenses);
    } catch (error) {
      setError(error.response?.data?.errors || "Fetch failed");
    }
  };

  const handleRejection = async (expenseId) => {
    try {
      const res = await api.post(
        `${EXPENSES_URL}/${expenseId}/reject`,
        {},
        headers
      );
      setExpenses(res.data.expenses);
    } catch (error) {
      setError(error.response?.data?.errors || "Fetch failed");
    }
  };

  const renderSubmitBtn = (expenseId) => {
    return (
      <button
        onClick={() => handleSubmit(expenseId)}
        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
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
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    );
  };
  const renderEditBtn = (expenseId) => {
    return (
      <a
        href={`/expenses/form?expensesId=${expenseId}`}
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
  const renderDeleteBtn = (expenseId) => {
    return (
      <button
        onClick={() => handleDelete(expenseId)}
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
  const renderApproveBtn = (expenseId) => {
    return (
      <button
        onClick={() => handleApproval(expenseId)}
        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
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
            d="M5 13l4 4L19 7"
          />
        </svg>
      </button>
    );
  };
  const renderRejectBtn = (expenseId) => {
    return (
      <button
        onClick={() => handleRejection(expenseId)}
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    );
  };

  const renderEmployeeActions = (expense) => {
    if (expense.status === "drafted") {
      return (
        <td className="px-6 py-4 flex justify-between">
          {renderSubmitBtn(expense.id)}
          {renderEditBtn(expense.id)}
          {renderDeleteBtn(expense.id)}
        </td>
      );
    } else {
      const expenseState =
        expense.status == "submitted" ? "Awaiting Approval" : "N/A";

      return (
        <td className="text-center px-6 py-4">
          <span className="text-gray-400">{expenseState}</span>
        </td>
      );
    }
  };

  const renderActions = (expense) => {
    if (!expense) return null;
    if (reviewer) {
      if (expense.user_id == user && expense.status === "drafted") {
        return renderEmployeeActions(expense);
      }
      if (expense.status === "submitted") {
        return (
          <td className="px-6 py-4 flex justify-between">
            {renderApproveBtn(expense.id)}
            {renderRejectBtn(expense.id)}
          </td>
        );
      } else {
        return (
          <td className="text-center px-6 py-4">
            N/A
          </td>
        );
      }
      return (
        <td className="px-6 py-4">
          <span className="text-gray-400">{expense.status}</span>
        </td>
      );
    } else {
      return renderEmployeeActions(expense);
    }
  };

  const renderExpenses = () => {
    if (expenses.length === 0 && expensesFetchDone) {
      return (
        <tr>
          <td colSpan="6" className="px-6 py-4 text-center text-gray-400">
            No expenses found
          </td>
        </tr>
      );
    } else {
      return expenses.map((expense) => (
        <tr key={expense.id} className="border-b border-gray-700">
          <td className="text-center px-6 py-4">{expense.title}</td>
          <td className="text-center px-6 py-4">${expense.amount}</td>
          <td className="text-center px-6 py-4">{expense.date}</td>
          <td className="text-center px-6 py-4">{expense.category}</td>
          <td className="text-center px-6 py-4">
            {convertStatus[expense.status]}
          </td>
          {renderActions(expense)}
        </tr>
      ));
    }
  };

  useEffect(() => {
    if (user) {
      fetchExpenses();
    } else {
      router.push("/login");
    }
  }, [user, token]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start p-6">
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <h1 className="text-2xl text-white font-bold">Expenses</h1>
        <Link href="/expenses/form">
          <a className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
            Create Expense
          </a>
        </Link>
      </div>

      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-gray-700 text-gray-200">
            <tr>
              <th className="text-center px-6 py-3">Title</th>
              <th className="text-center px-6 py-3">Amount</th>
              <th className="text-center px-6 py-3">Date</th>
              <th className="text-center px-6 py-3">Category</th>
              <th className="text-center px-6 py-3">Status</th>
              <th className="text-center px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">{renderExpenses()}</tbody>
        </table>
      </div>
    </div>
  );
}
