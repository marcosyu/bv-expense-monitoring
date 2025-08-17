import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export const renderHeaderLinks = () => {
  const { user } = useAuth();
  const { token } = useAuth();

  if (token) {
    return renderProtectedLinks(user);
  } else {
    renderUnprotectedLinks();
  }
};

const renderProtectedLinks = (user) => {
  const { reviewer } = useAuth();

  return (
    <ul className="flex space-x-5 md:space-x-10 text-lg">
      <li>
        <Link href={`/users/form?userId=${user}`}>
          <a className="hover:underline underline-offset-2 px-4 py-1 tracking-wider">
            My Profile
          </a>
        </Link>
      </li>
      <li>
        <Link href="/expenses">
          <a className="hover:underline underline-offset-2 px-4 py-1 tracking-wider">
            Expenses
          </a>
        </Link>
      </li>
      {reviewer && (
        <li>
          <Link href="/users">
            <a className="hover:underline underline-offset-2 px-4 py-1 tracking-wider">
              Users
            </a>
          </Link>
        </li>
      )}
    </ul>
  );
};

const renderUnprotectedLinks = () => {
  return <ul className="flex space-x-5 md:space-x-10 text-lg"></ul>;
};
