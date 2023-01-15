import sourcemaps from "rollup-plugin-sourcemaps";
import commonjs from "@rollup/plugin-commonjs";
import ts from "rollup-plugin-ts";
import paths from "rollup-plugin-ts-paths";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json" assert { type: "json" };

const { main, dependencies, module, unpkg } = pkg;
const yearRange = (date) =>
  new Date().getFullYear() === +date ? date : `${date} - ${new Date().getFullYear()}`;
const year = yearRange(pkg.since || new Date().getFullYear());
const external = Object.keys(dependencies || {});
/* eslint-disable */
const banner = `
/**
 * ${pkg.name}
 * ${pkg.description}
 * ${pkg.homepage}
 * (c) ${yearRange(pkg.since)} ${pkg.author}
 * @license ${pkg.license}
 */
/* eslint-disable */`;
/* eslint-enable */

const outputs = [
  { format: "cjs", file: main },
  { format: "esm", file: module },
].filter((it) => it);

export default {
  input: "src/index.ts",
  output: outputs.map(({ format, file }) => ({
    exports: "named",
    sourcemap: true,
    file,
    format,
    banner,
  })),
  external,
  watch: {
    include: ["src/**/*", "example/**/*"],
  },
  plugins: [
    sourcemaps(),
    paths(),
    commonjs(),
    nodeResolve(),
    json({ compact: true }),
    ts({ tsconfig: "tsconfig.build.json" }),
    terser({
      output: { comments: (node, comment) => /@preserve|@license|@cc_on/i.test(comment.value) },
    }),
  ],
};
