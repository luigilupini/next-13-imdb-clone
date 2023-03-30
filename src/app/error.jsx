'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';

// https://beta.nextjs.org/docs/routing/error-handling#how-errorjs-works
export default function Error({ error, reset }) {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div className="relative mx-auto mt-28 w-52 h-52">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p>Something went wrong :(</p>
      <Image
        className="absolute -top-7 -right-3/4"
        src="https://i.gifer.com/7VE.gif"
        width={180}
        height={180}
        alt="Error"
      />
      <button
        className="px-4 py-2 mt-3 font-bold text-white bg-red-500 rounded hover:bg-red-700"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
