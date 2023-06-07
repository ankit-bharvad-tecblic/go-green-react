module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": ["error"],
    "react/prop-types": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "react/jsx-props-no-spreading": "off",
    // "no-default-export": true,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx"],
        moduleDirectory: ["src", "node_modules"],
      },
    },
  },
};
