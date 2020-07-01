import React from "react";

import styles from "./Section.module.scss";

type SectionProps = {
  title: string;
  subtitle: string;
  levels: { title: string; subtitle: string }[];
};

const Section = ({ title, subtitle, levels }: SectionProps) => {
  return (
    <div className={styles["section"]}>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <hr />
      {levels.map((e) => (
        <p key={e.title}>
          {e.title}
          <span>{e.subtitle}</span>
        </p>
      ))}
    </div>
  );
};

export default Section;
