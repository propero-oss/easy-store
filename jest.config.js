/* eslint-disable @typescript-eslint/no-var-requires */
const tsconfig = require("./tsconfig.json");
const { paths } = tsconfig.compilerOptions;

const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const keyToRegexp = (key) => `^${escapeRegExp(key).replace("\\*", "(.*)")}$`;
const valueToPathMatcher = ([value]) => value.replace("*", "$1").replace("./", "<rootDir>/");
const entryMapper = ([key, value]) => [keyToRegexp(key), valueToPathMatcher(value)];
const moduleNameMapper = Object.fromEntries(Object.entries(paths).map(entryMapper));

module.exports = {
  preset: "jest-preset-typescript",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"],
  coverageReporters: ["lcovonly"],
  moduleNameMapper,
};
