import React, { useState, useEffect, useCallback, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./RegexInput.module.scss";

const cx = classNames.bind(styles);

type RegexInputProps = {
  setRegex: Function;
};

function RegexInput({ setRegex }: RegexInputProps) {
  const [flags, setFlags] = useState({ g: true, i: true, m: true });
  const [userRegex, setUserRegex] = useState("");
  const [valid, setValid] = useState(true);

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
          const regex = new RegExp(`(${userRegex})`, flagsString);
          setValid(true);
          setRegex(regex);
        } catch {
          setValid(false);
        }
      }
    },
    [setRegex]
  );

  useEffect(() => {
    handleSetRegex(userRegex, flags);
  }, [flags, userRegex, handleSetRegex]);

  const inputRef = useRef((null as unknown) as HTMLInputElement);

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div
        className={cx("regex-input-container", {
          valid,
          invalid: !valid
        })}
        onClick={() => inputRef.current.focus()}
      >
        /
        <input
          autoFocus
          ref={inputRef}
          type="text"
          placeholder="[\w]+"
          style={{
            width: (userRegex.length > 0 ? userRegex.length : "5") + "ch"
          }}
          onChange={(event) => setUserRegex(event.target.value)}
        ></input>
        /{(flags.g ? "g" : "") + (flags.i ? "i" : "") + (flags.m ? "m" : "")}
      </div>
      <div className={cx("flags-container")}>
        Flags:
        <button
          className={cx(flags.g ? "active" : "inactive")}
          onClick={() => setFlags({ ...flags, g: !flags.g })}
        >
          g
        </button>
        <button
          className={cx(flags.i ? "active" : "inactive")}
          onClick={() => setFlags({ ...flags, i: !flags.i })}
        >
          i
        </button>
        <button
          className={cx(flags.m ? "active" : "inactive")}
          onClick={() => setFlags({ ...flags, m: !flags.m })}
        >
          m
        </button>
        <div className={cx("regex-input-valid")}>
          {valid ? "Valid " : "Invalid "} expression
        </div>
      </div>
    </form>
  );
}

export default RegexInput;
