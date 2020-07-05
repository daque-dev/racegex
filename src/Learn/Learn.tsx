import React, { useState, useCallback, useEffect } from "react";
import Section from "./Section";

import { useParams } from "react-router-dom";
import { getLevels, getLevel } from "../API/api";
import { Level } from "../types";

const Learn = () => {
  const { levelId, lessonId } = useParams();
  const [sections, setSections] = useState((null as unknown) as Level[]);

  const regLevels = useCallback(async () => {
    setSections(await getLevels());
  }, [setSections]);

  const reqLevel = useCallback(
    async (id) => {
      setSections([await getLevel(id)]);
    },
    [setSections]
  );

  useEffect(() => {
    if (!sections && levelId && !lessonId) {
      reqLevel(levelId);
    }
    if (!sections) {
      regLevels();
    }
  }, [regLevels, reqLevel, levelId, lessonId, sections]);

  return (
    <>
      {sections &&
        sections
          .filter((e) => !levelId || e.id === levelId)
          .map((e) => (
            <Section
              key={e.id}
              title={e.title}
              subtitle={e.subtitle}
              lessons={e.lessons}
              id={e.id}
              activeLesson={lessonId}
            />
          ))}
    </>
  );
};

export default Learn;
