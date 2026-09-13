import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import sass from 'rollup-plugin-sass';
import commonjs from '@rollup/plugin-commonjs';

const config = [
  {
    input: 'themes/ippm/src/javascript/frontend.ts',
    output: {
      file: 'themes/ippm/build/frontend.js',
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      terser(),
      sass({ output: true })
    ],
    preserveEntrySignatures: false
  },
  {
    input: 'themes/ippm/src/javascript/admin.ts',
    output: {
      file: 'themes/ippm/build/admin.js',
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      terser(),
      sass({ output: true, }),
    ],
    preserveEntrySignatures: false
  },
  {
    input: 'plugins/interactive-posts-ippm/index.ts',
    output: {
      file: 'plugins/interactive-posts-ippm/build/interactiveposts.js',
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      terser(),
      sass({ output: true })
    ],
    preserveEntrySignatures: false
  },
];

export default config;
