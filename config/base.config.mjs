import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/ima-plugin.js",
  output: {
    file: "dist/videojs.ima.js",
    format: "umd",
    globals: {
      "video.js": "videojs",
    },
  },
  watch: {
    exclude: ["node_modules/**"],
  },
  external: ["video.js", "videojs-contrib-ads"],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    babel({
      babelHelpers: "runtime",
      exclude: "node_modules/**",
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          {
            absoluteRuntime: false,
            corejs: 3,
            helpers: true,
            regenerator: true,
            useESModules: true,
          },
        ],
      ],
    }),
  ],
};
