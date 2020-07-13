import Head from 'next/head';

import { getLevels } from 'API/api';
import { Level } from 'models';
import Section from '@components/Section/Section';

type LearnProps = {
  data: Level[];
};

const Learn = ({ data }: LearnProps) => {
  return (
    <>
      <Head>
        <title>Learn</title>
      </Head>
      {data &&
        data.map(e => (
          <Section
            key={e.id}
            title={e.title}
            subtitle={e.subtitle}
            lessons={e.lessons}
            id={e.id}
            activeLesson={null}
          />
        ))}
    </>
  );
};

// This gets called on every request
export async function getStaticProps() {
  // Fetch data from external API
  const data = await getLevels();

  // Pass data to the page via props
  return { props: { data } };
}

export default Learn;
