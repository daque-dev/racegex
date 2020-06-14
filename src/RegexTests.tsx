import React, { ReactNode, useState } from "react";
import data from "./tests.json";

import "./App.scss";

type RegexTestProps = {
  regex: RegExp;
  children: ReactNode;
};

type RegexTest = {
  description: string;
  visible: RegexTestMatches;
  hidden: RegexTestMatches;
};

type RegexTestMatches = {
  "should-match": string[] | IndividualTest[];
  "should-not-match": string[] | IndividualTest[];
};

type IndividualTest = {
  content: { text: string; matched: boolean }[];
  success: boolean;
};

function RegexTests({ regex, children }: RegexTestProps) {
  const separateTests = (test: string) => {
    if (test.match(regex)) {
      const nonMatched = test.split(regex);
      const matched = test.match(regex);
      let result = [{ text: nonMatched[0], matched: false }];
      for (let i = 1; i < nonMatched.length; i++) {
        result.push({ text: matched![i - 1], matched: true });
        result.push({ text: nonMatched[i], matched: false });
      }
      const success = nonMatched.filter((e) => e !== "").length === 0;
      return {
        content: result,
        success
      };
    }

    return {
      content: [{ text: test, matched: false }],
      success: false
    };
  };
  const getRandomItem = <T extends unknown>(arr: any[]): T =>
    arr[Math.floor(Math.random() * arr.length)];

  const [parsedTests] = useState(getRandomItem<RegexTest>(data));
  const tests = {
    ...parsedTests,
    visible: {
      "should-match": (parsedTests.visible["should-match"] as string[]).map(
        separateTests
      ),
      "should-not-match": (parsedTests.visible[
        "should-not-match"
      ] as string[]).map(separateTests)
    }
  };
  return (
    <>
      <p>{tests.description}</p>
      {children}
      <h2>
        Should match{" "}
        <span className="score">
          {(tests.visible["should-match"] as IndividualTest[]).reduce(
            (acc, cur) => (cur.success ? acc + 1 : acc),
            0
          )}{" "}
          / {tests.visible["should-match"].length}
        </span>
      </h2>
      {(tests.visible["should-match"] as IndividualTest[]).map((test) => (
        <div
          className={
            "regex-test matcheable" + (test.success ? " successful" : "")
          }
        >
          {test.content.map((e) => (
            <p className={e.matched ? "matched" : ""}>{e.text}</p>
          ))}
        </div>
      ))}

      <h2>Shouldn't match</h2>
      {(tests.visible["should-not-match"] as IndividualTest[]).map((test) => (
        <div
          className={
            "regex-test non-matcheable" + (test.success ? " successful" : "")
          }
        >
          {test.content.map((e) => (
            <p className={e.matched ? "matched" : ""}>{e.text}</p>
          ))}
        </div>
      ))}
    </>
  );
}

export default RegexTests;
