import { defineConfig } from "tsdown";

export default defineConfig((options) => {
  // `watch` is `boolean | string | string[] | undefined`, so cast explicitly
  // rather than relying on the truthiness of a mixed union.
  const watching = Boolean(options.watch);

  return {
    entry: ["index.ts"],
    format: ["cjs", "esm"],
    clean: true,
    dts: true,
    minify: !watching,
    sourcemap: !watching,
    attw: { level: "error" },
    publint: true,
  };
});
