// NEXT_PUBLIC_API_KEY IS FOR CLIENT SIDE
// This variable is "protected" at the server end & is not exposed to the client
// as a Next.js security feature. The variable is only available to the "server"
// and not the client. So if the variable was called `NEXT_PUBLIC then it would

import Results from '@/components/Results';

// be exposed to the Client Component, not ideal.
const API_KEY = process.env.API_KEY;

/* # Data Fetching
https://nextjs.org/blog/next-13#data-fetching

React's recent Support for Promises RFC introduces a powerful new way to fetch
data and handle promises inside components:

```jsx
// app/page.js
async function getData() {
  const res = await fetch('https://api.example.com/...');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  return res.json();
}
```
The native `fetch` Web API has also been extended in React and Next.js. It auto
de-dupes fetch requests and caches them for revalidation of data at a component
level. This means all the benefits of (ssg), (ssr), and (isr) is now available
through one single API interface for data fetching:

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
*/

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
  const data = await res.json();
  // Here we provide error handling:
  if (data.errors) {
    return {
      notFound: true,
    };
  }
  // ...or we error handle regarding the response status to an error page:
  if (!res.ok) {
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }
  return data;
};

export default async function Home({ searchParams }) {
  const data = await getData(searchParams);
  return (
    <div className="border-4 border-red-600">
      <Results results={data.results} />
    </div>
  );
}

/* # AUTO DE-DUPLICATION
In Next.js 13, the fetch API has been modified to automatically de-duplicate identical requests made by different components. This means that if two or more components make the same fetch request, Next.js will only send one request to the server and share the `response` among all components.

! This de-duplication process happens automatically and is designed to improve the performance of your application by reducing the number of requests made to the server. When a fetch request is made by a component, Next.js checks to see if an identical request has already been made. If so, it will return a `cached` response for that `req` instead of sending a new request to the server.

The feature can be especially useful in scenarios where multiple components need
to fetch the same data. Imagine you have a page that displays a list of products
and each product has a btn to allow a user to add it to cart. If each product
component makes separate fetch request to get product details, you could end up
with a lot of redundant requests to a server. With de-duplication feature these
requests would be automatically consolidated into a single request, improving
the performance of your application.

It's worth noting that this de-dupes feature only works for identical requests
made by different components. If two components make slightly different `fetch`
requests (different query params), Next.js will still send separate requests. */
