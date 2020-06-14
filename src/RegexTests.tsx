import React from "react";

import "./App.css";

type RegexTestProps = {
  regex: RegExp;
};

type CustomRegex = {
  id: string;
  pre: string;
  match: string;
  post: string;
};

function RegexTests({ regex }: RegexTestProps) {
  const separateTests = (test: string) => {
    if (test.match(regex)) {
      const { pre, match, post } = test.match(regex)?.groups as CustomRegex;
      return {
        id: test,
        pre,
        match,
        post
      };
    }

    return { id: test, pre: test, match: "", post: "" };
  };

  const tests = [
    "boomer",
    "zoomer",
    "coomer",
    "the consoomer",
    "migueloomert"
  ].map(separateTests);

  return (
    <div>
      {tests.map((test) => (
        <li key={test.id}>
          <p>{test.pre}</p>
          <p style={{ fontWeight: "bold" }}>{test.match}</p>
          <p>{test.post}</p>
        </li>
      ))}
    </div>
  );
}

export default RegexTests;
