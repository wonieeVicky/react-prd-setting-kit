import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { wrapper } from 'store';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    window.history.scrollRestoration = 'auto';

    const cacheScrollPositions: Array<[number, number]> = [];
    let shouldScrollRestore: null | { x: number; y: number };

    router.events.on('routeChangeStart', () => {
      cacheScrollPositions.push([window.scrollX, window.scrollY]);
    });

    router.events.on('routeChangeComplete', () => {
      if (shouldScrollRestore) {
        const { x, y } = shouldScrollRestore;
        window.scrollTo(x, y);
        shouldScrollRestore = null;
      }
      window.history.scrollRestoration = 'auto';
    });

    router.beforePopState(() => {
      if (cacheScrollPositions.length > 0) {
        const scrollPosition = cacheScrollPositions.pop();
        if (scrollPosition) {
          shouldScrollRestore = {
            x: scrollPosition[0],
            y: scrollPosition[1],
          };
        }
      }
      window.history.scrollRestoration = 'manual';
      return true;
    });
  }, []);
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(App);
