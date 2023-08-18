module.exports = {
  root: true,
  env: {
    jest: true,
    "es2020": true,
    "node": true
  },
  extends: 'airbnb-base',
  plugins: ["@typescript-eslint", "import-helpers"],
  parser: "@typescript-eslint/parser",
  rules: {
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    camelcase: 0,
    "linebreak-style": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "import-helpers/order-imports": [
      "error",
      {
        "newlinesBetween": "always", // new line between groups
        "groups": ["module", ["parent", "sibling", "index"]],
        "alphabetize": { "order": "asc", "ignoreCase": true }
      }
    ]
  },
};