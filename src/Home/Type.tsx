import React, { useRef, useEffect, memo } from "react";
// @ts-ignore
import { type, type as loopedType } from "@camwiegert/typical";

import styles from "./Type.module.scss";

type TypicalProps = {
  steps: (number | string)[];
  loop: number;
};

const Typical = ({ steps, loop }: TypicalProps) => {
  const typicalRef = useRef(null);

  useEffect(() => {
    if (loop === Infinity) {
      type(typicalRef.current, ...steps, loopedType);
    } else if (typeof loop === "number") {
      type(typicalRef.current, ...Array(loop).fill(steps).flat());
    } else {
      type(typicalRef.current, ...steps);
    }
  });

  return <p ref={typicalRef} className={styles.typicalWrapper} />;
};

export default memo(Typical);
