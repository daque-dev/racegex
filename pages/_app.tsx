import { AppProps } from 'next/app';

import './styles.scss';

import Layout from '@components/Layout/Layout';
import Loader from '@components/Loader/Loader';

import useLoader from '@hooks/use-loader';

function MyApp({ Component, pageProps }: AppProps) {
  const isLoading = useLoader();

  return <Layout>{isLoading ? <Loader /> : <Component {...pageProps} />}</Layout>;
}

export default MyApp;
