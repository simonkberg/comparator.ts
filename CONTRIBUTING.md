# Contribute to bloom-client-node

## Prerequisites

- [Node.js] (v20 or higher)
- [pnpm] (corepack)

It's always a good idea to create an [issue] to discuss your ideas before you start working on them.

> [!NOTE]
> This project uses prettier and eslint to enforce code style. You can run `pnpm lint` to check
> your code for style issues.
>
> To make it easier to keep your code style consistent, you can configure your editor to
> automatically format your code on save. See the [prettier documentation] and
> the [eslint documentation] for instructions on how to do this.

## Fork the repository

Fork the repository on GitHub and clone your fork to your local machine.

> [!TIP]
> Use [`gh`] and [configure it][gh-configure] to make this a breeze:
>
> ```sh
> gh repo fork simonkberg/comparator.ts
> ```

Once you have cloned your fork, run `corepack enable` followed by `pnpm install` to install the
dependencies.

## Make you code changes

1. Make your code changes and commit them to a new branch.
   > [!NOTE]
   > Make sure your code changes are covered by tests. Run `pnpm test` to run the test suite.
2. Generate and commit a changelog using `pnpm changeset`.
3. Push your branch to your fork.
4. Open a pull request to the `main` branch of the `simonkberg/comparator.ts` repository.

## Getting your changes merged

Once you have opened a pull request, you will need to get it reviewed and approved by a maintainer.

Once that is done, a maintainer will merge it and publish a new version of the package.

[Node.js]: https://nodejs.org/en/
[pnpm]: https://pnpm.io/
[issue]: https://github.com/simonkberg/comparator.ts/issues/new
[prettier documentation]: https://prettier.io/docs/en/editors.html
[eslint documentation]: https://eslint.org/docs/user-guide/integrations
[`gh`]: https://cli.github.com/
[gh-configure]: https://cli.github.com/manual/#configuration
