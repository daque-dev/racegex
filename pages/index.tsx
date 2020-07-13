import React, { useState, useCallback } from 'react';
import classnames from 'classnames/bind';
// @ts-ignore
import Typical from 'react-typical';

import Head from 'next/head';

import styles from './home.module.scss';

const cx = classnames.bind(styles);

export default function Home() {
  const copy = `Whether for pleasure, curiosity, or necessity, we'll help you learn regular expressions.`;
  const [regexes] = useState(
    [
      'whe\\S+',
      'wh?e\\S*',
      'regular',
      '[a-z]+ity',
      '[a-z]*e[a-z]*',
      'erasure',
      'er?asure',
    ].reduce(
      (acc: any[], cur: string) => [...acc, cur, () => onFinish(cur), 1500],
      []
    )
  );

  const [regex, setRegex] = useState('');

  const onFinish = useCallback(setRegex, [setRegex]);

  return (
    <>
      <Head>
        <title>Racegex</title>
      </Head>
      <div className={cx('home')}>
        <div className={cx('description')}>
          <div className={cx('title', 'interactive')}>
            /
            <Typical loop={Infinity} steps={regexes} />
            /gi
          </div>
          <div className={cx('subtitle')}>
            {copy
              .replace(new RegExp(`(${regex})`, 'gi'), '|$1|')
              .split('|')
              .map((e, i) =>
                i % 2 === 0 ? e : <span key={`${e}-${i}`}>{e}</span>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
