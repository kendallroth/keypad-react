import React from "react";
import { Digits, ExtraKeys, Keys } from "@kendallroth/keypad-react";

// Components
import KeypadDigit from "./KeypadDigit";

type Props = {
  /** Whether decimal key is disabled */
  decimalDisabled?: boolean;
  /** Whether delete key is disabled */
  deleteDisabled?: boolean;
  /** Whether digit keys are disabled */
  digitsDisabled?: boolean;
  /** Whether keypad is disabled */
  disabled?: boolean;
  /** Keypress handler */
  onKey: (digit: Keys) => void;
};

const digitKeys = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

interface IExtraKeys {
  type: ExtraKeys | "0";
  value: string;
}

const extraKeys: IExtraKeys[] = [
  { type: "decimal", value: "•" },
  { type: "0", value: "0" },
  { type: "delete", value: "⌫" }
];

const KeypadKeys = (props: Props) => {
  const {
    decimalDisabled = false,
    deleteDisabled = false,
    digitsDisabled = false,
    disabled = false,
    onKey
  } = props;

  return (
    <div className="keypad-keys">
      {digitKeys.map((row, rowIdx) => (
        <div key={rowIdx} className="keypad-keys__row">
          {row.map((digit) => (
            <KeypadDigit
              key={digit}
              disabled={disabled || digitsDisabled}
              label={digit}
              onPress={() => onKey(digit as Digits)}
            />
          ))}
        </div>
      ))}
      <div className="keypad-keys__row">
        {extraKeys.map((key) => {
          let keyDisabled = false;
          if (key.type === "decimal" && decimalDisabled) {
            keyDisabled = true;
          } else if (key.type === "delete" && deleteDisabled) {
            keyDisabled = true;
          } else if (key.type === "0" && digitsDisabled) {
            keyDisabled = true;
          }

          return (
            <KeypadDigit
              key={key.type}
              disabled={disabled || keyDisabled}
              label={key.value}
              onPress={() => onKey(key.type)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default KeypadKeys;
