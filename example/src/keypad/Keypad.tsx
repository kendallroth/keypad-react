import React, { forwardRef, useState } from "react";
import { IKeypadFlags, IKeypadRef, useKeypad } from "@kendallroth/keypad-react";

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
  const [flags, setFlags] = useState<IKeypadFlags | null>(null);

  const maxDigits = 5;
  const maxValue = 99999;
  const { onKey, reset } = useKeypad({
    decimals,
    debug: true,
    negative: true,
    maxDigits,
    maxValue,
    ref,
    onChange: (value, valueString, flags) => {
      // Use the raw string locally for display purposes, and pass the
      //   parsed value to the parent.
      setValueString(valueString);
      onChange(value, valueString);
      setFlags(flags);
    }
  });

  return (
    <div className="keypad">
      <KeypadDisplay
        decimals={decimals}
        value={valueString}
        onReset={flags?.hasValue ? reset : undefined}
      />
      <KeypadKeys
        decimalDisabled={!decimals || flags?.hasDecimal}
        deleteDisabled={!flags?.hasValue}
        digitsDisabled={(!flags?.hasDecimal && flags?.hasMaxWholeDigits) || flags?.hasMaxDecimalDigits}
        disabled={disabled}
        onKey={onKey}
      />
    </div>
  );
});

export default Keypad;
