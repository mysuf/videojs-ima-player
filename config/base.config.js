import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/ima-plugin.js',
  output: {
    file: 'dist/videojs.ima.js',
    format: 'umd',
    globals: {
      'video.js': 'videojs',
    }
  },
  external: ['video.js', 'videojs-contrib-ads'],
  plugins: [
    json(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
