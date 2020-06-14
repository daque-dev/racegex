import React, { useState } from "react";
import RegexInput from "./RegexInput";
import RegexTests from "./RegexTests";

import "./App.css";

function App() {
  const [regex, setRegex] = useState((null as unknown) as RegExp);
  return (
    <div>
      <RegexInput setRegex={setRegex} />
      <RegexTests regex={regex} />
    </div>
  );
}

export default App;
