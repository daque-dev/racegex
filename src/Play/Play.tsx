import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  FormEvent
} from "react";

import RegexTests from "./RegexTests/RegexTests";
import RegexInput from "./RegexInput/RegexInput";
import { useParams } from "react-router-dom";

type PlayParams = {
  room?: string;
};

function Play() {
  const [regex, setRegex] = useState((null as unknown) as RegExp);
  const [ready, setReady] = useState(false);
  const [players, setPlayers] = useState(
    [] as {
      name: string;
      ready: boolean;
    }[]
  );
  const [username, setUsername] = useState("");

  const { room }: PlayParams = useParams();
  const ws = useRef((null as unknown) as WebSocket);

  const handleClickOnReady = () => {
    const newReady = !ready;
    setReady(newReady);
    ws.current.send(JSON.stringify({ ready: username }));
  };

  const handleNewMessage = useCallback((data: MessageEvent) => {
    const content = JSON.parse(data.data);
    if (content.hasOwnProperty("joined")) {
      setPlayers((c) => [...c, { name: content.joined, ready: false }]);
    }
    if (content.hasOwnProperty("ready")) {
      console.log(content);
      setPlayers((c) => {
        const player = c.findIndex((e) => e.name === content.ready);
        if (player >= 0) {
          return [
            ...c.map((e) =>
              e.name === content.ready ? { ...e, ready: true } : e
            )
          ];
        }
        return [...c, { name: content.joined, ready: true }];
      });
    }
  }, []);

  useEffect(() => {
    ws.current = new WebSocket(`wss://${document.location.hostname}:4000/ws`);

    ws.current.onclose = () => console.log("ws closed");
    ws.current.onmessage = (data: MessageEvent) => handleNewMessage(data);
    return () => {
      ws.current.close();
    };
  }, [handleNewMessage]);

  const handleUsernameChange = (e: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    const [input] = Array.from(
      (e.target as HTMLElement).children
    ) as HTMLInputElement[];
    setUsername(input.value);
    ws.current.send(JSON.stringify({ joined: input.value }));
  };

  return (
    <>
      <div>
        <h2>Racegex</h2>
        <h3>Check your regex abilities and win in a matching race!</h3>
      </div>

      <div style={{ fontSize: "1em", color: "red" }}>
        Playing on room {room} as:{" "}
        <form onSubmit={handleUsernameChange}>
          <input
            placeholder="Your name"
            type="text"
            disabled={username !== ""}
          />
          <button disabled={username !== ""}>Submit!</button>
        </form>
      </div>
      <button onClick={handleClickOnReady} disabled={ready}>
        I'm ready
      </button>
      <ul>
        {players.map((e) => (
          <li key={e.name}>
            {e.name}: {e.ready ? "Ready" : "Not ready"}
          </li>
        ))}
      </ul>
      {players.length > 1 && players.filter((e) => !e.ready).length === 0 ? (
        <div>
          <RegexTests regex={regex}>
            <RegexInput setRegex={setRegex} />
          </RegexTests>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Play;
