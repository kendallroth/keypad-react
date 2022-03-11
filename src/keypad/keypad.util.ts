type ParsedNumber = [value: number, valid: boolean];

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
 * @param   input       - Numeric input string
 * @param   maxDecimals - Maximum decimal places
 * @returns Parsed number and validity
 */
const parseNumberSafe = (input: string | number, maxDecimals = 2): ParsedNumber => {
  try {
    const rawValue = parseFloat(`${input}`);
    const value = parseFloat(rawValue.toFixed(maxDecimals));
    return [value, true];
  } catch {
    return [0, false];
  }
};

export { formatNumber, parseNumberSafe };
