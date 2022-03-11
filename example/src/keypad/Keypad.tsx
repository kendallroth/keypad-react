import React, { forwardRef, useState } from "react";
import { IKeypadRef, useKeypad } from "@kendallroth/keypad-react";

// Components
import KeypadDisplay from "./KeypadDisplay";
import KeypadKeys from "./KeypadKeys";

// Styles
import "./Keypad.css";

type Props = {
  decimals?: number;
  disabled?: boolean;
  onChange: (value: number, valueString: string) => void;
};

const Keypad = forwardRef<IKeypadRef, Props>((props, ref) => {
  const { decimals = 0, disabled = false, onChange } = props;

  const [valueString, setValueString] = useState("");
  const hasValue = Boolean(valueString) && valueString !== "0";

  const maxDigits = 5;
  const maxValue = 99999;
  const { onKey, reset } = useKeypad({
    decimals,
    debug: true,
    maxDigits,
    maxValue,
    ref,
    onChange: (value, valueString) => {
      // Use the raw string locally for display purposes, and pass the
      //   parsed value to the parent.
      setValueString(valueString);
      onChange(value, valueString);
    }
  });

  return (
    <div className="keypad">
      <KeypadDisplay
        decimals
        value={valueString}
        onReset={hasValue ? reset : undefined}
      />
      <KeypadKeys
        decimalDisabled={valueString.indexOf(".") > 0}
        deleteDisabled={!hasValue}
        // TODO: Determine if disabling digits is worthwhile???
        disabled={disabled}
        onKey={onKey}
      />
    </div>
  );
});

export default Keypad;
