import Head from "next/head";

import { CardGrid } from "../components/CardGrid";
import { Footer } from "../components/Footer";
import { GetStarted } from "../components/GetStarted";
import { Welcome } from "../components/Welcome";

export default function Home () {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Welcome />
        <GetStarted />
        <CardGrid />
      </main>

      <Footer />
    </>
  );
}
