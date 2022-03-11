# Keypad Demo

> Demo project for `keypad-react` NPM package.

Sample project demonstrating use cases for the `useKeypad` hook. While contrived, the demo seeks to illustrate as many possible use cases as possible.

## Development

```sh
# Run project in development
npm start

# Run tests
npm test
```

## Caveats

Due to how NPM manages peer dependencies, the peer dependency for `react` in the `keypad-react` library will cause version "conflicts." These conflicts can be avoided by simply "linking" the local `react` version to the parent project's `node_modules` (already handled in `package.json`).
