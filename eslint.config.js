import { jsse } from "@jsse/eslint-config";

export default jsse(
  {
    ignores: ["**/dev"],
    debug: false,
    typescript: {
      tsconfig: ["tsconfig.json", "tsconfig.eslint.json"],
    },
    reportUnusedDisableDirectives: true,
    off: ["dot-notation"],
    prettier: true,
    stylistic: false,
  },
);
