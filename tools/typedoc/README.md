# @comparator.ts/typedoc

TypeDoc crashes on startup under TypeScript 7, and the root workspace is on 7.
This private package exists so its `typescript` peer resolves to 6 instead.
Delete it once TypeDoc supports 7 and move the dependencies back to the root.

Docs are still built from the repository root, via `pnpm build:docs`.
