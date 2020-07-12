import Head from 'next/head';
import Link from 'next/link';

const Learn = () => {
  return (
    <>
      <Head>
        <title>Learn</title>
      </Head>
      <h2>Learn</h2>
      <Link href='/'>
        <a>Hola</a>
      </Link>
    </>
  );
};

export default Learn;
