module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./config/tsconfig.eslint.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended", "prettier"],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    "no-console": "warn",
    "prefer-const": "warn",
    "prettier/prettier": "warn",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    // Let me shoot myself in the foot if I want to!
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": "warn",
  },
};
