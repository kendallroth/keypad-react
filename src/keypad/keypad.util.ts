import { IFlagCalculationConfig, IKeypadFlags } from "./keypad.types";

/** Safely parsed number (value and validity) */
type SafeParsedNumber = [value: number, valid: boolean];

/**
 * Calculate keypad value flags
 *
 * @param   value  - Keypad value string
 * @param   config - Calculation config
 * @returns Keypad value flags
 */
const calculateFlags = (value: string, config?: IFlagCalculationConfig): IKeypadFlags => {
  const inputParts = value.split(".");
  const hasValue = Boolean(value) && value !== "0";
  const enteredWholeDigits = inputParts[0]?.length ?? 0;
  const enteredDecimalDigits = inputParts[1]?.length ?? 0;

  return {
    enteredDecimalDigits,
    enteredWholeDigits,
    hasDecimal: value.includes("."),
    // hasMaxDecimalDigits: enteredDecimalDigits >= (config?.maxDecimalDigits ?? 0),
    hasMaxDecimalDigits: config?.maxDecimalDigits
      ? enteredDecimalDigits >= config.maxDecimalDigits
      : false,
    hasMaxWholeDigits: config?.maxWholeDigits ? enteredWholeDigits >= config.maxWholeDigits : false,
    hasValue,
  };
};

/**
 * Format a number
 *
 * Taken from: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
 *
 * @param   number   - Number to format
 * @param   decimals - Decimals places
 * @param   options  - 'toLocaleString' formatting options
 * @returns Formatted number
 */
const formatNumber = (number: string | number, decimals = 2, options = {}) => {
  // NOTE: Deliberately handle all undefined or invalid numbers as 0!
  number = number || 0;

  return parseFloat(`${number}`).toLocaleString("en-US", {
    style: "decimal",
    // NOTE: Currency is required even when not formatting as currency!
    currency: "USD",
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
    ...(options ?? {}),
  });
};

/**
 * Safely parse a numeric string
 *
 * NOTE: Will round the decimal places if necessary (when dropping places)!
 *
 * @param   input       - Numeric input string
 * @param   maxDecimals - Maximum decimal places
 * @returns Parsed number and validity
 */
const parseNumberSafe = (input: string | number, maxDecimals = 2): SafeParsedNumber => {
  try {
    const rawValue = parseFloat(`${input}`);
    const value = parseFloat(rawValue.toFixed(maxDecimals));
    return [value, true];
  } catch {
    return [0, false];
  }
};

export { calculateFlags, formatNumber, parseNumberSafe };
