'use client';

import React from 'react';
import Link from 'next/link';
/* `useSearchParams` under Client Component (CC) Hooks
https://beta.nextjs.org/docs/api-reference/use-search-params

`useSearchParams` hook reads the clients current url `query` string. It returns
a read-only version of `URLSearchParams`. A interface which has utility methods
for reading the url "query" string. Example the `get` method returns the first
value associated with a search parameter you pass. Example we here a dashboard
url query string and the methods available:

> searchParams.get("a"):
`/dashboard?a=1` - returns '1'
`/dashboard?a=` - returns ''
`/dashboard?b=3` - returns null
`/dashboard?a=1&a=2` - returns '1' (use `getAll` to get all values)

> searchParams.getAll("a"):
`/dashboard?a=1` - returns ['1']
`/dashboard?a=` - returns ['']
`/dashboard?b=3` - returns []
`/dashboard?a=1&a=2` - returns ['1', '2']

> searchParams.has("a"):
`/dashboard?a=1` - returns true
`/dashboard?a=` - returns true
`/dashboard?b=3` - returns false

`useSearchParams` is a (CC) hook and is "not supported" in Server Components to
prevent stale values during partial rendering. If an app includes the `/pages`
directory, `useSearchParams` will return ReadonlyURLSearchParams | null. */
import { useSearchParams } from 'next/navigation';

function NavItem({ title, param }) {
  const query = `?genre=${param}`;
  const searchParams = useSearchParams(); // 👈🏻 client component hooks
  const active = searchParams.get('genre');
  return (
    <div>
      <Link
        className={`hover:text-yellow-500 font-semibold ${
          active && // 👈🏻 check if query string is truthy (not null)
          active === param && // 👈🏻 check if query string match param (genre)
          'underline underline-offset-8 decoration-3 decoration-yellow-500 rounded-full text-yellow-600'
        }`}
        href={query}
      >
        {title}
      </Link>
    </div>
  );
}

export default function Navbar() {
  return (
    <div className="flex justify-center gap-8 p-4 bg-yellow-100 dark:bg-gray-600 lg:text-lg">
      <NavItem title="Trending" param="fetchTrending" />
      <NavItem title="Top Rated" param="fetchTopRated" />
    </div>
  );
}
