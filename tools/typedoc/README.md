# @comparator.ts/typedoc

TypeDoc does not support the TypeScript 7 compiler API yet — it crashes on
startup when it resolves against it. The root workspace is on TypeScript 7, so
TypeDoc lives in this private package instead, where its `typescript` peer
dependency resolves to TypeScript 6.

Once TypeDoc supports TypeScript 7, this package can be deleted and its three
dependencies moved back into the root `package.json`.

Docs are still generated from the repository root, via `pnpm build:docs`.
