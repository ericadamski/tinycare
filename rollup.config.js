import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";

export default {
  input: "src/index.js",
  output: {
    file: "index.js",
    format: "cjs",
    sourcemap: true
  },
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: "node_modules"
      }
    }),
    babel({
      exclude: "node_modules/**",
      plugins: ["external-helpers"]
    }),
    commonjs({
      namedExports: {
        rxjs: ["Observable"]
      }
    }),
    uglify({
      sourceMap: true
    })
  ]
};
