import Link from 'next/link';
import React from 'react';

import {
  BiHomeAlt2 as HomeIcon,
  BiInfoCircle as AboutIcon,
} from 'react-icons/bi';

import DarkModeSwitch from './DarkModeSwitch';

function Header() {
  return (
    <header className="flex items-center justify-between max-w-6xl py-6 mx-2 sm:mx-auto">
      <div className="flex gap-4">
        <MenuItem title="HOME" address="/" icon={HomeIcon} />
        <MenuItem title="ABOUT" address="/about" icon={AboutIcon} />
      </div>
      <div className="flex items-center space-x-5">
        <DarkModeSwitch />
        {/* Logo */}
        <Link href="/">
          <h2 className="text-xl">
            <span className="px-2 py-1 font-bold text-gray-700 bg-yellow-400 rounded-lg">
              IMDb
            </span>
            <span className="hidden mx-2 text-lg font-light sm:inline">
              Clone
            </span>
          </h2>
        </Link>
      </div>
    </header>
  );
}

function MenuItem({ title, address, icon: Icon }) {
  return (
    <div>
      <Link
        href={address}
        className="mx-4 lg:mx-6 hover:text-yellow-500"
      >
        <Icon className="text-2xl sm:hidden" />
        <p className="hidden my-2 text-sm sm:inline">{title}</p>
      </Link>
    </div>
  );
}

export default Header;
