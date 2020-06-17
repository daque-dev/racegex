import React, { useState } from "react";

import "./Play.scss";
import RegexTests from "../RegexTests/RegexTests";
import RegexInput from "../RegexInput/RegexInput";

function Play() {
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

export default Play;
