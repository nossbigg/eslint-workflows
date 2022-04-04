const makeConfig = () => {
  const config = {
    parserOptions: {
      ecmaVersion: 2016,
    },
    env: {
      node: true,
    },
    extends: ["eslint:recommended"],
  };
  return config;
};

module.exports = makeConfig();
