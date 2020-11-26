/* eslint-disable no-undef */
module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env', {
        targets: { chrome: '55' },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    ['import', { 'libraryName': 'antd-mobile', 'style': 'css' }],
  ],
};
