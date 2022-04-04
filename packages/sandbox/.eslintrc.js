const { getWorkflowOverrides } = require("@nossbigg/eslint-workflows");

const makeConfig = () => {
  const workflowOverrides = getWorkflowOverrides();

  const config = {
    parserOptions: {
      ecmaVersion: 2016,
    },
    env: {
      node: true,
    },
    extends: ["eslint:recommended"],
    overrides: [...workflowOverrides],
  };
  return config;
};

module.exports = makeConfig();
