import React from "react";

import "./App.css";

type RegexTestProps = {
  regex: RegExp;
};

function RegexTests({ regex }: RegexTestProps) {
  const separateTests = (test: string) => {
    if (test.match(regex)) {
      const nonMatched = test.split(regex);
      const matched = test.match(regex);
      let result = [{ text: nonMatched[0], matched: false }];
      for (let i = 1; i < nonMatched.length; i++) {
        result.push({ text: matched![i - 1], matched: true });
        result.push({ text: nonMatched[i], matched: false });
      }
      return result;
    }

    return [{ text: test, matched: false }];
  };

  const tests = [
    "boomer",
    "zoomer",
    "coomer",
    "the consoomer",
    "migueloomert"
  ].map((e) => ({ id: e, content: separateTests(e) }));

  return (
    <div>
      {tests.map((test) => (
        <li key={test.id}>
          {test.content.map((e) => (
            <p className={e.matched ? "matched" : ""}>{e.text}</p>
          ))}
        </li>
      ))}
    </div>
  );
}

export default RegexTests;
