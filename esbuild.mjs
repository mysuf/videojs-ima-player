import * as esbuild from "esbuild";

/**
 * Maps packages that are expected to be loaded in the page globally
 * to their window properties, keeping them out of the bundle.
 */
const globalsPlugin = {
  name: "browser-globals",
  setup(build) {
    build.onResolve({ filter: /^video\.js$/ }, () => ({
      path: "video.js",
      namespace: "browser-globals",
    }));
    // videojs-contrib-ads is a side-effect loaded externally before this script
    build.onResolve({ filter: /^videojs-contrib-ads$/ }, () => ({
      path: "videojs-contrib-ads",
      namespace: "browser-globals",
    }));
    build.onLoad({ filter: /.*/, namespace: "browser-globals" }, (args) => ({
      contents:
        args.path === "video.js" ? "module.exports = window.videojs" : "",
    }));
  },
};

const base = {
  entryPoints: ["src/ima-plugin.js"],
  bundle: true,
  format: "iife",
  target: ["es2018"],
  plugins: [globalsPlugin],
};

await Promise.all([
  esbuild.build({
    ...base,
    outfile: "dist/videojs.ima.js",
  }),
  esbuild.build({
    ...base,
    outfile: "dist/videojs.ima.min.js",
    minify: true,
  }),
]);
