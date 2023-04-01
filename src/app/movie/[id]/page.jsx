import Image from 'next/image';

async function getMovie(movieId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`
  );
  const movie = await res.json();
  return movie;
}

export default async function MoviePage({ params }) {
  const movie = await getMovie(params.id);
  return (
    <div className="w-full">
      <div className="flex flex-col items-center content-center max-w-6xl p-4 mx-auto md:pt-8 md:flex-row md:space-x-6">
        <div className="overflow-hidden rounded-lg">
          <Image
            className="object-cover transition-transform duration-200 ease-in-out rounded-lg group-hover:opacity-80 sm:hover:scale-110 group"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
            }}
            src={`https://image.tmdb.org/t/p/original${
              movie.poster_path || movie.backdrop_path
            }`}
            alt={movie.title || movie.name}
            width={500}
            height={300}
            placeholder="blur"
            blurDataURL="/spinner.svg"
          />
        </div>
        <div className="p-2">
          <h2 className="mb-3 text-xl font-bold">
            {movie.title || movie.name}
          </h2>
          <p className="mb-3 text-lg">
            <span className="mr-1 font-semibold">Overview:</span>
            {movie.overview}
          </p>
          <p className="mb-3">
            <span className="mr-1 font-semibold">Date Released:</span>
            {movie.release_date || movie.first_air_date}
          </p>
          <p className="mb-3">
            <span className="mr-1 font-semibold">Rating:</span>
            {movie.vote_count}
          </p>
        </div>
      </div>
    </div>
  );
}
