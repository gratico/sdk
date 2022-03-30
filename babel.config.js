module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '14.4.0',
        },
        modules: 'commonjs',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [],
}
