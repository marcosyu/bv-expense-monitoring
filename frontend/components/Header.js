import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'react-feather';
import { useUser } from '../store/user';
import { Button } from './shared';
import { useCookies } from 'react-cookie';

export default function Header() {
  const { user, addUser } = useUser();
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const [_cookies, _setCookie, removeCookie] = useCookies(['user']);

  const signOut = () => {
    removeCookie('user');
    addUser(null);
  };

  const renderTopNavLinks = () => {
    if(!user) return

    return (
      <ul className='flex space-x-5 md:space-x-10 text-lg'>
        <li>
          <Link href='/dashboard'>
            <a className='hover:underline underline-offset-2 px-4 py-1 tracking-wider'>
              Dashboard
            </a>
          </Link>
        </li>
        <li>
          <Link href='/about'>
            <a className='hover:underline underline-offset-2 px-4 py-1 tracking-wider'>
              About
            </a>
          </Link>
        </li>
      </ul>
    )
  }

  return (
    <>
      <header className='w-full flex items-center justify-between py-2 px-5 bg-slate-800 text-white'>
        <h1 className='font-bold text-3xl'>
          <Link href='/'>
            <a>ExMon</a>
          </Link>
        </h1>
        <Menu className='visible md:hidden' onClick={toggleMenu} />
        <nav className='hidden md:flex ml-10 md:ml-20 font-semibold'>
          { renderTopNavLinks() }
        </nav>
        <div className='hidden md:flex'>
          {user?.token?.length ? (
            <Button onClick={signOut}>Sign out</Button>
          ) : (
            <Link href='/signup'>
              <a>
                <Button className='bg-slate-800'>Sign up</Button>
              </a>
            </Link>
          )}
        </div>
      </header>
      {showMenu && (
        <nav className='py-5 font-semibold bg-yellow-200'>
          <ul className='flex flex-col items-end space-y-2'>
            <li>
              <Link href='/dashboard'>
                <a className='px-3 py-2 underline tracking-wider'>Dashboard</a>
              </Link>
            </li>
            <li>
              <Link href='/about'>
                <a className='px-3 py-1 underline tracking-wider'>About</a>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
