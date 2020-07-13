import React from 'react';
import { LevelLesson } from 'models';

import Link from 'next/link';

import styles from './Breadcrumbs.module.scss';

type BreadcrumbsProps = {
  id: string;
  title: string;
  lesson: LevelLesson;
};

const Breadcrumbs = ({ id, title, lesson }: BreadcrumbsProps) => {
  const sameLevel = lesson && lesson.nextLevel === lesson.levelId;

  return (
    <code className={styles.breadcrumbs}>
      <Link href='/learn'>
        <a className={styles.roadmap}>Roadmap</a>
      </Link>
      {' > '}
      <span className={styles.currentLesson}>{lesson && lesson.title}</span>
      {lesson && lesson.nextId && (
        <>
          {' '}
          |{' '}
          <Link
            href='/learn/[levelId]/[lessonId]'
            as={
              sameLevel
                ? `/learn/${lesson.levelId}/${lesson.nextId}`
                : `/learn/${lesson.nextLevel}/${lesson.nextId}`
            }
          >
            <a className={sameLevel ? styles.nextTitle : styles.nextLevel}>
              Up next: {lesson.nextTitle}
            </a>
          </Link>
        </>
      )}
    </code>
  );
};

export default Breadcrumbs;
