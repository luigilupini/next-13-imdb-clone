import './globals.css';
import { Karla } from 'next/font/google';
import Header from '@/components/Header';

const karla = Karla({
  subsets: ['latin-ext'],
  weights: [300, 400, 700],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={karla.className}>
        {/* Header */}
        <Header />
        {/* Search Input */}

        {/* Main Content */}
        {children}
        {/* Footer */}
      </body>
    </html>
  );
}
