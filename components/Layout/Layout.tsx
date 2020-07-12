import { PropsWithChildren } from 'react';

import styles from './layout.module.scss';
import NavBar from '@components/NavBar/NavBar';

const Layout = ({ children }: PropsWithChildren<any>) => {
  return (
    <div className={styles.pageContainer}>
      <NavBar />
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
};

export default Layout;
