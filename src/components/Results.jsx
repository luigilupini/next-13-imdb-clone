import React from 'react';
import Card from './Card';

export default function Results({ results }) {
  return (
    <section className="py-4 mx-auto sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl">
      {results.map((result) => (
        <Card key={result.id} result={result} />
      ))}
    </section>
  );
}
