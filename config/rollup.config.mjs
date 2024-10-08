import config from "./base.config.mjs";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";

config.plugins.unshift(
	postcss({
		extract: true,
		plugins: [autoprefixer()],
	})
);
export default config;
