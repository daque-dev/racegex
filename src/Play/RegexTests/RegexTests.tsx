import React, { ReactNode, useState } from "react";
import data from "../../tests.json";
import ReactMarkdown from "react-markdown";
import TestSet from "./TestSet/TestSet";
import { RegexTest } from "../../types.js";

type RegexTestProps = {
  regex: RegExp;
  children: ReactNode;
};

function RegexTests({ regex, children }: RegexTestProps) {
  const separateTests = (test: string) => {
    if (test.match(regex)) {
      const replacedText = test.replace(regex, "|||$1|||").split("|||");
      let result = [];
      for (let i = 0; i < replacedText.length; i++) {
        result.push({ text: replacedText[i], matched: i % 2 === 1 });
      }
      const success = replacedText.length === 3 && replacedText[1] === test;
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
    },
    hidden: {
      "should-match": (parsedTests.hidden["should-match"] as string[]).map(
        separateTests
      ),
      "should-not-match": (parsedTests.hidden[
        "should-not-match"
      ] as string[]).map(separateTests)
    }
  };
  return (
    <>
      <ReactMarkdown source={tests.description} />
      {children}

      <TestSet
        shouldMatch={true}
        tests={{
          visible: tests.visible["should-match"],
          hidden: tests.hidden["should-match"]
        }}
      ></TestSet>
      <TestSet
        shouldMatch={false}
        tests={{
          visible: tests.visible["should-not-match"],
          hidden: tests.hidden["should-not-match"]
        }}
      ></TestSet>
    </>
  );
}

export default RegexTests;
