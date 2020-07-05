import React from "react";
import { LevelLesson } from "../types";
import { Link } from "react-router-dom";

import styles from "./Breadcrumbs.module.scss";

type BreadcrumbsProps = {
  id: string;
  title: string;
  lesson: LevelLesson;
};

const Breadcrumbs = ({ id, title, lesson }: BreadcrumbsProps) => {
  const sameLevel = lesson && lesson.nextLevel === lesson.levelId;

  return (
    <code className={styles.breadcrumbs}>
      <Link to="/learn" className={styles.roadmap}>
        Roadmap ->{" "}
      </Link>{" "}
      <Link to={`/learn/${id}`} className={styles.currentLevel}>
        {title}
      </Link>{" "}
      -> <span className={styles.currentLesson}>{lesson && lesson.title}</span>{" "}
      |{" "}
      {lesson && lesson.nextId && (
        <Link
          to={
            sameLevel
              ? lesson.nextId
              : `/learn/${lesson.nextLevel}/${lesson.nextId}`
          }
          className={sameLevel ? styles.nextTitle : styles.nextLevel}
        >
          Up next: {lesson.nextTitle}
        </Link>
      )}
    </code>
  );
};

export default Breadcrumbs;
