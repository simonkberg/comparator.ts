const sourceFilesRegex = /\.[cm]?[tj]sx?$/u;

/**
 * Custom lint-staged config.
 *
 * This ensures that all files are formatted, and that all source files are
 * linted, type-checked, and tested.
 *
 * The order of the commands is important! Oxlint must run before oxfmt to
 * ensure that any code changes made by oxlint are formatted correctly.
 *
 * @type {import("lint-staged").Configuration}
 */
const lintStagedConfig = (filenames) => {
  /** @type {string[]} */
  const commands = [];
  let allFiles = "";
  let sourceFiles = "";

  for (const file of filenames) {
    allFiles += ` ${file}`;
    if (sourceFilesRegex.test(file)) {
      sourceFiles += ` ${file}`;
    }
  }

  if (sourceFiles !== "") {
    commands.push(`oxlint --fix ${sourceFiles}`);
  }

  if (allFiles !== "") {
    commands.push(`oxfmt --no-error-on-unmatched-pattern ${allFiles}`);
  }

  if (sourceFiles !== "") {
    commands.push(`node run-tests.js`, `tsc -p tsconfig.json --noEmit`);
  }

  return commands;
};

export default lintStagedConfig;
