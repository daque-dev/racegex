import React from "react";

import "./App.css";

type RegexTestProps = {
  regex: RegExp;
};

function RegexTests({ regex }: RegexTestProps) {
  const tests = ["boomer", "zoomer", "coomer", "the consoomer", "migueloomert"];
  return (
    <div>
      {tests.map((test: string, i: number) => (
        <li key={test}>{test.replace(regex, "{{$&}}")}</li>
      ))}
    </div>
  );
}

export default RegexTests;
