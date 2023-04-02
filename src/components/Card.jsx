import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiThumbsUp } from 'react-icons/fi';

export default function Card({ result }) {
  if (!result.poster_path) return null;
  if (result.vote_average.toFixed(2) < 5) return null; // 👈🏻 We're filtering out movies with a rating below 5 as API is returning adult content :(
  return (
    <article className="transition-shadow duration-300 rounded-lg cursor-pointer sm:p-3 sm:hover:shadow-slate-200 sm:shadow-md sm:border sm:border-slate-400 sm:m-3 group">
      <Link href={`/movie/${result.id}`}>
        <div className="overflow-hidden rounded-sm sm:rounded-t-lg">
          <Image
            className="object-cover transition-transform duration-200 ease-in-out rounded-sm sm:rounded-t-lg group-hover:opacity-80 sm:hover:scale-110 group"
            style={{
              maxWidth: '100%',
              maxHeight: '360px',
            }}
            src={`https://image.tmdb.org/t/p/original${
              result.poster_path || result.backdrop_path
            }`}
            alt={result.title || result.name}
            width={500}
            height={300}
            placeholder="blur"
            blurDataURL="/spinner.svg"
          />
        </div>
        <div className="flex flex-col p-2">
          <p className="text-sm line-clamp-2">{result.overview}</p>
          <h2 className="mt-2 text-base font-semibold truncate">
            {result.title || result.name}
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-400">
            {result.release_date || result.first_air_date}
          </p>
          <p className="flex items-center mt-4">
            {result.vote_average
              ? `${result.vote_average.toFixed(2)} / 10`
              : 'Not rated yet...'}
            <FiThumbsUp className="h-4 mb-1 ml-3 mr-1" />
            {result.vote_count}
          </p>
        </div>
      </Link>
    </article>
  );
}
