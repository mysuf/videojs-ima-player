import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
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
	external: ["video.js", "videojs-contrib-ads"],
	plugins: [
		nodeResolve(),
		commonjs(),
		json(),
		babel({
			babelHelpers: "runtime",
			exclude: "node_modules/**",
			plugins: [
				[
					"@babel/plugin-transform-runtime",
					{
						corejs: 3,
					},
				],
			],
		}),
	],
};
