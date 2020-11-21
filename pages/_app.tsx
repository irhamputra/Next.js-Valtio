import * as React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import styles from '../styles/styles.module.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Next.js | Valtio</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
      </Head>
      <div className={styles.App}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
