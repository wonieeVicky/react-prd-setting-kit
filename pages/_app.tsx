import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Head from 'next/head';
import { wrapper } from '@store/index';
import { Provider } from 'react-redux';

const App = ({ Component, ...args }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(args);
  const { pageProps } = props;

  const router = useRouter();

  // useEffect(() => {
  //   window.history.scrollRestoration = 'auto';

  //   const cacheScrollPositions: Array<[number, number]> = [];
  //   let shouldScrollRestore: null | { x: number; y: number };

  //   router.events.on('routeChangeStart', () => {
  //     cacheScrollPositions.push([window.scrollX, window.scrollY]);
  //   });

  //   router.events.on('routeChangeComplete', () => {
  //     if (shouldScrollRestore) {
  //       const { x, y } = shouldScrollRestore;
  //       window.scrollTo(x, y);
  //       shouldScrollRestore = null;
  //     }
  //     window.history.scrollRestoration = 'auto';
  //   });

  //   router.beforePopState(() => {
  //     if (cacheScrollPositions.length > 0) {
  //       const scrollPosition = cacheScrollPositions.pop();
  //       if (scrollPosition) {
  //         shouldScrollRestore = {
  //           x: scrollPosition[0],
  //           y: scrollPosition[1],
  //         };
  //       }
  //     }
  //     window.history.scrollRestoration = 'manual';
  //     return true;
  //   });
  // }, []);

  return (
    <Provider store={store}>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>킵그로우</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
