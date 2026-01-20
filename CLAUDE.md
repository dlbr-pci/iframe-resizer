# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

iframe-resizer is a JavaScript library that automatically resizes iframes to match their content size. It works cross-domain and provides additional APIs for parent-child iframe communication.

## Build Commands

```bash
# Install dependencies
npm install

# Development build (faster, includes debug code)
npm run build:dev

# Production build (minified, all packages)
npm run build:prod

# Watch mode for development
npm run rollup:watch

# Lint code
npm run eslint

# Lint and auto-fix
npm run eslint:fix
```

## Testing

```bash
# Run all tests (Jest unit tests + Karma integration tests)
npm test

# Run only Jest unit tests
npm run test:jest

# Run Jest in watch mode
npm run test:watch

# Run only Karma integration tests (requires build first)
npm run test:int

# Run Karma with Chrome GUI for debugging
npm run test:int:watch
```

**Test file locations:**
- Unit tests: `packages/**/*.test.js` (co-located with source)
- Integration tests: `spec/*Spec.js` (Karma/Jasmine)

## Architecture

### Package Structure

The library is a monorepo split into multiple npm packages under `packages/`:

| Package | Purpose |
|---------|---------|
| `@iframe-resizer/core` | Core resizing logic and parent page API |
| `@iframe-resizer/parent` | Parent page entry point (imports core) |
| `@iframe-resizer/child` | Script that runs inside the iframe |
| `@iframe-resizer/react` | React component wrapper |
| `@iframe-resizer/vue` | Vue component wrapper |
| `@iframe-resizer/jquery` | jQuery plugin wrapper |
| `legacy` | Backwards compatibility for v4 |
| `common` | Shared utilities and constants |

### Communication Flow

1. Parent page loads `@iframe-resizer/parent` and calls `iframeResize(options)(iframe)`
2. Child page loads `@iframe-resizer/child` which auto-initializes
3. Parent and child communicate via `postMessage` (cross-domain) or direct function calls (same-origin)
4. Child uses MutationObserver, ResizeObserver, and IntersectionObserver to detect content changes
5. Child calculates content dimensions and sends them to parent
6. Parent updates iframe element dimensions

### Key Source Files

- `packages/core/index.js` - Main parent page logic, message handling, iframe management
- `packages/child/index.js` - Child page logic, size calculation, observer setup
- `packages/common/consts.js` - Shared constants and message types
- `packages/common/mode.js` - License mode handling
- `rollup.config.mjs` - Build configuration for all packages

### Build Output

- `dist/` - NPM package distributions (esm, cjs, umd)
- `js/` - Browser IIFE builds for direct script inclusion
- `test-js/` - Unminified builds for testing

## Development Notes

- Uses Rollup for bundling with Babel for transpilation
- Environment flags: `DEBUG`, `BETA`, `TEST` control build behavior
- The `auto-console-group` dependency provides structured console logging
- TypeScript definitions are in `packages/*/index.d.ts`
