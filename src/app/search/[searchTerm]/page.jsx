import React from 'react';
import Results from '@/components/Results';

const getSearchData = async (searchTerm) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${searchTerm}&language=en-US&include_adult=false`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  const data = await res.json();
  return data;
};

export default async function SearchPage({ params }) {
  const { results } = await getSearchData(params);
  return (
    <div>
      {results && results.length === 0 && (
        <h1 className="pt-6 text-center">No results found</h1>
      )}

      {results && <Results results={results} />}
    </div>
  );
}
