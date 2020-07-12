import { PropsWithChildren } from 'react';

import styles from './layout.module.scss';

const Layout = ({ children }: PropsWithChildren<any>) => {
  return <div className={styles.container}>{children}</div>;
};

export default Layout;
