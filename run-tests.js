import { spawnSync } from "node:child_process";
import process from "node:process";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    coverage: { type: "boolean" },
  },
});

const major = Number(process.versions.node.split(".")[0]);

const flags = [];

if (major < 26) {
  flags.push("--experimental-transform-types");
}

flags.push("--test");

if (values.coverage) {
  flags.push(
    "--experimental-test-coverage",
    "--test-coverage-include=index.ts",
    "--test-reporter=lcov",
    "--test-reporter-destination=lcov.info",
    "--test-reporter=junit",
    "--test-reporter-destination=junit.xml",
    "--test-reporter=spec",
    "--test-reporter-destination=stdout",
  );
}

const { status } = spawnSync(process.execPath, [...flags, "index.test.ts"], {
  stdio: "inherit",
});

process.exit(status ?? 1);
