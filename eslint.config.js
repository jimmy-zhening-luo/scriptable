// v4.0.0
import js from "@eslint/js";
import tsLint from "@typescript-eslint/eslint-plugin";
import tsLintParser from "@typescript-eslint/parser";
import stylistic from "@stylistic/eslint-plugin";

/* ESLint rule severity levels */
// const warn = "warn";
const error = "error";
const off = "off";

/* ESLint rule options */
const always = "always";
const never = "never";
const any = "any";

/* ESLint config options */
const files = {
  ts: ["src/**/*.ts"],
  js: ["eslint.config.js"],
};

const baseProcessorConfig = {
  linterOptions: {
    noInlineConfig: true,
    reportUnusedDisableDirectives: true,
  },
  plugins: {
    "@eslint/js": js,
    "@typescript-eslint": tsLint,
    "@stylistic": stylistic,
  },
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    parser: tsLintParser,
    parserOptions: {
      ecmaVersion: "es2022",
      sourceType: "module",
      project: true,
    },
  },
};

const configOptions = {
  ts: {
    ...baseProcessorConfig,
    files: files.ts,
  },
  js: {
    ...baseProcessorConfig,
    files: files.js,
  },
};

/* ESLint rules */
const esLintTypeScriptCustomRules = {
  "@typescript-eslint/adjacent-overload-signatures": error,
  "@typescript-eslint/await-thenable": error,
  "@typescript-eslint/ban-ts-comment": error,
  "@typescript-eslint/ban-types": error,
  "@typescript-eslint/consistent-generic-constructors": [
    error,
    "type-annotation",
  ],
  "@typescript-eslint/consistent-type-assertions": [
    error,
    {
      assertionStyle: "as",
      objectLiteralTypeAssertions: never,
    },
  ],
  "@typescript-eslint/explicit-function-return-type": error,
  "@typescript-eslint/no-base-to-string": error,
  "@typescript-eslint/no-confusing-non-null-assertion": error,
  "@typescript-eslint/no-confusing-void-expression": error,
  "@typescript-eslint/no-duplicate-enum-values": error,
  "@typescript-eslint/no-dynamic-delete": error,
  "@typescript-eslint/no-empty-interface": error,
  "@typescript-eslint/no-extra-non-null-assertion": error,
  "@typescript-eslint/no-for-in-array": error,
  "@typescript-eslint/no-invalid-void-type": error,
  "@typescript-eslint/no-meaningless-void-operator": error,
  "@typescript-eslint/no-misused-new": error,
  "@typescript-eslint/no-mixed-enums": error,
  "@typescript-eslint/no-non-null-asserted-nullish-coalescing": error,
  "@typescript-eslint/no-non-null-asserted-optional-chain": error,
  "@typescript-eslint/no-require-imports": error,
  "@typescript-eslint/no-this-alias": error,
  "@typescript-eslint/no-unnecessary-boolean-literal-compare": error,
  "@typescript-eslint/no-unnecessary-condition": error,
  "@typescript-eslint/no-unnecessary-qualifier": error,
  "@typescript-eslint/no-unnecessary-type-arguments": error,
  "@typescript-eslint/no-unnecessary-type-assertion": error,
  "@typescript-eslint/no-unnecessary-type-constraint": error,
  "@typescript-eslint/no-unsafe-argument": error,
  "@typescript-eslint/no-unsafe-assignment": error,
  "@typescript-eslint/no-unsafe-call": error,
  "@typescript-eslint/no-unsafe-declaration-merging": error,
  "@typescript-eslint/no-unsafe-enum-comparison": error,
  "@typescript-eslint/no-unsafe-member-access": error,
  "@typescript-eslint/no-unsafe-return": error,
  "@typescript-eslint/no-useless-empty-export": error,
  "@typescript-eslint/no-var-requires": error,
  "@typescript-eslint/non-nullable-type-assertion-style": error,
  "@typescript-eslint/prefer-as-const": error,
  "@typescript-eslint/prefer-for-of": error,
  "@typescript-eslint/prefer-function-type": error,
  "@typescript-eslint/prefer-includes": error,
  "@typescript-eslint/prefer-literal-enum-member": error,
  "@typescript-eslint/prefer-namespace-keyword": error,
  "@typescript-eslint/prefer-readonly": error,
  "@typescript-eslint/prefer-reduce-type-parameter": error,
  "@typescript-eslint/prefer-regexp-exec": error,
  "@typescript-eslint/prefer-return-this-type": error,
  "@typescript-eslint/prefer-string-starts-ends-with": error,
  "@typescript-eslint/prefer-ts-expect-error": error,
  "@typescript-eslint/promise-function-async": error,
  "@typescript-eslint/require-array-sort-compare": error,
  "@typescript-eslint/restrict-plus-operands": error,
  "@typescript-eslint/strict-boolean-expressions": error,
  "@typescript-eslint/switch-exhaustiveness-check": error,
  "@typescript-eslint/unified-signatures": error,

  /** Enable @typescript-eslint *extension* rules and simultaneously disable corresponding ESLint (base) rule:
   * Reference (@typescript-eslint extension rules): https://typescript-eslint.io/rules/?=extension#rules
  */
  "no-array-constructor": off,
  "@typescript-eslint/no-array-constructor": error,
  "no-implied-eval": off,
  "@typescript-eslint/no-implied-eval": error,
  "no-loop-func": off,
  "@typescript-eslint/no-loop-func": error,
  "no-loss-of-precision": off,
  "@typescript-eslint/no-loss-of-precision": error,
  "no-throw-literal": off,
  "@typescript-eslint/no-throw-literal": error,
  "no-unused-expressions": off,
  "@typescript-eslint/no-unused-expressions": [
    error,
    {
      allowShortCircuit: true,
      allowTernary: true,
    },
  ],
  "no-unused-vars": off,
  "@typescript-eslint/no-unused-vars": error,
  "no-useless-constructor": off,
  "@typescript-eslint/no-useless-constructor": error,
  "require-await": off,
  "@typescript-eslint/require-await": error,
};

