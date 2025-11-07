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
    // gitignore: {
    //   files: [".gitignore"],
    //   strict: true,
    //   root: true
    // }
    stylistic: false,
  },
  /**
   * overrides
   */
  // ...[
  //   {
  //     files: ["*.ts", "*.tsx"],
  //     rules: {}
  //   }
  // ]
);
