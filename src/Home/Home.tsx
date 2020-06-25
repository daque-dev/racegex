import React, { useState, useCallback } from "react";
// @ts-ignore
import Type from "./Type";

import classnames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classnames.bind(styles);

function Home() {
  let copy = `Whether for pleasure, curiosity, or necessity, we'll help you to learn regular expressions.`;
  const [regexes] = useState(
    ["whe\\S+", "wh?e\\S*", "regular", "[a-z]+ity", "[a-z]*e[a-z]*", "erasure", "er?asure"].reduce(
      (acc: any[], cur: string) => [...acc, cur, () => onFinish(cur), 1500],
      []
    )
  );
  const [regex, setRegex] = useState("");

  const onFinish = useCallback(setRegex, [setRegex]);

  return (
    <div className={cx("home")}>
      <div className={cx("description")}>
        <div className={cx("title", "interactive")}>
          /
          <Type loop={Infinity} steps={regexes} />
          /gi
        </div>
        <div className={cx("subtitle")}>
          {copy
            .replace(new RegExp(`(${regex})`, "gi"), "|$1|")
            .split("|")
            .map((e, i) => (i % 2 === 0 ? e : <span>{e}</span>))}
        </div>
      </div>
    </div>
  );
}

export default Home;
