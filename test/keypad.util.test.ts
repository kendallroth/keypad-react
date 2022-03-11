// Utilities
import { formatNumber, parseNumberSafe } from "../src/keypad/keypad.util";

describe("formatNumber", () => {
  it("can parse multiple formats", () => {
    const input = [2, 2.0, 2.0, "2", "02", "2.0", "2.00", "2"];

    const result = input.map((number) => formatNumber(number, 2));

    const expected = input.map((x) => "2.00");
    expect(result).toEqual(expected);
  });

  it("can handle variable decimals output", () => {
    const input = [2, 2, 2, 2, 2, 2];

    const result = input.map((number, idx) => formatNumber(number, idx));

    const expected = ["2", "2.0", "2.00", "2.000", "2.0000", "2.00000"];
    expect(result).toEqual(expected);
  });

  it("treats empty / invalid values as zero", () => {
    const input: any[] = [false, null, undefined, NaN, ""];

    const result = input.map((number) => formatNumber(number));

    const expected = input.map((x) => "0.00");
    expect(result).toEqual(expected);
  });

  it("can customize default options", () => {
    const input: [string, any][] = [
      ["2.0", { style: "currency" }],
      ["2.0", { maximumFractionDigits: 5, minimumFractionDigits: 5 }],
    ];

    const result = input.map((test) => formatNumber(test[0], 2, test[1]));

    const expected = ["$2.00", "2.00000"];
    expect(result).toEqual(expected);
  });
});
