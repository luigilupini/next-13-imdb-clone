import Link from 'next/link';
import React from 'react';

import {
  BiHomeAlt2 as HomeIcon,
  BiInfoCircle as AboutIcon,
} from 'react-icons/bi';

function Header() {
  return (
    <header
      className="flex justify-between items-center
      max-w-6xl sm:mx-auto mx-2 py-6 border-b shadow-sm"
    >
      <div className="flex gap-4">
        <MenuItem title="HOME" address="/" icon={HomeIcon} />
        <MenuItem title="ABOUT" address="/about" icon={AboutIcon} />
      </div>
      <div>
        <Link href="/">
          <h2 className="text-xl">
            <span className="font-bold bg-yellow-400 py-1 px-2 rounded-lg">
              IMDb
            </span>
            <span className="text-lg hidden sm:inline font-light mx-2">
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
        className="mx-4 lg:mx-6 hover:text-amber-600"
      >
        <Icon className="text-2xl sm:hidden" />
        <p className="hidden sm:inline my-2 text-sm">{title}</p>
      </Link>
    </div>
  );
}

export default Header;
