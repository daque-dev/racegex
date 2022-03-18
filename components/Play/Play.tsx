import React, {
  FormEvent, useCallback, useEffect,
  useRef, useState
} from "react";
import RegexInput from "./RegexInput/RegexInput";
import RegexTests from "./RegexTests/RegexTests";


type PlayComponentProps = {
  room: string;
}

function PlayComponent({ room }: PlayComponentProps) {
  const [regex, setRegex] = useState((null as unknown) as RegExp);
  const [ready, setReady] = useState(false);
  const [players, setPlayers] = useState(
    [] as {
      name: string;
      ready: boolean;
    }[]
  );
  const [username, setUsername] = useState("");

  const ws = useRef((null as unknown) as WebSocket);

  const handleClickOnReady = () => {
    const newReady = !ready;
    setReady(newReady);
    ws.current.send(JSON.stringify({ event: "user_ready", username, ready: newReady }));
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
    ws.current = new WebSocket(`ws://${document.location.hostname}:5000/`);

    ws.current.addEventListener('open', () => {
      console.log('sending', room)
      ws.current.send(room);
    })
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
    ws.current.send(JSON.stringify({ username: input.value, event: "user_joined" }));
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
      <button onClick={handleClickOnReady} >
        I'm ready
      </button>
      <ul>
        {players.map((e) => (
          <li key={e.name}>
            {e.name}: {e.ready ? "Ready" : "Not ready"}
          </li>
        ))}
      </ul>
      {players.length > 1 && players.filter((e) => !e.ready).length === 0 || true ? (
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

export default PlayComponent;