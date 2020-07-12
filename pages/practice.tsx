import Head from 'next/head';
import Link from 'next/link';

const Practice = () => {
  return (
    <>
      <Head>
        <title>Practice</title>
      </Head>
      <h2>Practice</h2>
      <Link href='/'>
        <a>Hola</a>
      </Link>
    </>
  );
};

export default Practice;
