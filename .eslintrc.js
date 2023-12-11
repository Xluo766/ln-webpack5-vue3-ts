module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    "plugin:vue/base",
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-types": "off"
  }
};