const jsOnlyStylisticCustomRules
= {
  // JavaScript rules
  "@stylistic/array-bracket-newline": [
    error,
    {
      multiline: true,
      minItems: 2,
    },
  ],
  "@stylistic/array-bracket-spacing": [
    error,
    always,
    {
      singleValue: false,
      objectsInArrays: false,
      arraysInArrays: false,
    },
  ],
  "@stylistic/array-element-newline": [
    error,
    {
      ArrayExpression: {
        multiline: true,
        minItems: 2,
      },

      ArrayPattern: {
        multiline: true,
        minItems: 2,
      },
    },
  ],
  "@stylistic/arrow-parens": [
    error,
    "as-needed",
  ],
  "@stylistic/arrow-spacing": error,
  "@stylistic/block-spacing": error,
  "@stylistic/brace-style": [
    error,
    "stroustrup",
    {
      allowSingleLine: true,
    },
  ],
  "@stylistic/comma-dangle": [
    error,
    "always-multiline",
  ],
  "@stylistic/comma-spacing": error,
  "@stylistic/comma-style": [
    error,
    "last",
    {
      exceptions: {},
    },
  ],
  "@stylistic/computed-property-spacing": [
    error,
    never,
    {
      enforceForClassMembers: true,
    },
  ],
  "@stylistic/dot-location": [
    error,
    "property",
  ],
  "@stylistic/eol-last": error,
  "@stylistic/function-call-argument-newline": [
    error,
    "consistent",
  ],
  "@stylistic/function-call-spacing": error,
  "@stylistic/function-paren-newline": [
    error,
    "multiline-arguments",
  ],
  "@stylistic/generator-star-spacing": [
    error,
    {
      before: true,
      after: false,
    },
  ],
  // https://eslint.style/rules/default/indent
  "@stylistic/indent": [
    error,
    2,
    {
      flatTernaryExpressions: false,
      offsetTernaryExpressions: true,
    },
  ],
  "@stylistic/key-spacing": [
    error,
    {
      beforeColon: false,
      afterColon: true,
      mode: "strict",
    },
  ],
  "@stylistic/keyword-spacing": [
    error,
    {
      before: true,
      after: true,
      overrides: {},
    },
  ],
  "@stylistic/lines-around-comment": [
    error,
    {
      beforeBlockComment: true,
      afterBlockComment: false,
      beforeLineComment: false,
      afterLineComment: false,
      allowBlockStart: true,
      allowBlockEnd: true,
      allowObjectStart: true,
      allowObjectEnd: true,
      allowArrayStart: true,
      allowArrayEnd: true,
      allowClassStart: true,
      allowClassEnd: true,
      applyDefaultIgnorePatterns: true,
    },
  ],
  "@stylistic/lines-between-class-members": [
    error,
    {
      enforce: [
        {
          blankLine: never,
          prev: "field",
          next: "field",
        },
        {
          blankLine: always,
          prev: "field",
          next: "method",
        },
        {
          blankLine: always,
          prev: "method",
          next: "*",
        },
      ],
    },
    {
      exceptAfterSingleLine: false,
    },
  ],
  "@stylistic/max-len": [
    error,
    {
      code: 80,
      tabWidth: 2,
      ignoreComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,

    },
  ],
  "@stylistic/max-statements-per-line": [
    error,
    {
      max: 1,
    },
  ],
  "@stylistic/multiline-ternary": [
    error,
    "always-multiline",
  ],
  "@stylistic/new-parens": [
    error,
    always,
  ],
  "@stylistic/newline-per-chained-call": [
    error,
    {
      ignoreChainWithDepth: 1,
    },
  ],
  "@stylistic/no-extra-parens": error,
  "@stylistic/no-extra-semi": error,
  "@stylistic/no-floating-decimal": error,
  "@stylistic/no-mixed-spaces-and-tabs": error,
  "@stylistic/no-multi-spaces": error,
  "@stylistic/no-multiple-empty-lines": [
    error,
    {
      max: 1,
      maxEOF: 1,
      maxBOF: 0,
    },
  ],
  "@stylistic/no-trailing-spaces": [
    error,
    {
      skipBlankLines: false,
      ignoreComments: false,
    },
  ],
  "@stylistic/no-whitespace-before-property": error,
  "@stylistic/nonblock-statement-body-position": [
    error,
    "any",
  ],
  "@stylistic/object-curly-newline": [
    error,
    {
      ObjectExpression: {
        multiline: true,
        minProperties: 2,
        consistent: true,
      },
      ObjectPattern: {
        multiline: true,
        minProperties: 3,
        consistent: true,
      },
      ImportDeclaration: {
        multiline: true,
        minProperties: 3,
        consistent: true,
      },
      ExportDeclaration: {
        multiline: true,
        minProperties: 3,
        consistent: true,
      },
    },
  ],
  "@stylistic/object-curly-spacing": [
    error,
    always,
    {
      arraysInObjects: false,
      objectsInObjects: true,
    },
  ],
  "@stylistic/object-property-newline": [
    error,
    {
      allowAllPropertiesOnSameLine: false,
    },
  ],
  "@stylistic/operator-linebreak": [
    error,
    "before",
  ],
  "@stylistic/padded-blocks": [
    error,
    never,
    {
      allowSingleLineBlocks: true,
    },
  ],
  // https://eslint.style/rules/default/padding-line-between-statements
  "@stylistic/padding-line-between-statements": [
    error,
    {
      blankLine: always,
      prev: [
        "class",
        "for",
        "while",
        "try",
        "block",
      ],
      next: "*",
    },
    {
      blankLine: always,
      prev: "*",
      next: [
        "return",
        "break",
        "continue",
      ],
    },
    {
      blankLine: always,
      prev: [
        "const",
        "let",
        "var",
      ],
      next: "*",
    },
    {
      blankLine: any,
      prev: [
        "const",
        "let",
        "var",
      ],
      next: [
        "const",
        "let",
        "var",
      ],
    },
    {
      blankLine: always,
      prev: ["import"],
      next: "*",
    },
    {
      blankLine: any,
      prev: ["import"],
      next: ["import"],
    },
    {
      blankLine: always,
      prev: "*",
      next: ["export"],
    },
    {
      blankLine: any,
      prev: ["export"],
      next: ["export"],
    },
    {
      blankLine: always,
      prev: "directive",
      next: "*",
    },
    {
      blankLine: any,
      prev: "directive",
      next: "directive",
    },
  ],
  "@stylistic/quote-props": [
    error,
    "as-needed",
    {
      keywords: true,
      unnecessary: true,
      numbers: false,
    },
  ],
  "@stylistic/quotes": [
    error,
    "double",
    {
      avoidEscape: true,
      allowTemplateLiterals: true,
    },
  ],
  "@stylistic/rest-spread-spacing": [
    error,
    never,
  ],
  "@stylistic/semi": [
    error,
    always,
    {
      omitLastInOneLineBlock: false,
      omitLastInOneLineClassBody: false,
    },
  ],
  "@stylistic/semi-spacing": error,
  "@stylistic/semi-style": error,
  "@stylistic/space-before-blocks": error,
  "@stylistic/space-before-function-paren": [
    error,
    {
      anonymous: always,
      named: never,
      asyncArrow: always,
    },
  ],
  "@stylistic/space-in-parens": error,
  "@stylistic/space-infix-ops": [
    error,
    {
      int32Hint: true,
    },
  ],
  "@stylistic/space-unary-ops": [
    error,
    {
      words: true,
      nonwords: false,
      overrides: {},
    },
  ],
  "@stylistic/spaced-comment": [
    error,
    always,
  ],
  "@stylistic/switch-colon-spacing": error,
  "@stylistic/template-tag-spacing": [
    error,
    always,
  ],
  "@stylistic/wrap-iife": [
    error,
    "inside",
    {
      functionPrototypeMethods: true,
    },
  ],
  "@stylistic/wrap-regex": error,
  "@stylistic/yield-star-spacing": error,

};

