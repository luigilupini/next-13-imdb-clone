import './globals.css';
import { Karla } from 'next/font/google';

// components
import Header from '@/components/Header';
import ThemeProviders from '@/context/ThemeProviders';
import Navbar from '@/components/Navbar';
import SearchBox from '@/components/SearchBox';

const karla = Karla({
  subsets: ['latin-ext'],
  weights: [300, 400, 700],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={karla.className}>
        <ThemeProviders>
          {/* Header */}
          <Header />
          {/* NavBar */}
          <Navbar />
          <SearchBox />
          {/* Main Content */}
          {children}
          {/* Footer */}
        </ThemeProviders>
      </body>
    </html>
  );
}
