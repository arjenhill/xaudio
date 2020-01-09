import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import { version } from '../package.json';

let banner = `
/*
 * XAudioJS
 * +++++++++ XAudioJS播放器 +++++++++
 * (c) 2011-2019 tnfe
 * https://github.com/halldwang/XAudioJS.git
 * version ${version}
 */
`;

let plugins = [
  resolve(),
  commonjs(),
  json(),
  babel({
    exclude: 'node_modules/**',
    extensions: ['.js']
  })
];

export default [
  {
    input: 'src/index.js',
    output: {
      banner,
      file: `dist/XAudioJS.min.js`,
      exports: 'named',
      format: 'umd',
      name: 'xAudio',
      sourcemap: true
    },
    plugins: plugins.concat([
      terser({
        output: {
          comments(node, comment) {
            if (comment.type === 'comment2') {
              return /xAudio.+v/i.test(comment.value);
            }
          }
        }
      })
    ])
  },
  {
    input: 'src/index.js',
    output: [
      {
        banner,
        exports: 'named',
        file: 'dist/XAudioJS.esm.js',
        format: 'esm'
      },
      {
        banner,
        file: `dist/XAudioJS.js`,
        exports: 'named',
        format: 'umd',
        name: 'XAudioJS',
        sourcemap: true
      }
    ],
    plugins
  }
];
