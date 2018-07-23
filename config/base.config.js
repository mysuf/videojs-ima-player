import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

export default {
  name: 'videojsIma',
  input: 'src/ima-plugin.js',
  output: {
    file: 'dist/videojs.ima.js',
    format: 'umd',
  },
  external: ['video.js', 'videojs-contrib-ads'],
  globals: {
    'video.js': 'videojs',
  },
  plugins: [
    json(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
