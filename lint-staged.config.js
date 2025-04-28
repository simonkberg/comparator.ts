const sourceFilesRegex = /\.[cm]?[tj]sx?$/;

/**
 * Custom lint-staged config.
 *
 * This ensures that all files are formatted, and that all source files are
 * linted, type-checked, and tested.
 *
 * The order of the commands is important! Eslint must run before Prettier to
 * ensure that any code changes made by ESLint are formatted correctly.
 *
 * @type {import("lint-staged").Configuration}
 */
export default (filenames) => {
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
    commands.push(`eslint --max-warnings=0 --fix ${sourceFiles}`);
  }

  if (allFiles !== "") {
    commands.push(`prettier --write --ignore-unknown ${allFiles}`);
  }

  if (sourceFiles !== "") {
    commands.push(`tsx --test index.test.ts`, `tsc -p tsconfig.json --noEmit`);
  }

  return commands;
};
