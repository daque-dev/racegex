import classNames from "classnames/bind";
import { IndividualTest } from "models";
import React, { useState } from "react";
import styles from "./TestSet.module.scss";

const cx = classNames.bind(styles);

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
      className={cx("container", { shouldMatch, shouldNotMatch: !shouldMatch })}
    >
      <div className={cx("header")}>
        <div className={cx("row")}>
          <div className={cx("title")}>
            {shouldMatch ? "Should match" : "Should not match"}
          </div>
          <div className={cx("score")}>
            {tests.visible.map((test) => (
              <div
                className={cx("test-block", { successful: test.success })}
              ></div>
            ))}
            {tests.visible.reduce(
              (acc, cur) => (cur.success ? acc + 1 : acc),
              0
            )}{" "}
            / {tests.visible.length}
          </div>
        </div>
        <div className={cx("row")}>
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
            className={cx("regex-test", {
              shouldMatch,
              shouldNotMatch: !shouldMatch,
              successful: test.success
            })}
          >
            {test.content.map(({ matched, text }) => (
              <p className={cx({ matched })}>{text}</p>
            ))}
          </div>
        ))}
    </div>
  );
}
export default TestSet;