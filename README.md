## IMDb clone

> A movie rating webapp demonstrating Next.js 13 (ISR).

![alt text](./capture.png)

Featuring:

- A [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/api-reference/create-next-app).
- Added tailwindcss support by following the [Install Tailwind CSS with Next.js](https://tailwindcss.com/docs/guides/nextjs) guide.

- Data fetching is done pre-rendered server-side with (Server Components).

```jsx
/* # Data Fetching
https://nextjs.org/blog/next-13#data-fetching

React's recent Support for Promises RFC introduces a powerful new way to fetch
data and handle promises inside components: */

// app/page.js
async function getData() {
  const res = await fetch('https://api.example.com/...');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  return res.json();
}
```

Native `fetch` Web API has also been extended in React & Next.js. Auto de-dupes
fetch requests and caches them for revalidation of data at a component level.

```jsx
// This request should be cached until manually invalidated.
// `force-cache` is the default and can be omitted.
// ! Similar to `getStaticProps` (ssg)
fetch(URL, { cache: 'force-cache' }); // (ssg)

// This request should be refetched on every request.
// ! Similar to `getServerSideProps` (ssr)
fetch(URL, { cache: 'no-store' }); // (ssr)

// This request should be cached with a lifetime of 10 seconds.
// ! Similar to `getStaticProps` with the `revalidate` option (isr)
fetch(URL, { next: { revalidate: 10 } }); // (isr)
```

This means all the benefits of (ssg), (ssr), and (isr) is now available
through one single API interface for data fetching:

```jsx
const getData = async (params) => {
  // 👇🏻 we default to trending if no query string supplied
  const genre = params.genre || 'fetchTrending';
  // * https://developers.themoviedb.org/3
  // > https://developers.themoviedb.org/3/movies/get-top-rated-movies
  // > https://developers.themoviedb.org/3/trending/get-trending
  const res = await fetch(
    // 👇🏻 base url for api request
    `https://api.themoviedb.org/3/${
      genre === 'fetchTopRated'
        ? 'movie/top_rated'
        : 'trending/all/week'
    }?api_key=${API_KEY}&language=en-US&page=1
       `,
    { next: { revalidate: 86400 } } // 👈🏻 86400 seconds is 1 day
  );
  // If res has error this should be caught and directed to the `error` page
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data.results;
};

export default async function Home({ searchParams }) {
  const data = await getData(searchParams);
  return (
    <div>
      <Results results={data} />
    </div>
  );
}
```

- We have `next-themes` installed to handle dark mode via the context API.

It makes use of the "use client" directive a new React feature that introduced
as part of **Server Components**. As (SC) are so new, 3rd packages are beginning
to add it to components that use "use client" features. `useState`, `useEffect`
and `createContext`.

Many components from npm packages use "use client" features do not yet have the
directive. These third-party components will work as expected within your own
**Client Components**, since they themselves have the "use client" directive,
but they won't work within (SC). To fix this, you can wrap third-party
components that rely on "use client" features in your own **Client Components**.
Now you can use the <Component /> directly within a (SC).

React applications rely on context API to share data between components, either
directly via `createContext` or indirectly via provider components imported from
third-party libraries. However in Next.js 13, `context` is fully supported with
**Client Components** only, so it cannot be created or consumed directly within
(SC). This is because (SC) have no React state (since they're not interactive)
they Node.js code, and context API is primarily used for rerendering interactive
components deep in the tree after some React state has been updated.

We'll discuss alternatives for sharing data between (SC), but first, let's take
a look at how to use context within Client Components. All of the context APIs
are fully supported within Client Components. Define a `<Provider>` component by
using a patten "Context Component Pattern":

```jsx
// https://beta.nextjs.org/docs/rendering/server-and-client-components#context
// 👇🏻 Context Component Pattern
function Provider({ children }) {
  const [theme, setTheme] = useState('light');
  const value = { theme, setTheme };
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
```

Then, use the `<Provider>` component to wrap your Client Components:

```jsx
// 👇🏻 Context Component Pattern
function App() {
  return (
    <Provider>
      <Component />
    </Provider>
  );
}
```

Dependencies:

```json
"dependencies": {
  "eslint": "8.37.0",
  "eslint-config-next": "13.2.4",
  "next": "13.2.4",
  "next-themes": "^0.2.1",
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "react-icons": "^4.8.0"
},
```

Regards, <br />
Luigi Lupini <br />
<br />
I ❤️ all things (🇮🇹 / 🛵 / ☕️ / 👨‍👩‍👧)<br />

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
