'use client';
import React from 'react';

// https://www.npmjs.com/package/next-themes (useTheme hook)
import { ThemeProvider } from 'next-themes';

export default function ThemeProviders({ children }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <div className="dark:bg-gray-700 dark:text-gray-200 text-gray-700 bg-gray-200 transition-colors duration-300 min-h-screen select-none">
        {children}
      </div>
    </ThemeProvider>
  );
}

/* # ThemeProvider
All your theme configuration is passed to ThemeProvider.

`enableSystem` = true: Whether to switch between dark and light based on prefers-color-scheme

`attribute` = class: will ensure a 'data-theme' class name enabled be attribute
can get modified based on the active theme. Meaning any `attribute` name given
here is now accessible. But we need to let Tailwind know about this `attribute`
name so open `tailwind.config.js` and add the following:

```js
module.exports = {
  // ...
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'data-theme', // controlled by 'attribute' in ThemeProviders.jsx
};
```
*/

/* # Third-party packages
https://beta.nextjs.org/docs/rendering/server-and-client-components#third-party-packages

The "use client" directive is a new React feature that was introduced as part of
**Server Components**. As (SC) are so new, third-party packages in the ecosystem
are beginning to add it to components that use "use client" features like
`useState`, `useEffect` and `createContext`.

Many components from npm packages use "use client" features do not yet have the
directive. These third-party components will work as expected within your own
**Client Components**, since they themselves have the "use client" directive,
but they won't work within (SC). To fix this, you can wrap third-party
components that rely on "use client" features in your own **Client Components**.
Now you can use the <Component /> directly within a (SC) */

/* # Context
https://beta.nextjs.org/docs/rendering/server-and-client-components#context

Most React applications rely on context API to share data between components, either directly via `createContext`, or indirectly via provider components imported from third-party libraries.

However in Next.js 13, `context` is fully supported in **Client Components**
only, so it cannot be created or consumed directly within (SC). This is because
(SC) have no React state (since they're not interactive) they Node.js code, and
context API is primarily used for rerendering interactive components deep in the tree after some React state has been updated.

We'll discuss alternatives for sharing data between (SC), but first, let's take
a look at how to use context within Client Components. All of the context APIs
are fully supported within Client Components. Define a `<Provider>` component by
using a patten "Context Component Pattern":

```jsx
'use client';
import React from "react";

export const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(() => {
    return window.localStorage.getItem("color-theme") || "light";
  });

  React.useEffect(() => {
    window.localStorage.setItem("color-theme", theme);
  }, [theme]);

  const toggleTheme = React.useCallback(() => {
    setTheme((currentTheme) => {
      return currentTheme === "light" ? "dark" : "light";
    });
  }, []);

  const colors = COLORS[theme];
  const value = { theme, setTheme, toggleTheme, colors };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
```
*/
