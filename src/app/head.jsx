import React from 'react';

export default function Head() {
  return (
    <>
      <title>IMDb Clone</title>
      <meta
        // This is a `meta` tag that tells the browser to render the page at the
        // width of the device by default and scales the page to fit the device.
        // This page is for the root route, that is, the home `app/page`.
        content="width=device-width, initial-scale=1"
        name="viewport"
      />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
