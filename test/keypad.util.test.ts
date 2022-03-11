// Utilities
import { calculateFlags, formatNumber, parseNumberSafe } from "../src/keypad/keypad.util";

// Types
import { IKeypadFlags } from "../src/keypad/keypad.types";

describe("calculateFlags", () => {
  const baseConfig: IKeypadFlags = {
    enteredDecimalDigits: 0,
    enteredWholeDigits: 0,
    hasDecimal: false,
    hasMaxDecimalDigits: false,
    hasMaxWholeDigits: false,
    hasValue: true,
  };

  it("calculates flags for empty value", () => {
    const input = ["0", "", null, undefined];

    const result = input.map((x: any) => calculateFlags(x));

    const expected: IKeypadFlags[] = input.map((x) => ({
      ...baseConfig,
      enteredWholeDigits: x?.length ?? 0,
      hasValue: false,
    }));
    expect(result).toStrictEqual(expected);
  });

  it("calculates basic flags properly", () => {
    const input = [
      {
        valueString: "123",
        flags: {
          enteredDecimalDigits: 0,
          enteredWholeDigits: 3,
          hasDecimal: false,
        },
      },
      {
        valueString: "12345.00",
        flags: {
          enteredDecimalDigits: 2,
          enteredWholeDigits: 5,
          hasDecimal: true,
        },
      },
    ];

    const result = input.map((x) => calculateFlags(x.valueString));

    const expected: IKeypadFlags[] = input.map((x) => ({
      ...baseConfig,
      ...x.flags,
    }));
    expect(result).toStrictEqual(expected);
  });

  it("calculates complex flags properly", () => {
    const maxDecimalDigits = 2;
    const maxWholeDigits = 5;
    const input = [
      {
        valueString: "123",
        flags: {
          enteredDecimalDigits: 0,
          enteredWholeDigits: 3,
          hasDecimal: false,
          hasMaxDecimalDigits: false,
          hasMaxWholeDigits: false,
        },
      },
      {
        valueString: "12345.00",
        flags: {
          enteredDecimalDigits: 2,
          enteredWholeDigits: 5,
          hasDecimal: true,
          hasMaxDecimalDigits: true,
          hasMaxWholeDigits: true,
        },
      },
    ];

    const result = input.map((x) =>
      calculateFlags(x.valueString, {
        maxDecimalDigits,
        maxWholeDigits,
      }),
    );

    const expected: IKeypadFlags[] = input.map((x) => ({
      ...baseConfig,
      ...x.flags,
    }));
    expect(result).toStrictEqual(expected);
  });
});

describe("formatNumber", () => {
  it("can parse multiple formats", () => {
    const input = [2, 2.0, 2.0, "2", "02", "2.0", "2.00", "2"];

    const result = input.map((number) => formatNumber(number, 2));

    const expected = input.map(() => "2.00");
    expect(result).toStrictEqual(expected);
  });

  it("can handle variable decimals output", () => {
    const input = [2, 2, 2, 2, 2, 2];

    const result = input.map((number, idx) => formatNumber(number, idx));

    const expected = ["2", "2.0", "2.00", "2.000", "2.0000", "2.00000"];
    expect(result).toStrictEqual(expected);
  });

  it("can ignore/include commas", () => {
    const input = [
      { commas: true, expected: "54,321.00", value: 54321 },
      { commas: false, expected: "54321.00", value: 54321 },
    ];

    const result = input.map((x) => formatNumber(x.value, 2, { commas: x.commas }));

    const expected = input.map((x) => x.expected);
    expect(result).toStrictEqual(expected);
  });

  it("treats empty / invalid values as zero", () => {
    const input: any[] = [false, null, undefined, NaN, ""];

    const result = input.map((number) => formatNumber(number));

    const expected = input.map(() => "0.00");
    expect(result).toStrictEqual(expected);
  });

  it("can customize default options", () => {
    const input: [string, any][] = [
      ["2.0", { style: "currency" }],
      ["2.0", { maximumFractionDigits: 5, minimumFractionDigits: 5 }],
    ];

    const result = input.map((test) => formatNumber(test[0], 2, test[1]));

    const expected = ["$2.00", "2.00000"];
    expect(result).toStrictEqual(expected);
  });
});

describe("parseNumberSafe", () => {
  it("can handle valid numbers", () => {
    const input = [
      { decimals: undefined, expected: 1.68, valueString: "1.683" },
      { decimals: 0, expected: -1, valueString: -1 },
      { decimals: 0, expected: -1, valueString: "-1" },
      { decimals: 0, expected: 3, valueString: "3" },
      { decimals: 0, expected: 3, valueString: 3 },
      { decimals: 2, expected: 2.35, valueString: "2.35" },
      { decimals: 2, expected: 2.35, valueString: 2.35 },
    ];

    const result = input.map((x) => parseNumberSafe(x.valueString, x.decimals));

    const expected = input.map((x) => [x.expected, true]);
    expect(result).toStrictEqual(expected);
  });

  it("does not round truncated decimals", () => {
    const input = [
      { decimals: 0, expected: 2, valueString: "2.6" },
      { decimals: 1, expected: 2.3, valueString: "2.358" },
      { decimals: 2, expected: 2.32, valueString: "2.328" },
    ];

    const result = input.map((x) => parseNumberSafe(x.valueString, x.decimals));

    const expected = input.map((x) => [x.expected, true]);
    expect(result).toStrictEqual(expected);
  });

  it("can handle invalid numbers", () => {
    const input = [null, undefined, NaN, Symbol(), "", "one", "e"];

    const result = input.map((x: any) => parseNumberSafe(x));

    const expected = input.map(() => [0, false]);
    expect(result).toStrictEqual(expected);
  });
});

/* eslint @typescript-eslint/no-explicit-any: off */
