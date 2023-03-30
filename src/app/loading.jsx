import React from 'react';
/* # Loading UI
https://beta.nextjs.org/docs/routing/loading-ui
Next.js 13 introduced a new file convention, loading.js, to help you create
meaningful Loading UI with React Suspense. With this convention, you can show an
instant loading state from the server while your content of a route/page segment
loads, the new content is auto swapped once rendering is complete.

# Instant Loading States

An instant loading state is fallback UI shown immediately upon navigation. You
can pre-render loading indicators such as skeletons and spinners, or a small but
meaningful part of future screens such as a cover photo, title, etc. This helps
users understand the app is responding and provides a better user experience.
Begin by creating loading state with `loading.js` file inside a folder. 

Like Error Boundaries, React Suspense is the component-based API used to create
error states. You can use the same Suspense component to create a loading state
In the same route/page folder in your `/app`, create an `loading.js` file that
will be nested inside `layout.js`. Next.js along with React will wrap `page.js`
file and any children below in a <Suspense> boundary. See the example below:

> https://beta.nextjs.org/docs/routing/loading-ui#instant-loading-states
*/
export default function loading() {
  return (
    <div className="flex justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="h-40" src="spinner.svg" alt="loading..." />
    </div>
  );
}
