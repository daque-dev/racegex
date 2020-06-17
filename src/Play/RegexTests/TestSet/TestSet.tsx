import React, { useState } from "react";

import styles from "./TestSet.module.scss";
import { IndividualTest } from "../../../types";

type TestSetProps = {
  shouldMatch: boolean;
  tests: {
    visible: IndividualTest[];
    hidden: IndividualTest[];
  };
};

function TestSet({ shouldMatch, tests }: TestSetProps) {
  const [hideSuccessful, setHideSuccessful] = useState(false);

  return (
    <div
      className={`${styles.container} ${
        styles[shouldMatch ? "should-match" : "should-not-match"]
      }
      `}
    >
      <div className={styles["header"]}>
        <div className={styles["row"]}>
          <div className={styles["title"]}>
            {shouldMatch ? "Should match" : "Should not match"}
          </div>
          <div className={styles["score"]}>
            {tests.visible.map((test) => (
              <div
                className={`${styles["test-block"]} ${
                  test.success ? styles["successful"] : ""
                }`}
              ></div>
            ))}
            {tests.visible.reduce(
              (acc, cur) => (cur.success ? acc + 1 : acc),
              0
            )}{" "}
            / {tests.visible.length}
          </div>
        </div>
        <div className={styles["row"]}>
          <input
            type="checkbox"
            checked={hideSuccessful}
            onChange={() => setHideSuccessful(!hideSuccessful)}
          />
          <div onClick={() => setHideSuccessful(!hideSuccessful)}>
            Hide successful tests
          </div>
        </div>
      </div>
      {tests.visible
        .filter((e) => (hideSuccessful ? !e.success : true))
        .map((test) => (
          <div
            className={`${styles["regex-test"]} ${
              shouldMatch ? styles["matcheable"] : styles["non-matcheable"]
            } ${test.success ? styles["successful"] : ""}`}
          >
            {test.content.map((e) => (
              <p className={e.matched ? styles["matched"] : ""}>{e.text}</p>
            ))}
          </div>
        ))}
    </div>
  );
}
export default TestSet;
