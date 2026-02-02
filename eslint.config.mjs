import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      "no-restricted-imports": [
        "warn",
        {
          paths: [
            {
              name: "react",
              importNames: ["useMemo", "useCallback", "memo"],
              message:
                "Avoid defensive memoization. Use only with a clear correctness/perf reason (see AGENTS.md).",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["components/ui/**"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
]);

export default eslintConfig;
