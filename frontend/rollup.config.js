import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/render.ts',
  output: {
    dir: 'dist',
    format: 'es'
  },
  plugins: [typescript({ module: "ES2015"})]
};
