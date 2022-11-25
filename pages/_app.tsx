import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import React from "react";
import { RecoilRoot } from "recoil"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
};
export default MyApp
