import React, { ReactNode, useState } from "react";
import data from "../tests.json";
import ReactMarkdown from "react-markdown";
import TestSet from "./TestSet/TestSet";

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
