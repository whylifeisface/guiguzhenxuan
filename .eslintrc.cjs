module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    //eslint(https://eslint.bootcss.com/doc/rules)
    "no-var": "error",
    "no-multiple-empty-lines": ["warn", { max: 1 }],
    "no-console": process.env.Node_ENV == "production" ? "error" : "off",
    "no-debugger": process.env.Node_ENV == "production" ? "error" : "off",
    "no-unexpected-multiline": "error",
    "no-useless-escape": "off",
    //typeScript(https://typescript-eslint.io/rules)
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/prefer-ts-expect-error": "error",
    "@typescript-eslint/no-expliciit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/semi": "off",
    //eslint-plugin-vue(https://eslint.vuejs.org/rules/)
    "vue/multi-word-component-names": "off",
    "vue/script-setup-uses-vars": "error",
    "vue/no-mutating-props": "off",
    "vue/attribiute-hyphenation": "off",
  },
};
