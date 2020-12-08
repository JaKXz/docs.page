import type { AppProps } from 'next/app';

import 'nprogress/nprogress.css';
import 'react-medium-image-zoom/dist/styles.css';

import '../prism-theme.css';
import '../styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
