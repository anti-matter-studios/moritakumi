/*
 * Copyright © 2026 Anti-Matter Studios
 * Licensed under the MIT License.
 */

const { defineConfig } = require("eslint/config");
const { configs: TypeScriptConfigs } = require("typescript-eslint");
const { configs: ReactConfigs } = require("eslint-plugin-react");
const { configs: ReactHookConfigs } = require("eslint-plugin-react-hooks");

module.exports = defineConfig(
    {
        ignores: [
            "dist/**",
        ],
    },
    TypeScriptConfigs.strictTypeChecked,
    {
        // Configure the TypeScript project loader.
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: ["eslint.config.cjs"],
                },
            },
        },

        rules: {
            // Disable @typescript-eslint/no-invalid-void until issue [typescript-eslint/typescript-eslint#8113](https://github.com/typescript-eslint/typescript-eslint/issues/8113) is fixed.
            "@typescript-eslint/no-invalid-void-type": ["off"],

            /** Replicate the behaviour of TypeScript's `noUnusedLocals` and `noUnusedParameters`. */
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    args: "all",
                    argsIgnorePattern: "^_",
                    caughtErrors: "all",
                    caughtErrorsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                },
            ],
        },
    },
    {
        // JavaScript tool entrypoints rely on untyped Node APIs.
        files: ["*.cjs"],
        rules: {
            "@typescript-eslint/no-misused-promises": ["off"],
            "@typescript-eslint/no-require-imports": ["off"],
            "@typescript-eslint/no-unsafe-argument": ["off"],
            "@typescript-eslint/no-unsafe-assignment": ["off"],
            "@typescript-eslint/no-unsafe-call": ["off"],
            "@typescript-eslint/no-unsafe-member-access": ["off"],
            "@typescript-eslint/no-unsafe-return": ["off"],
            "@typescript-eslint/prefer-promise-reject-errors": ["off"],
            "@typescript-eslint/restrict-template-expressions": ["off"],
        },
    },
    {
        // Allow the use of "any" types in testing environments.
        files: ["test/**/*.ts", "test/**/*.tsx", "src/**/*.spec.ts", "src/**/*.spec.tsx"],
        rules: {
            "@typescript-eslint/no-explicit-any": ["off"],
            "@typescript-eslint/no-unsafe-assignment": ["off"],
            "@typescript-eslint/no-unsafe-member-access": ["off"],
            "@typescript-eslint/no-unsafe-call": ["off"],
            "@typescript-eslint/no-unsafe-return": ["off"],
        },
    },
    ReactConfigs.flat["jsx-runtime"],
    ReactHookConfigs.flat.recommended,
)
