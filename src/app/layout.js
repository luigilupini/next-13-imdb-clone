import './globals.css';
import { Karla } from 'next/font/google';

const karla = Karla({
  subsets: ['latin-ext'],
  weights: [400, 700],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={karla.className}>{children}</body>
    </html>
  );
}
