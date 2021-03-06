import { IFlagCalculationConfig, IFormatNumberOptions, IKeypadFlags } from "./keypad.types";

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
  const inputParts = value?.split(".") ?? [];
  const hasValue = Boolean(value) && value !== "0";
  const enteredWholeDigits = inputParts[0]?.length ?? 0;
  const enteredDecimalDigits = inputParts[1]?.length ?? 0;

  return {
    enteredDecimalDigits,
    enteredWholeDigits,
    hasDecimal: inputParts.length > 1,
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
const formatNumber = (
  number: string | number,
  decimals = 2,
  options: IFormatNumberOptions = {},
) => {
  // NOTE: Deliberately handle all undefined or invalid numbers as 0!
  number = number || 0;

  const { commas = false, ...localeOptions } = options;

  const localeString = parseFloat(`${number}`).toLocaleString("en-US", {
    style: "decimal",
    // NOTE: Currency is required even when not formatting as currency!
    currency: "USD",
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
    ...localeOptions,
  });

  return commas ? localeString : localeString.replace(/,/g, "");
};

/**
 * Safely parse a numeric string
 *
 * @param   input       - Numeric input string
 * @param   maxDecimals - Maximum decimal places
 * @returns Parsed number and validity
 */
const parseNumberSafe = (input: string | number, maxDecimals = 2): SafeParsedNumber => {
  try {
    if (!input || isNaN(Number(input))) return [0, false];

    let stringValue = `${input}`;
    // NOTE: Cannot use 'toFixed()' as this rounds decimals if necessary (undesired)!
    const decimalIndex = stringValue.indexOf(".");
    if (decimalIndex >= 0) {
      stringValue = stringValue.slice(0, decimalIndex + maxDecimals + 1);
    }

    const value = parseFloat(stringValue);
    return [value, true];
  } catch {
    return [0, false];
  }
};

export { calculateFlags, formatNumber, parseNumberSafe };