const tsPlusJsStylisticCustomRules = {

  ...jsOnlyStylisticCustomRules,
  // TypeScript rules
  "@stylistic/member-delimiter-style": error,
  "@stylistic/type-annotation-spacing": error,

};

/** ESLint flat config
 * An array of configs executed in order.
 * i.e. Lint Config 0 executes, then Lint Config 1 executes.)
*/
export default [
  /** Lint Config 0 (main):
   * Enable ESLint rules (@typescript-eslint/ and @stylistic/ rules)
  */
  {
    ...configOptions.js,
    rules: js.configs.recommended.rules,
  },
  {
    ...configOptions.js,
    rules: stylistic.configs["disable-legacy"].rules,
  },
  {
    ...configOptions.js,
    rules: jsOnlyStylisticCustomRules,
  },
  {
    ...configOptions.ts,
    rules: stylistic.configs["disable-legacy"].rules,
  },
  {
    ...configOptions.ts,
    rules: {
      ...tsLint.configs["eslint-recommended"].rules,
      "arrow-body-style": off,
      "prefer-arrow-callback": off,
    },
  },
  {
    ...configOptions.ts,
    rules: esLintTypeScriptCustomRules,
  },
  {
    ...configOptions.ts,
    rules: tsPlusJsStylisticCustomRules,
  },
];
