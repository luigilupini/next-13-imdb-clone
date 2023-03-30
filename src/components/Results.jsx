import React from 'react';

export default function Results({ results }) {
  return (
    <article className="flex flex-wrap">
      {results.map((result) => (
        <div className="p-5 border border-red-400" key={result.id}>
          <h1>{result.title || result.name}</h1>
        </div>
      ))}
    </article>
  );
}
