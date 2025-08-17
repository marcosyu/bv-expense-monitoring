import { useAuth } from "../../context/AuthContext";
export default function Dashboard() {
  const user = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8"></div>
    </div>
  );
}
