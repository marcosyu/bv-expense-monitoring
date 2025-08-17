import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  !user && router.push("/login");

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8"></div>
    </div>
  );
}
