import React from "react";
import Section from "./Section";

import data from "./learn.json";

const Learn = () => {
  return (
    <>
      {(data as { title: string; subtitle: string; levels: any }[]).map((e) => (
        <Section title={e.title} subtitle={e.subtitle} levels={e.levels} />
      ))}
    </>
  );
};

export default Learn;
