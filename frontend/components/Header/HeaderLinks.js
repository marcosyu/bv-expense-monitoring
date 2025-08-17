import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export const renderHeaderLinks = () => {
  const { token } = useAuth();

  token && renderProtectedLinks()
  !token && renderUnprotectedLinks()
}

const renderProtectedLinks = () => {
  return (
    <ul className="flex space-x-5 md:space-x-10 text-lg">
      <li>
        <Link href="/dashboard">
          <a className="hover:underline underline-offset-2 px-4 py-1 tracking-wider">
            Dashboard
          </a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a className="hover:underline underline-offset-2 px-4 py-1 tracking-wider">
            About
          </a>
        </Link>
      </li>
    </ul>
  );
};

const renderUnprotectedLinks = () => {
  return <ul className="flex space-x-5 md:space-x-10 text-lg"></ul>;
};
