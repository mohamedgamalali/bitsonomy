import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/dist"],
}, ...compat.extends("plugin:@typescript-eslint/recommended", "prettier"), {
    plugins: {
        prettier,
    },

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
        },

        parser: tsParser,
        ecmaVersion: 8,
        sourceType: "commonjs",
    },

    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts"],
        },

        "import/resolver": {
            node: {
                extensions: [".ts"],
            },

            typescript: {
                alwaysTryTypes: true,
            },
        },

        "import/extensions": 0,
    },

    rules: {
        "no-useless-constructor": "off",
        "no-unused-expressions": 0,
        "no-unused-vars": 0,
        "one-var": 0,

        "no-underscore-dangle": [0, {
            allow: [],
        }],

        "global-require": 0,
        "new-cap": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "import/extensions": 0,
        "@typescript-eslint/camelcase": 0,
        camelcase: "off",
        "consistent-return": 0,
        "import/prefer-default-export": 0,
        "lines-between-class-members": "off",
    },
}];