# Cleanup Guide

Use this checklist for future cleanup passes so the project stays easy to scan,
refactor, and verify.

## Architecture

- Keep public APIs documented with concise JSDoc comments.
- Preserve clear module boundaries: a component file should primarily describe
  rendering and props.
- Put each reusable component in its own file.
- Put component-specific business logic in hooks next to the component.
- Move logic to shared helpers only when it is reused or clearly generic.
- Keep generated or tool-required entrypoints thin when configuration has to
  live at the project root.

## Configuration

- Keep project configuration in `src/config`.
- Write configuration in TypeScript whenever the runtime supports it.
- Use root files such as `vite.config.ts` only as adapters for tooling that
  expects those filenames.
- Split build scripts by responsibility: route lists, browser setup, static
  server setup, and page preparation should not live in one large file.

## Components And Hooks

- Name hooks after the behavior they own, such as `useSlideAnchors` or
  `useTooltip`.
- Keep render components declarative: compute state, wire hooks, and return JSX.
- Keep secondary components, such as item rows or card lists, in separate files.
- Avoid effect dependencies that change only because an object literal was
  recreated during render.
- Keep browser-only behavior guarded when files can be loaded by build tooling.

## Styles

- Keep CSS Modules focused on one component or visual concern.
- Split reusable animation declarations or large style groups into local Sass
  partials.
- Document non-obvious style blocks with short comments.
- Prefer design tokens from `src/styles` over one-off values.
- Keep print, responsive, and motion-reduction rules close to the component
  styles they affect.

## File Size

- Aim for 100-200 lines per source file.
- Split files over 200 lines unless the file is naturally content-heavy.
- Accept larger files only for pages, translations, generated metadata, or other
  cases where splitting would reduce clarity.

## Verification

- Run `bun run typecheck` after structural changes.
- Run `MORITAKUMI_CONTENT_PASSWORD=<test-password> bun run build:page` after
  changing Vite config, translations, routing, or component imports.
- Run `MORITAKUMI_CONTENT_PASSWORD=<test-password> bun run build:pdf` after
  changing PDF config or print behavior.
- Local PDF generation binds a localhost server, so it may require elevated
  permissions in sandboxed environments.

## Repository Hygiene

- Check `git status --short` before and after cleanup work.
- Do not revert unrelated dirty files.
- Call out pre-existing or externally modified files in the cleanup summary.
- Treat build artifacts and incremental metadata, such as `tsconfig.tsbuildinfo`,
  as generated output unless the project decides to track them deliberately.
