import React, { useState, useCallback, useEffect } from "react";

import styles from "./Section.module.scss";
import { Link } from "react-router-dom";
import { LevelLesson, Level } from "../types";
import { getLesson } from "../API/api";
import Lesson from "./Lesson";
import Breadcrumbs from "./Breadcrumbs";

type SectionProps = Level & {
  activeLesson: string;
};

const Section = ({
  title,
  subtitle,
  lessons,
  id,
  activeLesson
}: SectionProps) => {
  const [lesson, setLesson] = useState((null as unknown) as LevelLesson);

  const reqLesson = useCallback(async (id: string) => {
    setLesson(await getLesson(id));
  }, []);

  useEffect(() => {
    if (!lessons) {
      reqLesson(activeLesson);
    } else {
      setLesson(lessons.find((e) => e.id === activeLesson)!);
    }
  }, [reqLesson, activeLesson, lessons]);

  return (
    <div className={styles["section"]}>
      {!activeLesson && (
        <>
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
          <hr />
          {lessons.map((e) => (
            <Link to={`/learn/${id}/${e.id}`} key={e.title}>
              {e.title}
              <span>{e.subtitle}</span>
            </Link>
          ))}
        </>
      )}
      {activeLesson && (
        <>
          <Breadcrumbs lesson={lesson} id={id} title={title} />
          <Lesson lesson={lesson} />
        </>
      )}
    </div>
  );
};

export default Section;
