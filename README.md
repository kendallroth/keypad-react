# keypad-react

> React hook for managing keypad state (with decimal support).

- [Requirements](#requirements)
- [API](#api)
- [Development](#development)

## Requirements

Note that the Keypad formatting requires `Number.toLocaleString()`, which may not be available by default in all environments (React Native, etc)!

## API

### Hook Config

| Property                 | Type                                                              | Default | Description                                                        |
| ------------------------ | ----------------------------------------------------------------- | ------- | ------------------------------------------------------------------ |
| `debug?`                 | `boolean`                                                         | `false` | Whether debug mode is enabled                                      |
| `decimals?`              | `number`                                                          | `0`     | Number of supported decimal places                                 |
| `initialValue?`          | `string \| number`                                                | `0`     | Initial keypad value (will not update!)                            |
| `negative?`              | `boolean`                                                         | `false` | Whether negative numbers are supported                             |
| `maxDigits?`             | `number`                                                          |         | Maximum allowed whole digits                                       |
| `maxValue?`              | `number`                                                          |         | Maximum allowed value                                              |
| `ref?`                   | `Ref<IKeypadRef>`                                                 |         | Ref to provide access to limited Keypad functions/values           |
| `removeDecimalOnDelete?` | `boolean`                                                         | `false` | Whether decimal should be removed when deleting last decimal digit |
| `onChange?`              | `(value: string, valueString: string, flags: IKeypadFlags): void` |         | Change handler receiving                                           |

### Hook Data

| Property         | Type                              | Description                        |
| ---------------- | --------------------------------- | ---------------------------------- |
| `getValue`       | `(): number`                      | Get current keypad value (numeric) |
| `getValueString` | `(): string`                      | Get current keypad value (string)  |
| `reset`          | `(): void`                        | Reset the keypad value             |
| `setValue`       | `(value: string \| number): void` | Set the keypad value (manual)      |
| `onKey`          | `(key: Keys)`                     | Keypress handler                   |

### Hook Ref

The Keypad exposes a `ref` API to allow parent components to call the provided Keypad API (setting/resetting value, etc).

Note that the `ref` must be used with `forwardRef` on the component implementing the hook.

| Property         | Type                              | Description                        |
| ---------------- | --------------------------------- | ---------------------------------- |
| `getValue`       | `(): number`                      | Get current keypad value (numeric) |
| `getValueString` | `(): string`                      | Get current keypad value (string)  |
| `reset`          | `(): void`                        | Reset the keypad value             |
| `setValue`       | `(value: string \| number): void` | Set the keypad value (manual)      |

### Keypad Flags

Keypad flags can optionally be used to set keypad display options. For example, disabling decimal key when the keypad already has a decimal entered, etc.

| Property               | Type      | Description                                                   |
| ---------------------- | --------- | ------------------------------------------------------------- |
| `enteredDecimalDigits` | `number`  | Number of entered decimal digits                              |
| `enteredWholeDigits`   | `number`  | Number of entered whole digits                                |
| `hasDecimal`           | `boolean` | Whether keypad string has a decimal entered                   |
| `hasMaxDecimalDigits`  | `boolean` | Whether keypad has reached maximum decimal places             |
| `hasMaxWholeDigits`    | `boolean` | Whether keypad has reached maximum digits (whole number only) |
| `hasValue`             | `boolean` | Whether keypad has a value                                    |

## Development

```sh
# Build for production
npm run build

# Build in development (with watching/reloading)
npm run build:dev
```

The `example` project can be used to test while developing the `keypad-react` package. While the package has already been installed (as `file:..`), it will need to be linked (`npm link ..`) to properly receive updates while developing. Use `npm run build:dev` to run the bundling process with reloading enabled.

> **NOTE:** Occasionally modifying exported package types will apparently not be detected by Rollup, and will not be recompiled. Simply restarting the Rollup watch process is enough to fix this issue.

## Tests

Tests should be run during development and before publishing!

```sh
npm run test
```
