import React, { ChangeEvent, useRef, useState } from "react";
import { IKeypadRef, parseNumberSafe } from "@kendallroth/keypad-react";

// Components
import { Keypad } from "../keypad";

// Styles
import "./App.css";

export default function App() {
  /** Keypad value is tracked for local display (but managed by keypad) */
  const [keypadValue, setKeypadValue] = useState({
    value: 0,
    valueString: "0"
  });
  /** Enable manually setting a keypad value (externally via ref) */
  const [inputValue, setInputValue] = useState("");

  const keypadRef = useRef<IKeypadRef>(null);

  /** Change handler for manual input field */
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /** Change handler for keypad */
  const onKeypadChange = (value: number, valueString: string) => {
    setKeypadValue({ value, valueString });
  };

  /** Reset keypad */
  const onReset = () => {
    keypadRef.current?.reset();
  };

  /** Update keypad value manually */
  const onUpdateValue = () => {
    const [value, valid] = parseNumberSafe(inputValue);
    if (valid) {
      keypadRef.current?.setValue(value);
    }

    setInputValue("");
  };

  return (
    <div className="app">
      <div className="app-content">
        <Keypad ref={keypadRef} decimals={2} onChange={onKeypadChange} />
      </div>
      <div className="app-actions">
        <div className="app-actions__values">
          <div className="app-actions__value">{keypadValue.value}</div>
          <div className="app-actions__value">{keypadValue.valueString}</div>
        </div>
        <input
          className="input"
          placeholder="Value"
          type="number"
          value={inputValue}
          onChange={onInputChange}
        />
        <button
          className="button"
          disabled={!inputValue}
          type="button"
          onClick={onUpdateValue}
        >
          Update
        </button>
        <button className="button" type="button" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
}