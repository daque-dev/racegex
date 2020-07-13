import React from 'react';

import ReactMarkdown from 'react-markdown';

import { LevelLesson } from 'models';
import { getLesson, getLevels } from 'API/api';
import Breadcrumbs from '@components/Section/Breadcrumbs';
import Head from 'next/head';

type LessonProps = {
  data: LevelLesson;
};

const Lesson = ({ data }: LessonProps) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <title></title>
      <Breadcrumbs lesson={data} id={data.id} title={data.title} />
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
