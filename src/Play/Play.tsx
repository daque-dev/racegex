import React, { useState } from "react";

import RegexTests from "./RegexTests/RegexTests";
import RegexInput from "./RegexInput/RegexInput";
import { useParams } from "react-router-dom";

type PlayParams = {
  room?: string;
};

function Play() {
  const [regex, setRegex] = useState((null as unknown) as RegExp);
  const { room }: PlayParams = useParams();
  return (
    <>
      <div>
        <h2>Racegex</h2>
        <h3>Check your regex abilities and win in a matching race!</h3>
      </div>

      <div style={{ fontSize: "1em", color: "red" }}>
        Playing on room {room}
      </div>

      <div>
        <RegexTests regex={regex}>
          <RegexInput setRegex={setRegex} />
        </RegexTests>
      </div>
    </>
  );
}

export default Play;
