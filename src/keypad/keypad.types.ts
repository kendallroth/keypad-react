import { Ref } from "react";

export const keyStrings = ["1","2","3","4","5","6","7","8","9","0"] as const; // prettier-ignore
export const keyNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as const;
export type DigitStrings = typeof keyStrings[number];
export type DigitNumbers = typeof keyNumbers[number];
export type Digits = DigitStrings | DigitNumbers;
export type ExtraKeys = "delete" | "decimal";
export type Keys = Digits | ExtraKeys;

export type KeypadHookConfig = {
  /** Whether debug mode is enabled */
  debug?: boolean;
  /** Number of supported decimal places */
  decimals?: number;
  /** Initial keypad value (set on mount) */
  initialValue?: string | number;
  /**
   * Whether negative numbers are supported
   *
   * NOTE: Negative numbers are currently only possible when setting manually.
   */
  negative?: boolean;
  /**
   * Maximum allowed digits (ie. whole digits)
   *
   * NOTE: Either 'maxDigits' or 'maxValue' will apply (whichever is reached first)!
   */
  maxDigits?: number;
  /**
   * Maximum allowed value
   *
   * NOTE: Either 'maxDigits' or 'maxValue' will apply (whichever is reached first)!
   */
  maxValue?: number;
  /**
   * Ref to provide external access to limited Keypad functionality.
   *
   * Requires using with a 'forwardRef' on the component implementing the hook,
   *   and can allow parents to call the provided Keypad API (setting values, etc).
   */
  ref?: Ref<IKeypadRef>;
  /**
   * Change handler (parsed value and raw display string)
   *
   * @param value       - Parsed keypad value
   * @param valueString - Raw keypad string
   */
  onChange?: (value: number, valueString: string) => void;
};

/** Base Keypad API (shared with hook and ref) */
export interface IKeypadApiBase {
  /**
   * Retrieve the current value
   *
   * NOTE: Prefer using the change handler and storing state in parent!
   */
  getValue: () => number;
  /**
   * Retrieve the current value string
   *
   * NOTE: Intended for internal purposes only!
   */
  getValueString: () => string;
  /** Reset the keypad values */
  reset: () => void;
  /**
   * Set the keypad value
   *
   * @param value - Manual keypad value
   */
  setValue: (value: number) => void;
}

/** Keypad hook data */
export interface IKeypad extends IKeypadApiBase {
  /**
   * Keypress handler
   *
   * Updates string value and parses number for change handler.
   *
   * @param key - Selected key
   */
  onKey: (key: Keys) => void;
}

/**
 * Keypad ref properties (API)
 *
 * Custom ref is necessary to provide external/parent access to keypad,
 *   whether for purposes of manually setting values, resetting, etc.
 * Custom refs may be defined in the component where 'useKeypad' is used,
 *   utilizing the 'useImperativeHandle' React hook to provide an API.
 */
export type IKeypadRef = IKeypadApiBase;
