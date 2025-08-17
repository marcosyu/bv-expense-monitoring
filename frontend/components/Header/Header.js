import { useState } from "react";
import Link from "next/link";
import { Menu } from "react-feather";
import { useUser } from "../../store/user";
import { Button } from "../shared";
import { renderHeaderLinks } from "./HeaderLinks";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { token, logout } = useAuth();
  const router = useRouter();
  const toggleMenu = () => setShowMenu(!showMenu);

  const signOut = () => {
    if (!token) return;

    logout();
    router.push("/login");
  };

  return (
    <>
      <header className="w-full flex items-center justify-between py-2 px-5 bg-slate-800 text-white">
        <h1 className="font-bold text-3xl">
          <Link href="/">
            <a>ExMon</a>
          </Link>
        </h1>
        <Menu className="visible md:hidden" onClick={toggleMenu} />
        <nav className="hidden md:flex ml-10 md:ml-20 font-semibold">
          {renderHeaderLinks()}
        </nav>
        <div className="hidden md:flex">
          {token && <Button onClick={signOut}>Sign out</Button>}
          {!token && (
            <Link href="/login">
              <a>
                <Button className="bg-slate-800">Sign in</Button>
              </a>
            </Link>
          )}
        </div>
      </header>
      {showMenu && token && (
        <nav className="py-5 font-semibold">
          <ul className="flex flex-col items-end space-y-2">
            <li>
              <Button onClick={signOut}>Sign out</Button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
