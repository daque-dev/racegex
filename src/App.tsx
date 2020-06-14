import React, { useState } from "react";
import RegexInput from "./RegexInput";
import RegexTests from "./RegexTests";

import "./App.scss";

function App() {
  const [regex, setRegex] = useState((null as unknown) as RegExp);
  return (
    <>
      <div>
        <h2>Racegex</h2>
        <h3>Check your regex abilities and win in a matching race!</h3>
      </div>
      <hr />
      <div>
        <RegexTests regex={regex}>
          <RegexInput setRegex={setRegex} />
        </RegexTests>
      </div>
    </>
  );
}

export default App;
