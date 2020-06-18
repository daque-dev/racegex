import React, { ReactNode, useState } from "react";
import data from "../../tests.json";
import ReactMarkdown from "react-markdown";
import TestSet from "./TestSet/TestSet";
import { RegexTest } from "../../types.js";

type RegexTestProps = {
  regex: RegExp;
  children: ReactNode;
};

const WrapperString = "þð“~ßł";

function RegexTests({ regex, children }: RegexTestProps) {
  const separateTests = (test: string) => {
    if (test.match(regex)) {
      const replacedText = test
        .replace(regex, `${WrapperString}$1${WrapperString}`)
        .split(WrapperString);
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
      shouldMatch: (parsedTests.visible.shouldMatch as string[]).map(
        separateTests
      ),
      shouldNotMatch: (parsedTests.visible.shouldNotMatch as string[]).map(
        separateTests
      )
    },
    hidden: {
      shouldMatch: (parsedTests.hidden.shouldMatch as string[]).map(
        separateTests
      ),
      shouldNotMatch: (parsedTests.hidden.shouldNotMatch as string[]).map(
        separateTests
      )
    }
  };
  return (
    <>
      <ReactMarkdown source={tests.description} />
      {children}

      <TestSet
        shouldMatch={true}
        tests={{
          visible: tests.visible.shouldMatch,
          hidden: tests.hidden.shouldMatch
        }}
      ></TestSet>
      <TestSet
        shouldMatch={false}
        tests={{
          visible: tests.visible.shouldNotMatch,
          hidden: tests.hidden.shouldNotMatch
        }}
      ></TestSet>
    </>
  );
}

export default RegexTests;
