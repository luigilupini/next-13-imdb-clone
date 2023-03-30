'use client';
/* ! Important: Server Error when using `createContext` in a (SC)
! TypeError: `createContext` only works in Client Components (CC). Add the "use
! client" directive at the top of the file to use it.
Read more: https://nextjs.org/docs/messages/context-in-server-component */

import React, { useEffect, useState } from 'react';

import { MdLightMode } from 'react-icons/md';
import { BsMoonStarsFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';

export default function DarkModeSwitch() {
  const [mounted, setMounted] = useState(false);
  // Because we using React context API, we can use the useTheme hook to access
  // the theme state and update it. But we need to ensure this component is a
  // `use client` component, so that its compiled as a React client component.
  // You can't use any React hooks 🪝 in a (SC).

  // If theme is set to 'system' and if so, it will use the systemTheme value,
  // otherwise it will use the `theme` value we modify.
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;
  console.log({ systemTheme, theme, setTheme });

  // TODO - I am sure this is not needed:
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted &&
        (currentTheme === 'dark' ? (
          <BsMoonStarsFill
            className="text-xl cursor-pointer hover:text-yellow-400"
            onClick={() => setTheme('light')}
          />
        ) : (
          <MdLightMode
            className="text-xl cursor-pointer hover:text-yellow-400"
            onClick={() => setTheme('dark')}
          />
        ))}
    </>
  );
}
