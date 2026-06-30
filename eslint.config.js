import { jsse } from "@jsse/eslint-config";

export default jsse({
  ignores: ["**/dev"],
  debug: false,
  typescript: { strict: true, tsconfig: ["tsconfig.json", "tsconfig.eslint.json"] },
  reportUnusedDisableDirectives: true,
  off: [] ,
  prettier: true,
  stylistic: false,
});
