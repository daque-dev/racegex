import Link from 'next/link';

import styles from './navbar.module.scss';

const NavBar = () => {
  return (
    <nav id={styles.mainNavigation}>
      <div className={styles.home}>
        <Link href='/'>
          <a>RACEGEX</a>
        </Link>
      </div>
      <div className={styles.sections}>
        <Link href='/learn'>
          <a>Learn</a>
        </Link>
        <Link href='/practice'>
          <a>Practice</a>
        </Link>
        <Link href='/play'>
          <a>Play</a>
        </Link>{' '}
      </div>
    </nav>
  );
};

export default NavBar;
