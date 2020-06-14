import React from "react";

import "./App.scss";

type RegexTestProps = {
  regex: RegExp;
};

function RegexTests({ regex }: RegexTestProps) {
  const separateTests = (test: { content: string; shouldMatch: boolean }) => {
    if (test.content.match(regex)) {
      const nonMatched = test.content.split(regex);
      const matched = test.content.match(regex);
      let result = [{ text: nonMatched[0], matched: false }];
      for (let i = 1; i < nonMatched.length; i++) {
        result.push({ text: matched![i - 1], matched: true });
        result.push({ text: nonMatched[i], matched: false });
      }
      const success = test.shouldMatch
        ? nonMatched.filter((e) => e !== "").length === 0
        : matched?.length === 0;
      return {
        content: result,
        success
      };
    }

    return {
      content: [{ text: test.content, matched: false }],
      success: false
    };
  };

  const tests = [
    { content: "janedoe@mydomain.com", shouldMatch: true },
    { content: "johnDoe@mysub.domain.com", shouldMatch: true },
    { content: "JANEDOE@MYDOMAIN.COM", shouldMatch: true },
    { content: "JA-NE.DOE@MY-DO-MAIN.COM", shouldMatch: true },
    { content: "@mydomain.com", shouldMatch: false },
    { content: "jane@domain", shouldMatch: false },
    { content: "jane@.", shouldMatch: false }
  ].map((e) => ({
    id: e.content,
    shouldMatch: e.shouldMatch,
    ...separateTests(e)
  }));

  return (
    <>
      {tests.map((test) => (
        <div
          className={
            "regex-test" +
            (test.success ? " successful" : "") +
            (test.shouldMatch ? " matcheable" : " non-matcheable")
          }
          key={test.id.replace(/\s/, "")}
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
