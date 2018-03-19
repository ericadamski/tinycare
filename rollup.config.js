import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import json from "rollup-plugin-json";

export default {
  input: "src/index.js",
  output: {
    file: "index.js",
    format: "cjs",
    sourcemap: true
  },
  plugins: [
    resolve(),
    babel({
      babelrc: false,
      exclude: "node_modules/**",
      presets: [["env", { modules: false }], "flow"],
      plugins: ["external-helpers"]
    }),
    commonjs(),
    json(),
    uglify({
      sourceMap: true
    })
  ],
  external: ["twit"]
};
