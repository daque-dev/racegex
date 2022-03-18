import PlayComponent from '@components/Play/Play';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Play = () => {
  const { query: { room } } = useRouter();

  return (
    <>
      <Head>
        <title>Play</title>
      </Head>
      <h2>Play</h2>
      {
        room ?
          <Link href='/'>
            <PlayComponent room={room as string}></PlayComponent>
          </Link>
          : null}
    </>
  );
};

export default Play;
