'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBox() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    // 👈🏻 We're using the router to navigate to a new page `app/search/query` with the search `query` as a parameter in the URL.
    router.push(`/search/${search}`);
    console.log(search);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between max-w-6xl px-5 mx-auto"
    >
      <input
        type="text"
        placeholder="Search keywords..."
        className="flex-1 w-full text-gray-700 placeholder-gray-500 bg-transparent rounded-sm outline-none dark:text-gray-300 h-14 "
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <button
        type="submit"
        disabled={!search}
        className="text-yellow-600 disabled:text-gray-400 hover:text-yellow-500"
      >
        Search
      </button>
    </form>
  );
}
