import { AppProps } from 'next/app';

import './styles.scss';

import NavBar from '@components/NavBar/NavBar';
import Layout from '@components/Layout/Layout';
import Loader from '@components/Loader/Loader';

import useLoader from '@hooks/use-loader';

function MyApp({ Component, pageProps }: AppProps) {
  const isLoading = useLoader();

  return (
    <>
      <NavBar />
      <Layout>{isLoading ? <Loader /> : <Component {...pageProps} />}</Layout>
    </>
  );
}

export default MyApp;
