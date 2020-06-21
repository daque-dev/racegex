import React, { useState, useEffect, useRef } from "react";

import RegexTests from "./RegexTests/RegexTests";
import RegexInput from "./RegexInput/RegexInput";
import { useParams } from "react-router-dom";

type PlayParams = {
  room?: string;
};

function Play() {
  const [regex, setRegex] = useState((null as unknown) as RegExp);
  const { room }: PlayParams = useParams();
  const ws = useRef((null as unknown) as WebSocket);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:4000/ws");
    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ message: "connected" }));
    };
    ws.current.onclose = () => console.log("ws closed");
    ws.current.onmessage = ({ data }: MessageEvent) => console.log(data);
    return () => {
      ws.current.close();
    };
  }, []);

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
