# keypad-react

> React hook for managing keypad state (with decimal support).

- [Requirements](#requirements)
- [API](#api)
- [Development](#development)

## Requirements

Note that the Keypad formatting requires `Number.toLocaleString()`, which may not be available by default in all environments (React Native, etc)!

## API

### Hook Config

| Property        | Type                                         | Default | Description |
| --------------- | -------------------------------------------- | ------- | ----------- |
| `debug?`        | `boolean`                                    | `false` | TODO        |
| `decimals?`     | `number`                                     | `0`     | TODO        |
| `initialValue?` | `string \| number`                           | `0`     | TODO        |
| `negative?`     | `boolean`                                    | `false` | TODO        |
| `maxDigits?`    | `number`                                     |         | TODO        |
| `maxValue?`     | `number`                                     |         | TODO        |
| `ref?`          | `Ref<IKeypadRef>`                            |         | TODO        |
| `onChange?`     | `(value: string, valueString: string): void` |         | TODO        |

### Hook Response

| Property         | Type                              | Description |
| ---------------- | --------------------------------- | ----------- |
| `getValue`       | `(): number`                      | TODO        |
| `getValueString` | `(): string`                      | TODO        |
| `reset`          | `(): void`                        | TODO        |
| `setValue`       | `(value: string \| number): void` | TODO        |
| `onKey`          | `(key: Keys)`                     | TODO        |

### Hook Ref

| Property         | Type                              | Description |
| ---------------- | --------------------------------- | ----------- |
| `getValue`       | `(): number`                      | TODO        |
| `getValueString` | `(): string`                      | TODO        |
| `reset`          | `(): void`                        | TODO        |
| `setValue`       | `(value: string \| number): void` | TODO        |

## Development

```sh
# Build for production
npm run build

# Build in development (with watching/reloading)
npm run build:dev
```

## Tests

Tests should be run during development and before publishing!

```sh
npm run test
```
