import React, { useState, useEffect, useCallback } from "react";

type RegexInputProps = {
  setRegex: Function;
};

function RegexInput({ setRegex }: RegexInputProps) {
  const handleSetRegex = useCallback(
    (userRegex: string, flags: { g: boolean; i: boolean; m: boolean }) => {
      if (userRegex === "") {
        setRegex((null as unknown) as RegExp);
      } else {
        try {
          let flagsString = "";
          for (const flag in flags) {
            if (flags.hasOwnProperty(flag)) {
              if (flags[flag as "g" | "i" | "m"]) {
                flagsString += flag;
              }
            }
          }
          const regex = new RegExp(`${userRegex}`, flagsString);
          setValidInput(true);
          setRegex(regex);
        } catch {
          setValidInput(false);
        }
      }
    },
    [setRegex]
  );

  const [flags, setFlags] = useState({ g: true, i: true, m: true });
  const [userRegex, setUserRegex] = useState("");
  const [validInput, setValidInput] = useState(true);

  useEffect(() => {
    handleSetRegex(userRegex, flags);
  }, [flags, userRegex, handleSetRegex]);

  var userRegexWidth = userRegex.length + "ch";
  var spacerSty = { width: userRegexWidth };
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div
        className={
          "regex-input-container " + (validInput ? "valid" : "invalid")
        }
      >
        /
        <input
          type="text"
          style={spacerSty}
          onChange={(event) => setUserRegex(event.target.value)}
        ></input>
        /{(flags.g ? "g" : "") + (flags.i ? "i" : "") + (flags.m ? "m" : "")}
      </div>
      <div className="flags-container">
        Flags:
        <button
          className={flags.g ? "active" : "inactive"}
          onClick={() => setFlags({ ...flags, g: !flags.g })}
        >
          g
        </button>
        <button
          className={flags.i ? "active" : "inactive"}
          onClick={() => setFlags({ ...flags, i: !flags.i })}
        >
          i
        </button>
        <button
          className={flags.m ? "active" : "inactive"}
          onClick={() => setFlags({ ...flags, m: !flags.m })}
        >
          m
        </button>
        <div className="regex-input-valid">
          {validInput ? "Valid " : "Invalid "} expression
        </div>
      </div>
    </form>
  );
}

export default RegexInput;
