module.exports = {
  singleQuote: true,
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: [
    '^vite',
    '^react',
    '^antd',
    '<THIRD_PARTY_MODULES>',
    'components/',
    'pages/',
    'hooks/',
    'utils/',
    '^[./]',
  ],
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderCaseInsensitive: true,
};
