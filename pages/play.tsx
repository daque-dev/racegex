import Head from 'next/head';
import Link from 'next/link';

const Play = () => {
  return (
    <>
      <Head>
        <title>Play</title>
      </Head>
      <h2>Play</h2>
      <Link href='/'>
        <a>Hola</a>
      </Link>
    </>
  );
};

export default Play;
