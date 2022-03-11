import { useImperativeHandle, useState } from "react";

// Utilities
import { calculateFlags, parseNumberSafe } from "./keypad.util";

// Types
import { DigitStrings, IKeypad, keyStrings, KeypadHookConfig, KeypadKeys } from "./keypad.types";

/**
 * Re-usable Keypad logic that tracks state internally, while allowing
 *   limited external manipulation.
 *
 * @param config - Hook configuration
 */
const useKeypad = (config: KeypadHookConfig): IKeypad => {
  const {
    debug: debugProp = false,
    decimals = 0,
    negative = false,
    initialValue = "0",
    maxDigits,
    maxValue,
    ref,
    removeDecimalOnDelete = false,
    onChange: onChangeProp,
  } = config;

  const [valueString, setValueString] = useState(`${initialValue}`);

  const supportsDecimals = decimals > 0;
  // eslint-disable-next-line @typescript-eslint/no-empty-function, no-console
  const debug = debugProp ? console.debug : () => {};

  /**
   * Shared change handler to parse values and notify listeners.
   *
   * NOTE: Supports both internal and external changes!
   *
   * @param input - Input value string
   */
  const onChange = (input: string) => {
    const [value, valid] = parseNumberSafe(input);
    // Invalid parsed numbers should simply be ignored (will not update any values)
    if (!valid) {
      debug("Error parsing value", input);
      return;
    }

    if (!negative && value < 0) return;
    if (maxValue && value > maxValue) return;

    // Maximum digit calculations must ignore decimals places!
    if (maxDigits) {
      if (supportsDecimals && input.includes(".")) {
        if (input.split(".")[0].length > maxDigits) return;
      } else {
        if (`${value}`.length > maxDigits) return;
      }
    }

    debug("Value updated", value, input);

    const flags = calculateFlags(input, {
      maxDecimalDigits: decimals,
      maxWholeDigits: maxDigits,
    });

    setValueString(input);
    onChangeProp?.(value, input, flags);
  };

  /**
   * Keypress handler
   *
   * Updates string value and parses number for change handler.
   *
   * @param key - Key value
   */
  const onKey = (key: KeypadKeys) => {
    debug("Key pressed", key);
    debug("Existing value", valueString);

    let newValueString = valueString ?? "0";
    const keyString = key.toString();
    const valueHasDecimal = newValueString.includes(".");
    const existingDecimalPlaces = valueHasDecimal ? newValueString.split(".")[1].length : 0;

    if (key === "delete") {
      // Removing the last character should set value to zero
      newValueString = newValueString.length <= 1 ? "0" : newValueString.slice(0, -1);

      // Optionally remove the decimal if removing the last decimal place digit (uncommon)
      if (removeDecimalOnDelete && newValueString.slice(-1) === ".") {
        newValueString = newValueString.slice(0, -1);
      }
    } else if (key === "decimal" && supportsDecimals) {
      // Numbers can only have a single decimal
      if (valueHasDecimal) return;

      newValueString += ".";
    } else if (keyStrings.includes(keyString as DigitStrings)) {
      // Decimal values have a limited number of decimal places
      if (valueHasDecimal && existingDecimalPlaces >= decimals) return;

      newValueString = newValueString !== "0" ? newValueString + keyString : keyString;
    } else {
      // Invalid keys should be ignored
      return;
    }

    onChange(newValueString);
  };

  /** Retrieve parsed value */
  const getValue = (): number => {
    // TODO: Determine if handling invalid number is required???
    const [value] = parseNumberSafe(valueString);
    return value;
  };

  /** Retrieve internal value string */
  const getValueString = (): string => {
    return valueString;
  };

  /**
   * Manually set/update value
   *
   * @param value - New value
   */
  const setValue = (value: number) => {
    // Ensure value is valid and meets maximum decimal places
    const [_value, valid] = parseNumberSafe(value, decimals);
    if (!valid) return;

    const _valueString = `${_value}`;
    onChange(_valueString);

    debug("Setting value manually", value);
  };

  /** Reset keypad value/state */
  const resetValue = () => {
    onChange("0");

    debug("Resetting value");
  };

  // Provide a limited API for accessing the Keypad from parents of the
  //   component that implements the Keypad hook.
  useImperativeHandle(ref, () => ({
    getValue,
    getValueString,
    setValue,
    reset: resetValue,
  }));

  return {
    getValue,
    getValueString,
    reset: resetValue,
    setValue,
    onKey,
  };
};

export default useKeypad;
