import { type Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import tsconfig from "./tsconfig.node.json";
export default async (): Promise<Config> => {
  return {
    preset: "ts-jest",
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"],
    coverageReporters: ["lcovonly"],
    verbose: true,
    moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
      prefix: "<rootDir>/",
    }),
  };
};
