import React from 'react';

import ReactMarkdown from 'react-markdown';

import { LevelLesson } from 'models';
import { getLesson, getLevels } from 'API/api';

type LessonProps = {
  data: LevelLesson;
};

const Lesson = ({ data }: LessonProps) => {
  return (
    <>
      <h2>{data && data.title}</h2>
      <ReactMarkdown source={data && data.content}></ReactMarkdown>
    </>
  );
};

type RouteParams = {
  params: {
    levelId: string;
    lessonId: string;
  };
};

// This gets called on every request
export async function getStaticProps({ params }: RouteParams) {
  // Fetch data from external API
  const data = await getLesson(params.lessonId);
  // Pass data to the page via props
  return { props: { data } };
}

export async function getStaticPaths(): Promise<{
  paths: RouteParams[];
  fallback: boolean;
}> {
  const levels = await getLevels();

  const params = levels.reduce(
    (acc, cur) => [
      ...acc,
      ...cur.lessons.map(e => ({
        params: { levelId: cur.id, lessonId: e.id },
      })),
    ],
    []
  );
  return {
    paths: params,
    fallback: false,
  };
}

export default Lesson;
