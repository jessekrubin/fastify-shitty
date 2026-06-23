import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/fastify-shitty.ts"],
  treeshake: false,
  format: ["cjs", "esm"],
  dts: false,
  fixedExtension: false,
  outDir: "dist",
  clean: true,
  publint: true,
  tsconfig: "./tsconfig.json",
  outputOptions: { exports: "named" },
  deps: { neverBundle: ["fastify-plugin", "fastify"] },
});
