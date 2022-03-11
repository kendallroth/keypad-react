import React from "react";
import { formatNumber } from "@kendallroth/keypad-react";

// Utilities

type Props = {
  /**
   * Number of supported decimals
   *
   * NOTE: Passing 'true' will default to 2 decimals
   */
  decimals?: number | boolean;
  value: string | number;
  /** Reset keypad trigger */
  onReset?: () => void;
};

const KeypadDisplay = (props: Props) => {
  const { decimals: decimalsProp, value, onReset } = props;

  let decimals = 0;
  if (typeof decimalsProp === "number") {
    decimals = decimalsProp;
  } else if (typeof decimalsProp === "boolean") {
    decimals = 2;
  }

  const displayValue = formatNumber(value || "0", decimals);

  return (
    <div className="keypad-display">
      {displayValue}
      {Boolean(onReset) && (
        <button className="keypad-display__reset" onClick={onReset}>
          x
        </button>
      )}
    </div>
  );
};

export default KeypadDisplay;
